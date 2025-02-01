import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  itens: CartItem[];
  @Column({ default: 0 })
  total: number;
  @Column({ default: false })
  finished: boolean;
}
