import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({})
  password: string;

  @Column({ default: true })
  salt: string;

  @OneToOne(() => Cart, (cart) => cart.userId, { cascade: true })
  cart: Cart;

  @Column({ default: 'user' })
  role: string;
}
