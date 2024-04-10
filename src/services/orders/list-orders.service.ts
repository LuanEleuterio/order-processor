import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Order } from 'src/entities/order.entity';
import { BuildOrderResponse } from 'src/utils/build-order-response.util';
import { DataSource, Between } from 'typeorm';

interface Props {
  orderId: string;
  startDate: string;
  endDate: string;
}

@Injectable()
export class ListOrdersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly buildOrderResponse: BuildOrderResponse,
  ) {}

  public async execute(props?: Props) {
    const { orderId, startDate, endDate } = props;
    const where = {};

    if (!this.isInvalidDateParams(startDate, endDate)) {
      where['date'] = Between(startDate || '', endDate || new Date());
    }

    if (orderId) {
      where['order_id'] = Number(orderId);
    }

    const orders = await this.dataSource.manager.find(Order, {
      ...(where ? { where } : {}),
      relations: ['products', 'user'],
    });

    return this.buildOrderResponse.execute(orders);
  }

  private isInvalidDateParams(startDate: string, endDate: string) {
    if (startDate || endDate) {
      return false;
    }
    return true;
  }
}
