import { format, parseISO } from 'date-fns';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type OrderDocument = Order & Document;

interface Props {
  order_id: number;
  date: string;
  user_id: number;
  total?: string;
  products?: string[];
}

class ProductsRef {
  @Prop()
  product_id: string;

  @Prop()
  value: string;
}

@Schema({ collection: 'orders', timestamps: true })
export class Order {
  @Prop({ required: true })
  order_id: number;

  @Prop({ required: true, default: '0.00' })
  total?: string;

  @Prop({ required: true })
  date?: string;

  @Prop({ ref: 'ProductHistoric', default: [] })
  products?: string[] | ProductsRef[];

  @Prop({ ref: 'Users' })
  user_id: string;

  constructor(props: Props) {
    Object.assign(this, props);
    this.total = '0.00';
  }

  public calculateTotal(value: number) {
    const total = Number(this.total) + value;
    this.total = total.toFixed(2);
  }

  public formatDate() {
    const parseDate = parseISO(this.date);
    this.date = format(parseDate, 'yyyy-MM-dd');
  }

  set setProducts(productId: string) {
    if (!this.products) {
      this.products = [];
    }
    this.products = [...this.products, productId] as unknown as string[];
  }

  get getProducts() {
    return this.products;
  }
}

export const OrderSchema = SchemaFactory.createForClass(Order);
