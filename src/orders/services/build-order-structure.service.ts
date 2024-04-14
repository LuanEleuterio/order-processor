/* eslint-disable @typescript-eslint/no-unused-vars */
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
          orders: [order],
        };
      }
      const t = response[item.userId];
    }

    return [];
  }

  private calculateTotal(total: string, value: string): string {
    return (Number(total) + Number(value)).toFixed(2);
  }

  private formatDate(date: string): string {
    const parseDate = parseISO(date);
    return format(parseDate, 'yyyy-MM-dd');
  }
}
