import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  itens: CartItem[];

  @Column({ default: false })
  finished: boolean;

  @OneToOne(() => User, (item) => item.cart)
  @JoinColumn()
  userId: User;
}
