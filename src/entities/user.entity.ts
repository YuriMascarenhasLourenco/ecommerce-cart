import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;
}
