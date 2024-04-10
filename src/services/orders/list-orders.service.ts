import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { OrderDTO } from 'src/dtos/order.dto';
import { Order } from 'src/entities/order.entity';
import { GenericException } from 'src/errors/generic-error.error';
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

    const normalizedOrder: Record<string, OrderDTO> = {};

    for (const order of orders) {
      if (normalizedOrder[order.user_id]) {
        normalizedOrder[order.user_id].setOrder = order;
        continue;
      }

      normalizedOrder[order.user_id] = new OrderDTO({
        user_id: order.user_id,
        name: order?.user?.name || 'N/A',
      });

      normalizedOrder[order.user_id].setOrder = order;
    }

    return Object.values(normalizedOrder);
  }

  private isInvalidDateParams(startDate: string, endDate: string) {
    if (startDate || endDate) {
      return false;
    }
    return true;
  }
}
