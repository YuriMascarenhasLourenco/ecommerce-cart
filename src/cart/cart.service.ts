import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddCart } from 'src/cart/dto/addCart.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cartItem.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repo: Repository<Cart>,
    @InjectRepository(CartItem) private readonly cartItem: Repository<CartItem>,
    @InjectRepository(Product) private readonly producrepo: Repository<Product>,
  ) {}

  async addToCart(userId: number, addCartDto: AddCart) {
    const { productId, quantity } = addCartDto;
    let cart = await this.repo.findOne({
      where: { finished: false, userId: { id: userId } },
      relations: ['itens', 'itens.product'],
    });

    if (!cart) {
      cart = this.repo.create({
        finished: false,
        itens: [],
        userId: { id: userId },
      });
      await this.repo.save(cart);
    }
    const findproduct = await this.producrepo.findOne({
      where: { id: productId },
    });
    if (!findproduct) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }
    const existingItem = cart.itens.find(
      (item) => item.product.id === productId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
      await this.cartItem.save(existingItem);
    } else {
      const newItem = this.cartItem.create({
        cart,
        name: findproduct.name,
        quantity,
        product: { id: productId },
      });
      await this.cartItem.save(newItem);
    }
    return this.repo.findOne({
      where: { id: cart.id },
      relations: ['itens', 'itens.product'],
    });
  }

  async deleteFromCart(id: number) {
    const item = await this.cartItem.findOne({ where: { id } });
    if (!item) {
      throw new HttpException(
        'there is no product like that in your cart',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.cartItem.remove(item);
  }
  async deleteCart(userId: number) {
    const cart = await this.repo.findOne({ where: { id: userId } });
    return await this.repo.remove(cart);
  }
  async plusCartItem(id: number) {
    const cartChanged = await this.cartItem.findOne({
      where: { id },
    });
    if (cartChanged) {
      cartChanged.quantity++;

      return await this.cartItem.save(cartChanged);
    }
    return null;
  }
  async getItems(id: number) {
    const cart = await this.repo.find({
      where: { id },
      relations: ['itens', 'itens.product'],
    });
    if (cart) {
      return await this.cartItem.find({
        where: { cart: { id } },
        relations: ['cart', 'product'],
      });
    }
  }
}
