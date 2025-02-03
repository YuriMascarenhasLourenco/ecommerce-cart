import { Body, Controller, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { productDto } from 'src/dto/product.dto';
import { userDto } from 'src/dto/user.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Post()
  async AddCart(
    @Body() product: productDto,
    @Body() cartId: number,
    @Body() { userId }: userDto,
  ) {
    return await this.cartService.AddToCart(product, cartId, userId);
  }
  async deleteCart(@Param('cartId') cartId: string) {
    return this.cartService.deleteCart(+cartId);
  }
}
