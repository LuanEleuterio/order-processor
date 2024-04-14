import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { DataSource, Between } from 'typeorm';
@Injectable()
export class ListOrdersService {
  constructor() {}

  public async execute(props?: ListOrdersService.Props) {
    // const { orderId, startDate, endDate } = props;
    // const where = {};

    // if (!this.isInvalidDateParams(startDate, endDate)) {
    //   where['date'] = Between(startDate || '', endDate || new Date());
    // }

    // if (orderId) {
    //   where['order_id'] = Number(orderId);
    // }

    // const orders = await this.dataSource.manager.find(Order, {
    //   ...(where ? { where } : {}),
    //   relations: ['products', 'user'],
    // });

    return [];
  }

  private isInvalidDateParams(startDate: string, endDate: string) {
    if (startDate || endDate) {
      return false;
    }
    return true;
  }
}

export namespace ListOrdersService {
  export type Props = { orderId: string; startDate: string; endDate: string };
}

export namespace IRepository {
  export namespace Save {
    export type Params = {
      order_id: number;
      date: string;
      user_id: number;
      total?: string;
    };
    export type Result = void;
  }
}
