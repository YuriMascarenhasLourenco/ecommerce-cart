import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  CartItemid: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  quantity: number;
  @ManyToOne(() => Cart, (cart) => cart.itens)
  cart: Cart;
  @ManyToOne(() => Product)
  product: Product;
}
