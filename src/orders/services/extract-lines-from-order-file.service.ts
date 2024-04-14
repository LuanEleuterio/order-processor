import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import { eraseFile } from 'src/utils/erase-file.util';
import { GenericException } from 'src/errors/generic-error.error';
import { IExtractLinesFromOrderFileService } from './extract-lines-from-order-file.interface';

@Injectable()
export class ExtractLinesFromOrderFileService
  implements IExtractLinesFromOrderFileService
{
  public async execute(
    file: IExtractLinesFromOrderFileService.Execute.Params,
  ): Promise<IExtractLinesFromOrderFileService.Execute.Result[]> {
    const normalizedData = await this.readFileLines(file);
    return normalizedData;
  }

  private async readFileLines({
    file,
  }: IExtractLinesFromOrderFileService.Execute.Params): Promise<
    IExtractLinesFromOrderFileService.Execute.Result[]
  > {
    return new Promise((resolve) => {
      const orders: IExtractLinesFromOrderFileService.Execute.Result[] = [];
      const fileToRead = readline.createInterface({
        input: createReadStream(file.path),
      });

      fileToRead.on('line', (line) => {
        orders.push({
          userId: Number(line.slice(0, 10)),
          name: line.slice(10, 55).trim(),
          orderId: Number(line.slice(55, 65)),
          productId: Number(line.slice(65, 75)),
          productPrice: line.slice(75, 87).trim(),
          date: line.slice(87, 95),
        });
      });

      fileToRead.on('close', () => {
        eraseFile(file.path);
        resolve(orders);
      });

      fileToRead.on('error', (error) => {
        eraseFile(file.path);
        throw new GenericException({
          message: 'Error while reading file. Try again.',
          error,
        });
      });
    });
  }
}
