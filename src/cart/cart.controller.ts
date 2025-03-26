import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { productDto } from 'src/product/dto/product.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { AddCart } from 'src/cart/dto/addCart.dto';

@Controller('cart')
@UseGuards(RolesGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('add/:id')
  @Roles('user', 'admin')
  async AddCart(@Body() addCartDto: AddCart, @Param('id') userId: number) {
    return await this.cartService.addToCart(userId, addCartDto);
  }
  @Delete('del-cart/:cartId')
  async deleteCart(@Param('cartId') cartId: number) {
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
  @Get(':id')
  async getItems(@Param('id') id: string) {
    return this.cartService.getItems(+id);
  }
}
