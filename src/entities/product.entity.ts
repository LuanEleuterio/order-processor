import { Column, Entity, PrimaryColumn } from 'typeorm';

export class Product {
  @PrimaryColumn()
  id: number;

  @Column()
  value: string;

  constructor(props: Product) {
    Object.assign(this, props);
  }
}
