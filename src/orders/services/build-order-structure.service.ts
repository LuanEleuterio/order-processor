import { Injectable } from '@nestjs/common';
import { format, parseISO } from 'date-fns';
import { IBuildOrderStructureService } from './build-order-structure.interface';

@Injectable()
export class BuildOrderStructureService implements IBuildOrderStructureService {
  public execute(
    data: IBuildOrderStructureService.Execute.Params[],
  ): IBuildOrderStructureService.Execute.Result[] {
    const response: {
      [key: number]: IBuildOrderStructureService.Execute.Result;
    }[] = [];

    for (const item of data) {
      if (!response[item.userId]) {
        const user = {
          user_id: item.userId,
          name: item.name,
        };

        const product = {
          product_id: item.productId,
          value: item.productPrice,
        };

        const order = {
          order_id: item.orderId,
          date: this.formatDate(item.date),
          total: this.calculateTotal('0.00', product.value),
          products: [product],
        };

        response[item.userId] = {
          ...user,
          ...{ orders: [order] },
        };

        continue;
      }

      const orders = response[item.userId]['orders'];
      const orderIndex = orders.findIndex(
        (order) => order.order_id === item.orderId,
      );

      const product = {
        product_id: item.productId,
        value: item.productPrice,
      };

      if (orderIndex === -1) {
        const order = {
          order_id: item.orderId,
          date: this.formatDate(item.date),
          total: this.calculateTotal('0.00', product.value),
          products: [product],
        };

        response[item.userId]['orders'].push(order);
        continue;
      }

      response[item.userId]['orders'][orderIndex]['products'].push(product);
      response[item.userId]['orders'][orderIndex]['total'] =
        this.calculateTotal(
          response[item.userId]['orders'][orderIndex]['total'],
          product.value,
        );
    }

    return Object.values(
      response,
    ) as IBuildOrderStructureService.Execute.Result[];
  }

  private calculateTotal(total: string, value: string): string {
    return (Number(total) + Number(value)).toFixed(2);
  }

  private formatDate(date: string): string {
    const parseDate = parseISO(date);
    return format(parseDate, 'yyyy-MM-dd');
  }
}
