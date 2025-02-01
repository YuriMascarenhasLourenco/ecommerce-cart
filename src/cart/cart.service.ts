import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repo: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItem: Repository<CartItem>,
  ) {}

  async AddToCart(product: productDto, cartId: number) {
    const cart = await this.repo.find({
      where: { id: cartId },
      relations: ['itens'],
    });
    if (!cart) {
      const newCart = await this.repo.create({
        finished:false,
        total:0,
      });
       await this.repo.save(newCart)
    }
    return await this.cartItem.create(product);
  }
  async deleteFromCart(id: number) {
    const item =await this.cartItem.findOne({ where: { id } });
    if(item){
        await this.repo.delete(item)
    }
  }
  async deleteCart() {
    const cart = await this.repo.findOne({});
    return await this.repo.delete(cart);
  }
  async plusCartItem(id: number) {
    const cartChanged = await this.cartItem.findOne({ where: { id } });
    if (cartChanged) {
      cartChanged.quantity++;
      return await this.cartItem.save(cartChanged);
    }
    return null;
  }
}
