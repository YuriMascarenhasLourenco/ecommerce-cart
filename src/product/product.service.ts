import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProduct } from 'src/product/dto/createProduct.dto';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repoProduct: Repository<Product>,
  ) { }
  async newProduct(body: createProduct) {
    const product = await this.repoProduct.create(body);
    return await this.repoProduct.save(product);
  }
  async findAll() {
    return await this.repoProduct.find({});
  }

  async findOne(name: string) {
    const product = await this.repoProduct.findOne({ where: { name } });
    if (!product) {
      throw new HttpException(
        'We do not have this product yet',
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }
  async getOne(id: number) {
    return await this.repoProduct.findOne({ where: { id } });
  }
}
