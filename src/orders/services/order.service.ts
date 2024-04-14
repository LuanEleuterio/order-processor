/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { IOrderService } from './order.interface';
import { IOrderRepository } from '../repositories/order.repository';

@Injectable()
export class OrderService implements IOrderService {
  constructor(private readonly orderRepository: IOrderRepository) {}

  public async create(
    order: IOrderService.Create.Params,
  ): Promise<IOrderService.Create.Result> {
    await this.orderRepository.create(order);
    return;
  }

  public async list(query: IOrderService.List.Params): Promise<any> {
    // const orders = await this.orderRepository.list(query);
    return [];
  }
}
