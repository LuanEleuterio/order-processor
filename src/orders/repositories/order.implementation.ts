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

  public async create(order: IOrderRepository.Create.Params): Promise<void> {
    await this.orderModel.create(order);
    return;
  }

  public async list(
    query: IOrderRepository.List.Params,
  ): Promise<IOrderRepository.List.Result[]> {
    const orders = await this.orderModel
      .find({
        order_id: query.order_id,
        date: {
          $gte: query.start_date,
          $lte: query.end_date,
        },
      })
      .populate('products', 'user_id');

    return orders.map((order) => ({
      user_id: order.user_id,
      name: '',
      order_id: order.order_id,
      date: order.date,
      total: order.total,
      products: order.products.map((product) => ({
        product_id: product.product_id,
        value: product.value,
      })),
    }));
  }
}
