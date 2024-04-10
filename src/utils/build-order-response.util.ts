import { Injectable } from '@nestjs/common';
import { OrderResponse } from '../dtos/order-response.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class BuildOrderResponse {
  public execute(orders: Order[]) {
    const normalizedOrder: Record<string, OrderResponse> = {};

    for (const order of orders) {
      if (normalizedOrder[order.user_id]) {
        normalizedOrder[order.user_id].setOrder = order;
        continue;
      }

      normalizedOrder[order.user_id] = new OrderResponse({
        user_id: order.user_id,
        name: order?.user?.name || 'N/A',
      });

      normalizedOrder[order.user_id].setOrder = order;
    }

    return Object.values(normalizedOrder);
  }
}
