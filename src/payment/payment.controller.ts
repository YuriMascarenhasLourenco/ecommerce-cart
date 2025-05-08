import { Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private payService: PaymentService) {}

  @Post(':checkout')
  async createCheckout(@Param('checkout') cartId: number) {
    console.log('cartIdc', cartId);
    return this.payService.payment(cartId);
  }
}
