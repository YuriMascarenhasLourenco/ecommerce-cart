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
    console.log('userId', typeof userId);
    console.log('productId', typeof addCartDto.productId);

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
  async deleteCart(delCart: number) {
    const items = await this.cartItem.find({
      where: {
        cart: { id: delCart },
      },
    });
    return await this.cartItem.remove(items);
  }
  async plusCartItem(id: number) {
    const validId = Number(id);
    if (isNaN(validId)) {
      throw new HttpException('invalid id', HttpStatus.BAD_REQUEST);
    }
    const cartChanged = await this.cartItem.findOne({
      where: { id: validId },
    });
    if (cartChanged) {
      cartChanged.quantity++;

      await this.cartItem.save(cartChanged);
      return cartChanged;
    }
    return null;
  }
  async getItems(userId: number) {
    try {
      const cartItems = await this.cartItem
        .createQueryBuilder('cartItem')
        .leftJoinAndSelect('cartItem.cart', 'cart')
        .leftJoinAndSelect('cartItem.product', 'product')
        .select([
          'cartItem.id AS id', // Alias para o ID do item no carrinho
          'cartItem.quantity AS quantity', // Alias para a quantidade
          'cart.id AS "cartId"', // Alias para o ID do carrinho
          'product.id AS productId', // Alias para o ID do produto
          'product.name AS name', // Alias para o nome do produto
          'product.price AS price', // Alias para o preço do produto
        ])
        .where('cart.finished = :finished', { finished: false }) // Condição para carrinho não finalizado
        .andWhere('cart.userId = :userId', { userId }) // Condição para o ID do usuário
        .getRawMany(); // Retorna os dados com os aliases definidos
      console.log(cartItems);
      return cartItems;
    } catch (error) {
      throw new HttpException(
        `Error fetching cart items: ${error}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async getAll() {
    const cart = await this.repo.find({
      where: { finished: true },
      relations: ['itens', 'itens.product'],
    });
    return cart;
  }
}
