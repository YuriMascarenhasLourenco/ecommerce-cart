import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { productDto } from 'src/dto/product.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('add')
  async AddCart(
    @Body() body: { userId: number; cartId: number; product: productDto },
  ) {
    return await this.cartService.AddToCart(
      body.product,
      +body.cartId,
      +body.userId,
    );
  }
  @Delete('del-cart/:cartId')
  async deleteCart(@Param('cartId') cartId: string) {
    return this.cartService.deleteCart(+cartId);
  }
  @Delete('del-item')
  async deleteItem(@Param('cartItemId') cartItemId: string) {
    return await this.cartService.deleteFromCart(+cartItemId);
  }
  @Post('plusItem')
  async plusItem(@Body() id: productDto) {
    return await this.cartService.plusCartItem(+id);
  }
}
