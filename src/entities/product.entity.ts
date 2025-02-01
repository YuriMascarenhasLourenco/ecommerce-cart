import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
