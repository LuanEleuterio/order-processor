import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import multerConfig from '../config/multer.config';
import { ProcessOrderFileService } from '../services/orders/process-order-file.service';
import { ListOrdersService } from '../services/orders/list-orders.service';
import { ListOrdersQuery } from '../dtos/list-orders-query.dto';

@Controller('/orders')
export class OrderController {
  constructor(
    private readonly processOrderFileService: ProcessOrderFileService,
    private readonly listOrdersService: ListOrdersService,
  ) {}

  @Post('/file/upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  public async processOrders(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    await this.processOrderFileService.execute(file);
    return { message: 'File uploaded successfully' };
  }

  @Get('/')
  public async getOrderById(@Query() query: ListOrdersQuery) {
    return await this.listOrdersService.execute(query);
  }
}
