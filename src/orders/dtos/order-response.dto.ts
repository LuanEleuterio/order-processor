interface Products {
  product_id: number;
  value: string;
}

interface Order {
  order_id: number;
  date: string;
  total: string;
  products: Products[];
}

interface OrderProps {
  order_id: number;
  date: Date;
  total: string;
  products: Products[];
}

interface Props {
  user_id: number;
  name: string;
}

export class OrderResponseDTO {
  private user_id: number;
  private name: string;
  private orders?: Order[];

  constructor(props: Props) {
    Object.assign(this, props);
    this.orders = [];
  }

  public addOrder(order: OrderProps) {
    const date = this.formatDate(order.date);
    this.orders.push({
      ...order,
      date,
    });
  }

  public toJSON() {
    return {
      user_id: this.user_id,
      name: this.name,
      orders: this.orders,
    };
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}
