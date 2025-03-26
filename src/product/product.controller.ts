import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProduct } from 'src/dto/createProduct.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { RolesGuard } from 'src/guard/role.guard';
import { Roles } from 'src/decorators/role.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('add')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async createProduct(@Body() body: createProduct) {
    await this.productService.newProduct(body);
  }
  @Public()
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @Public()
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.productService.findOne(name);
  }
}
