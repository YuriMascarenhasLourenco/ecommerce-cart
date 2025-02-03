import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { Product } from './entities/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
@Module({
  imports: [
    CartModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'cart-shopee',
      entities: [Cart, CartItem, Product, User],
      synchronize: true,
    }),
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
