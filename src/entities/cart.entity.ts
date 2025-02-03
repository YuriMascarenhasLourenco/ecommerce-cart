import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem.entity';
import { User } from './user.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cartId: number;
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  itens: CartItem[];
  @Column({ default: 0 })
  total: number;
  @Column({ default: false })
  finished: boolean;
  user: User;
}
