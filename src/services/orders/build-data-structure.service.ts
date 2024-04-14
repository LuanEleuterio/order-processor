import { Injectable } from '@nestjs/common';
import { NormalizeOrder } from 'src/dtos/normalized-order.dto';
import { Order } from 'src/orders/entities/order.entity';
import { ProductHistoric } from 'src/entities/product-historic.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BuildDataStructureService {
  public execute(data: NormalizeOrder[]) {
    const users: {
      [key: string]: User;
    }[] = [];
    const orders: {
      [key: string]: Order;
    }[] = [];
    const products: ProductHistoric[] = [];

    for (const item of data) {
      const product = new ProductHistoric({
        product_id: Number(item.productId),
        order_id: Number(item.orderId),
        value: item.productPrice,
      });

      if (!users[item.userId]) {
        users[item.userId] = new User({
          user_id: Number(item.userId),
          name: item.name,
        });
      }

      if (!orders[item.orderId]) {
        orders[item.orderId] = new Order({
          order_id: Number(item.orderId),
          user_id: Number(item.userId),
          date: item.date,
        });
        orders[item.orderId].formatDate();
        orders[item.orderId].setProducts = product;
        orders[item.orderId].calculateTotal(Number(product.value));
      } else {
        orders[item.orderId].setProducts = product;
        orders[item.orderId].calculateTotal(Number(product.value));
      }

      products.push(product);
    }

    return {
      users: Object.values(users) as unknown as User[],
      orders: Object.values(orders) as unknown as Order[],
      products,
    };
  }
}
