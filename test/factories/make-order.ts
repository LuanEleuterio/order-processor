import { faker } from '@faker-js/faker';
import { Order } from '../../src/orders/entities/order.entity';
import { Types } from 'mongoose';

export function makeOrder(override?: any): Order {
  return Order.create({
    order_id: faker.number.int(),
    date: new Date(),
    user_id: new Types.ObjectId(),
    total: '100.00',
    products: [
      {
        product_id: faker.number.int(),
        value: '100.00',
      },
    ],
    ...override,
  });
}
