import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
@Injectable()
export class PaymentService {
  private stripe: Stripe;
  constructor(
    private configService: ConfigService,
    @InjectRepository(Cart) private readonly cart: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItem: Repository<CartItem>,
  ) {
    this.stripe = new Stripe(configService.get<string>('STRIPE_SECRET_KEY'), {
      apiVersion: '2025-02-24.acacia',
    });
  }
  async payment(userId: number) {
    console.log('cartId', userId);
    const cart = await this.cart.findOne({
      where: { finished: false, userId: { id: userId } },
      relations: ['itens', 'itens.product'],
    });
    console.log('cart', cart);
    if (!cart || cart.itens.length === 0) {
      throw new NotFoundException('Carrinho não encontrado ou vazio.');
    }
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.itens.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: { name: item.product.name },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'https://localhost:3000/cancelado',
    });
    console.log('session', session);
    return { url: session.url };
  }
}
