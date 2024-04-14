import { Inject, Injectable } from '@nestjs/common';
import { EmptyFileException } from '../../errors/empty-file.error';
import { eraseFile } from 'src/utils/erase-file.util';
import { IProcessOrderFileService } from './process-order-file.interface';
import { ICreateOrderService } from './create-order.interface';
import { IProductsHistoricService } from 'src/products-historic/services/products-historic.interface';
import { IUserService } from 'src/users/services/user.interface';
import { IExtractLinesFromOrderFileService } from './extract-lines-from-order-file.interface';
import { IBuildOrderStructureService } from './build-order-structure.interface';

@Injectable()
export class ProcessOrderFileService implements IProcessOrderFileService {
  constructor(
    @Inject(ICreateOrderService)
    private readonly createOrderService: ICreateOrderService,
    @Inject(IUserService)
    private readonly userService: IUserService,
    @Inject(IProductsHistoricService)
    private readonly productHistoricService: IProductsHistoricService,
    @Inject(IExtractLinesFromOrderFileService)
    private readonly extractLinesFromOrderFileService: IExtractLinesFromOrderFileService,
    @Inject(IBuildOrderStructureService)
    private readonly buildOrderStructureService: IBuildOrderStructureService,
  ) {}

  public async execute(
    params: IProcessOrderFileService.Execute.Params,
  ): Promise<IProcessOrderFileService.Execute.Result> {
    if (params.file.size === 0) {
      eraseFile(params.file.path);
      throw new EmptyFileException();
    }

    const extractedLines =
      await this.extractLinesFromOrderFileService.execute(params);

    const builtStructure =
      this.buildOrderStructureService.execute(extractedLines);

    console.log(builtStructure);

    return { message: 'File has been processed' };
  }
}
