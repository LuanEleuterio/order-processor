import { Order as OrderEntity } from 'src/entities/order.entity';

interface ProductProps {
  product_id: number;
  value: string;
}

interface Order {
  order_id: number;
  date: string;
  total: string;
  products: ProductProps[];
}

interface OrderProps {
  user_id: number;
  name: string;
}

export class OrderDTO {
  private user_id: number;
  private name: string;
  private orders?: Order[];

  constructor(props: OrderProps) {
    Object.assign(this, props);
    this.orders = [];
  }

  set setOrder(order: OrderEntity) {
    this.user_id = order.user_id;
    this.name = order?.user?.name || 'N/A';

    this.orders.push({
      order_id: order.order_id,
      date: order.date,
      total: order.total,
      products: order.getProducts.map((product) => {
        return {
          product_id: product.product_id,
          value: product.value,
        };
      }),
    });
  }
}
