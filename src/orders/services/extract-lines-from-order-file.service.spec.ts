import * as fs from 'fs';
import { makeFile } from '../../../test/factories/make-file';
import { ExtractLinesFromOrderFileService } from './extract-lines-from-order-file.service';

describe('extract-lines-from-order-file', () => {
  let extractLinesFromOrderFileService: ExtractLinesFromOrderFileService;

  beforeEach(() => {
    extractLinesFromOrderFileService = new ExtractLinesFromOrderFileService();
  });

  it('Should extract lines from order file', async () => {
    let fileContent = '';
    fileContent +=
      '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308\n';
    fileContent +=
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116\n';

    const file = makeFile(fileContent, 'order_teste');
    const filePath = file.path;

    const orders = await extractLinesFromOrderFileService.execute({ file });

    expect(orders[0].userId).toEqual(70);
    expect(orders[1].name).toEqual('Bobbie Batz');
    expect(fs.existsSync(filePath)).toBe(false);
  });
});
