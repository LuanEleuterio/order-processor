import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { Order } from './../../src/orders/entities/order.entity';
import { IOrderRepository } from './../../src/orders/repositories/order.repository';
import { User } from './../../src/users/entities/user.entity';

@Injectable()
export class FakeOrderRepository implements IOrderRepository {
  orders: Order[] = [];
  users: User[] = [];

  public async create(
    order: IOrderRepository.Create.Params,
  ): Promise<IOrderRepository.Create.Result> {
    const _id = new Types.ObjectId();

    const newOrder = {
      ...order,
      _id,
    };

    return newOrder as IOrderRepository.Create.Result;
  }

  public async list(
    query: IOrderRepository.List.Params,
  ): Promise<IOrderRepository.List.Result[]> {
    const orders = this.orders.map((order) => {
      if (query?.order_id && order.order_id !== query.order_id) {
        return;
      }

      if (
        query?.start_date &&
        new Date(order.date) < new Date(query.start_date)
      ) {
        return;
      }

      if (query?.end_date && new Date(order.date) > new Date(query.end_date)) {
        return;
      }

      return {
        order_id: order.order_id,
        date: order.date,
        total: order.total,
        products: order.products,
        user: this.users.find((user) => user._id === order.user_id),
      };
    }) as unknown as IOrderRepository.List.Result[];

    return orders.filter((value) => value !== undefined);
  }
}
