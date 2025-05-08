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
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { AddCart } from 'src/cart/dto/addCart.dto';

@Controller('cart')
@UseGuards(RolesGuard)
export class CartController {
  constructor(private cartService: CartService) {}

  @Post('add/:id')
  @Roles('user', 'admin')
  async AddCart(@Body() addCartDto: AddCart, @Param('id') userId: string) {
    console.log('userId', typeof userId);
    console.log('addCartDto', addCartDto);
    return await this.cartService.addToCart(+userId, addCartDto);
  }
  @Delete(':delCart')
  @Roles('user', 'admin')
  async deleteCart(@Param('delCart') delCart: string) {
    console.log('cartId:', delCart);
    return this.cartService.deleteCart(+delCart);
  }
  @Delete('del-item/:cartItemId')
  @Roles('user', 'admin')
  async deleteItem(@Param('cartItemId') cartItemId: string) {
    console.log(cartItemId);
    return await this.cartService.deleteFromCart(+cartItemId);
  }
  @Post('plusItem')
  async plusItem(@Body() { id }: { id: number }) {
    console.log(id);
    return await this.cartService.plusCartItem(+id);
  }
  @Get(':id')
  @Roles('user', 'admin')
  async getItems(@Param('id') id: string) {
    console.log(id);
    return this.cartService.getItems(+id);
  }
  @Get('all')
  @Roles('user', 'admin')
  async getAll() {
    return this.cartService.getAll();
  }
}
