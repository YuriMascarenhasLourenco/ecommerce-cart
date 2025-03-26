import { IsNumber, Min } from 'class-validator';

export class AddCart {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}
