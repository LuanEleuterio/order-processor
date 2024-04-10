import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import * as readline from 'readline';
import { NormalizeOrder } from '../../dtos/normalized-order.dto';
import { eraseFile } from 'src/utils/erase-file.util';
import { GenericException } from 'src/errors/generic-error.error';

@Injectable()
export class NormalizeOrderFileService {
  public async execute(file: Express.Multer.File): Promise<NormalizeOrder[]> {
    const normalizedData = await this.readFile(file);
    return normalizedData;
  }

  private async readFile(file: Express.Multer.File): Promise<NormalizeOrder[]> {
    return new Promise((resolve, reject) => {
      const orders: NormalizeOrder[] = [];
      const fileToRead = readline.createInterface({
        input: createReadStream(file.path),
      });

      fileToRead.on('line', (line) => {
        orders.push({
          userId: line.slice(0, 10),
          name: line.slice(10, 55).trim(),
          orderId: line.slice(55, 65),
          productId: line.slice(65, 75),
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
