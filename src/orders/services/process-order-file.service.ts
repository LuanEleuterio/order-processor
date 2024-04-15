import { Inject, Injectable } from '@nestjs/common';
import { EmptyFileException } from '../../errors/empty-file.error';
import { eraseFile } from '../../utils/erase-file.util';
import { IProcessOrderFileService } from './process-order-file.interface';
import { ICreateOrderService } from './create-order.interface';
import { IUserService } from '../../users/services/user.interface';
import { IExtractLinesFromOrderFileService } from './extract-lines-from-order-file.interface';
import { IBuildOrderStructureService } from './build-order-structure.interface';

@Injectable()
export class ProcessOrderFileService implements IProcessOrderFileService {
  constructor(
    @Inject(ICreateOrderService)
    private readonly createOrderService: ICreateOrderService,
    @Inject(IUserService)
    private readonly userService: IUserService,
    @Inject(IExtractLinesFromOrderFileService)
    private readonly extractLinesFromOrderFileService: IExtractLinesFromOrderFileService,
    @Inject(IBuildOrderStructureService)
    private readonly buildOrderStructureService: IBuildOrderStructureService,
  ) {}

  public async execute(
    params: IProcessOrderFileService.Execute.Params,
  ): Promise<IProcessOrderFileService.Execute.Result> {
    if (params.file.size === 0) {
      await eraseFile(params.file.path);
      throw new EmptyFileException();
    }

    const extractedLines =
      await this.extractLinesFromOrderFileService.execute(params);

    const orderStructure =
      this.buildOrderStructureService.execute(extractedLines);

    for (const order of orderStructure) {
      const user = await this.userService.create({
        user_id: order.user_id,
        name: order.name,
      });

      for (const orderData of order.orders) {
        await this.createOrderService.execute({
          ...orderData,
          user_id: user._id,
          products: orderData.products,
        });
      }
    }

    return { message: 'File has been processed' };
  }
}
