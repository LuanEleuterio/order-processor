import { Injectable } from '@nestjs/common';
import { EmptyFileException } from '../../errors/empty-file.error';
import { NormalizeOrderFileService } from './normalize-order-file.service';
import { eraseFile } from 'src/utils/erase-file.util';
import { BuildDataStructureService } from './build-data-structure.service';
import { DataSeedService } from './data-seed.service';

@Injectable()
export class ProcessOrderFileService {
  constructor(
    private readonly normalizeOrderFileService: NormalizeOrderFileService,
    private readonly buildDataStructureService: BuildDataStructureService,
    private readonly dataSeedService: DataSeedService,
  ) {}

  public async execute(file: Express.Multer.File) {
    if (file.size === 0) {
      eraseFile(file.path);
      throw new EmptyFileException();
    }

    const normalizedOrders = await this.normalizeOrderFileService.execute(file);
    const builtData = this.buildDataStructureService.execute(normalizedOrders);

    await this.dataSeedService.seed(builtData);

    return { message: 'Files has been processed' };
  }
}
