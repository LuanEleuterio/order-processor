import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IOrderRepository } from './order.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Order as OrderEntity, OrderDocument } from '../entities/order.entity';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(OrderEntity.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  public async create(
    order: IOrderRepository.Create.Params,
  ): Promise<IOrderRepository.Create.Result> {
    const createdOrder = await this.orderModel.create(order);
    return createdOrder;
  }

  public async list(
    query: IOrderRepository.List.Params,
  ): Promise<IOrderRepository.List.Result[]> {
    const where: Record<string, string | number | any> = {};

    if (query?.order_id) {
      where.order_id = query.order_id;
    }

    if (query?.start_date || query?.end_date) {
      where.date = {
        ...(query.start_date ? { $gte: new Date(query.start_date) } : {}),
        ...(query.end_date ? { $lte: new Date(query.end_date) } : {}),
      };
    }

    const orders = await this.orderModel
      .find()
      .where(where)
      .populate({
        path: 'user_id',
        select: '-_id -__v -createdAt -updatedAt',
      })
      .lean();

    return orders.map((order) => {
      const user = order.user_id as unknown as {
        user_id: number;
        name: string;
      };

      return {
        order_id: order.order_id,
        date: order.date,
        total: order.total,
        products: order.products,
        user,
      };
    });
  }
}
