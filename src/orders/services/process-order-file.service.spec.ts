import * as fs from 'fs';
import { makeFile } from '../../../test/factories/make-file';
import { UserService } from '../../../src/users/services/user.service';
import { FakeOrderRepository } from '../../../test/fakes/fake-order.repository';
import { FakeUserRepository } from '../../../test/fakes/fake-user.repository';
import { BuildOrderStructureService } from './build-order-structure.service';
import { CreateOrderService } from './create-order.service';
import { ExtractLinesFromOrderFileService } from './extract-lines-from-order-file.service';
import { ProcessOrderFileService } from './process-order-file.service';
import { EmptyFileException } from './../../errors/empty-file.error';

describe('process-order-file', () => {
  let fakeOrderRepository: FakeOrderRepository;
  let fakeUserRepository: FakeUserRepository;
  let createOrderService: CreateOrderService;
  let userService: UserService;
  let extractLinesFromOrderFileService: ExtractLinesFromOrderFileService;
  let buildOrderStructureService: BuildOrderStructureService;
  let processOrderFileService: ProcessOrderFileService;

  beforeEach(() => {
    fakeOrderRepository = new FakeOrderRepository();
    fakeUserRepository = new FakeUserRepository();
    createOrderService = new CreateOrderService(fakeOrderRepository);
    userService = new UserService(fakeUserRepository);
    extractLinesFromOrderFileService = new ExtractLinesFromOrderFileService();
    buildOrderStructureService = new BuildOrderStructureService();

    processOrderFileService = new ProcessOrderFileService(
      createOrderService,
      userService,
      extractLinesFromOrderFileService,
      buildOrderStructureService,
    );
  });

  it('Should process order file', async () => {
    let fileContent = '';
    fileContent +=
      '0000000070                              Palmer Prosacco00000007530000000003     1836.7420210308\n';
    fileContent +=
      '0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116\n';

    const file = makeFile(fileContent, 'order_teste');
    const filePath = file.path;

    const result = await processOrderFileService.execute({ file });

    expect(result.message).toEqual('File has been processed');
    expect(fs.existsSync(filePath)).toBe(false);
  });

  it('[Exception] Should not process order file - File is empty', async () => {
    const fileContent = '';
    const file = makeFile(fileContent, 'order_teste');
    file.size = 0;
    const filePath = file.path;

    try {
      await processOrderFileService.execute({ file });
    } catch (error) {
      expect(error).toBeInstanceOf(EmptyFileException);
      expect(fs.existsSync(filePath)).toBe(false);
    }
  });
});
