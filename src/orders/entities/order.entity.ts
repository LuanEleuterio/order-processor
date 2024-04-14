import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type OrderDocument = Order & Document;

interface Props {
  order_id: number;
  date: string;
  user_id: number;
  total: string;
  products?: string[];
}

interface User {
  user_id: number;
  name: string;
}

class Products {
  @Prop()
  product_id: number;

  @Prop()
  value: string;
}

@Schema({ collection: 'orders', timestamps: true })
export class Order {
  @Prop({ required: true })
  order_id: number;

  @Prop({ required: true, default: '0.00' })
  total: string;

  @Prop({ required: true, default: new Date() })
  date: Date;

  @Prop({ items: Products, default: [] })
  products: Products[];

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user_id: Types.ObjectId;

  user?: User;

  constructor(props: Props) {
    Object.assign(this, props);
    this.total = '0.00';
  }
}

export const OrderSchema = SchemaFactory.createForClass(Order);
