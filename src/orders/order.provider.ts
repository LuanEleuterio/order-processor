import { OrderRepository } from './repositories/order.implementation';
import { IOrderRepository } from './repositories/order.repository';
import { CreateOrderService } from './services/create-order.service';
import { ICreateOrderService } from './services/create-order.interface';
import { IProcessOrderFileService } from './services/process-order-file.interface';
import { ExtractLinesFromOrderFileService } from './services/extract-lines-from-order-file.service';
import { IExtractLinesFromOrderFileService } from './services/extract-lines-from-order-file.interface';
import { ProcessOrderFileService } from './services/process-order-file.service';
import { BuildOrderStructureService } from './services/build-order-structure.service';
import { IBuildOrderStructureService } from './services/build-order-structure.interface';
import { IListOrdersService } from './services/list-orders.interface';
import { ListOrdersService } from './services/list-orders.service';

export const OrderProvider = [
  { provide: IOrderRepository, useClass: OrderRepository },
  { provide: ICreateOrderService, useClass: CreateOrderService },
  { provide: IProcessOrderFileService, useClass: ProcessOrderFileService },
  {
    provide: IExtractLinesFromOrderFileService,
    useClass: ExtractLinesFromOrderFileService,
  },
  {
    provide: IBuildOrderStructureService,
    useClass: BuildOrderStructureService,
  },
  {
    provide: IListOrdersService,
    useClass: ListOrdersService,
  },
];
