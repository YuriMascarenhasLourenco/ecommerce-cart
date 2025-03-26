import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';
import { Product } from './entities/product.entity';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { userSuscriber } from './subscribers/userSubscriber';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/role.guard';
import { JwtModule } from '@nestjs/jwt';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
      subscribers: [userSuscriber],
    }),
    ProductModule,
    UserModule,
    AuthModule,
    JwtModule,
    PaymentModule.forRootAsync(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
