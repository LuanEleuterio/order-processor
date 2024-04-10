import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Order } from './order.entity';

export interface UserProps {
  id: number;
  name: string;
}

@Entity()
export class User {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.user)
  order?: Order;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
