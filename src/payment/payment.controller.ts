import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private payService: PaymentService) {}

  @Post()
  async createCheckout(@Body() body: { cartId: number }) {
    return this.payService.payment(body.cartId);
  }
}
