import {
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import multerConfig from '../../config/multer.config';
import { IProcessOrderFileService } from '../services/process-order-file.interface';
import { IListOrdersService } from '../services/list-orders.interface';

@Controller('/orders')
export class OrderController {
  constructor(
    @Inject(IProcessOrderFileService)
    private readonly processOrderFileService: IProcessOrderFileService,
    @Inject(IListOrdersService)
    private readonly listOrdersService: IListOrdersService,
  ) {}

  @Post('/file/upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async processOrders(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.processOrderFileService.execute({ file });
    return { message: 'File uploaded successfully' };
  }

  @Get()
  public async listOrders(
    @Query() query: { order_id: number; start_date: string; end_date: string },
  ) {
    const orders = await this.listOrdersService.execute(query);
    return orders;
  }
}
