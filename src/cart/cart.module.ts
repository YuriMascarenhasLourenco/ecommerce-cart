import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from 'src/entities/cartItem.entity';
import { CartController } from './cart.controller';
import { User } from 'src/entities/user.entity';
import { Product } from 'src/entities/product.entity';
import { Cart } from 'src/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, User, Product, Cart])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
