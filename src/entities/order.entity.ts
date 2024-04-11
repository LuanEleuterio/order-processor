import { format, parseISO } from 'date-fns';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';
import { ProductHistoric } from './product-historic.entity';

interface Props {
  order_id: number;
  date: string;
  user_id: number;
  total?: string;
}

@Entity()
export class Order {
  @PrimaryColumn()
  order_id: number;

  @Column({ default: '0.00' })
  total?: string;

  @Column()
  date?: string;

  @OneToMany(() => ProductHistoric, (product) => product.order)
  products?: ProductHistoric[];

  @Column()
  user_id: number;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  constructor(props: Props) {
    Object.assign(this, props);
  }

  public calculateTotal(value: number) {
    const total = Number(this.total) + value;
    this.total = total.toFixed(2);
  }

  public formatDate() {
    const parseDate = parseISO(this.date);
    this.date = format(parseDate, 'yyyy-MM-dd');
  }

  set setProducts(product: ProductHistoric) {
    if (!this.products) {
      this.products = [];
    }
    this.products.push(product);
  }

  get getProducts() {
    return this.products;
  }
}
