import {
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import multerConfig from '../../config/multer.config';
import { IProcessOrderFileService } from '../services/process-order-file.interface';

@Controller('/orders')
export class OrderController {
  constructor(
    @Inject(IProcessOrderFileService)
    private readonly processOrderFileService: IProcessOrderFileService,
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
}
