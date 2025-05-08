import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createProduct } from 'src/product/dto/createProduct.dto';
import { Product } from 'src/entities/product.entity';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repoProduct: Repository<Product>,
  ) {}

  async newProduct(body: createProduct) {
    const product = this.repoProduct.create(body);
    return await this.repoProduct.save(product);
  }

  async findAll() {
    return await this.repoProduct.find({});
  }

  async findOne(name: string) {
    const product = await this.repoProduct.findOne({
      where: { name: ILike(`%${name.trim()}%`) }, // Usar ILIKE para insensibilidade a maiúsculas/minúsculas
    });

    console.log('product:', product);
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

  async updateProduct(id: number, body: createProduct) {
    const product = await this.repoProduct.findOne({ where: { id } });
    if (!product) {
      throw new HttpException(
        'We do not have this product yet',
        HttpStatus.NOT_FOUND,
      );
    }
    product.name = body.name;
    product.description = body.description;
    product.price = body.price;
    product.image = body.image;
    product.stock = body.stock;
    await this.repoProduct.save(product);
    return product;
  }
}
