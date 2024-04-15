import { Inject } from '@nestjs/common';
import { IListOrdersService } from './list-orders.interface';
import { IOrderRepository } from '../repositories/order.repository';
import { OrderResponseDTO } from '../dtos/order-response.dto';

export class ListOrdersService implements IListOrdersService {
  constructor(
    @Inject(IOrderRepository)
    private readonly orderRepository: IOrderRepository,
  ) {}

  public async execute(
    query?: IListOrdersService.Execute.Params,
  ): Promise<IListOrdersService.Execute.Result[]> {
    const orders = await this.orderRepository.list(query);
    const response: {
      [key: number]: OrderResponseDTO;
    } = {};

    for (const order of orders) {
      const { user } = order;

      if (!response[user.user_id]) {
        const orderResponse = new OrderResponseDTO({
          user_id: user.user_id,
          name: user.name,
        });

        orderResponse.addOrder({
          order_id: order.order_id,
          date: order.date,
          total: order.total,
          products: order.products,
        });
        response[user.user_id] = orderResponse;
        continue;
      }
      const orderResponse = response[user.user_id];
      orderResponse.addOrder({
        order_id: order.order_id,
        date: order.date,
        total: order.total,
        products: order.products,
      });
      response[user.user_id] = orderResponse;
    }

    return Object.values(response).map((order) => order.toJSON());
  }
}
