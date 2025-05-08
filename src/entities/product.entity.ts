import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from './cartItem.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;
  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItem: CartItem;
  @Column({ nullable: true })
  image: string;
}
