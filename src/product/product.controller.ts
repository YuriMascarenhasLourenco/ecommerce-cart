import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProduct } from 'src/product/dto/createProduct.dto';
import { Public } from 'src/auth/decorator/public.decorator';
import { Roles } from 'src/auth/decorator/role.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('add')
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
  @Get('name/:name') // Tornar a rota mais específica
  findOne(@Param('name') name: string) {
    console.log('nameProduct:', name);
    return this.productService.findOne(name);
  }
  @Public()
  @Get(':id') // Rota para buscar por ID
  getOne(@Param('id') id: string) {
    console.log('idProduct:', id);
    return this.productService.getOne(+id);
  }
  @Put(':id')
  @Roles('admin')
  async updateProduct(@Param('id') id: string, @Body() body: createProduct) {
    return this.productService.updateProduct(+id, body);
  }
}
