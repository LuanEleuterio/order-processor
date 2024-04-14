import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductHistoricDocument = ProductHistoric & Document;

export interface ProductHistoricProps {
  product_id: number;
  value: string;
}

@Schema({ collection: 'productsHistoric', timestamps: true })
export class ProductHistoric {
  @Prop({ required: true })
  product_id: number;

  @Prop({ required: true })
  value: string;

  constructor(props: ProductHistoric) {
    Object.assign(this, props);
  }
}

export const ProductHistoricSchema =
  SchemaFactory.createForClass(ProductHistoric);
