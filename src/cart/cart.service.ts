import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { productDto } from 'src/dto/product.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repo: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItem: Repository<CartItem>,
  ) {}

  async AddToCart(product: productDto, cartId: number, userId: number) {
    const cart = await this.repo.find({
      where: { cartId, finished: false, user: { id: userId } },
      relations: ['itens'],
    });
    if (!cart) {
      const newCart = await this.repo.create({
        user: {id: userId },
        finished: false,
        total: 0,
      });
      const item = await this.cartItem.findOne({
        where: { product: { id: product.id }, cart: { cartId: cartId } },
        relations: ['product', 'cart'],
      });
      if (item) {
        item.quantity++;
      }
      return await this.cartItem.create(product);
    }
  }
  async deleteFromCart(id: number) {
    const item = await this.cartItem.findOne({ where: { CartItemid: id } });
    if (!item) {
      throw new HttpException(
        'there is no product like that in your cart',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cartItem.remove(item);
  }
  async deleteCart(userId) {
    const cart = await this.repo.findOne({ where: { cartId: userId } });
    return await this.repo.remove(cart);
  }
  async plusCartItem(id: number) {
    const cartChanged = await this.cartItem.findOne({ where: { CartItemid: id} });
    if (cartChanged) {
      cartChanged.quantity++;

      return await this.cartItem.save(cartChanged);
    }
    return null;
  }
}
