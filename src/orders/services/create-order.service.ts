import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../repositories/order.repository';
import { ICreateOrderService } from './create-order.interface';

@Injectable()
export class CreateOrderService implements ICreateOrderService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  public async execute(
    order: ICreateOrderService.Execute.Params,
  ): Promise<ICreateOrderService.Execute.Result> {
    const createdOrder = await this.orderRepository.create(order);
    return createdOrder;
  }
}
