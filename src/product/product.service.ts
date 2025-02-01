import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}
  findAll() {
    return this.repo.find({});
  }

  async findOne(name: string) {
    return await this.repo.findOne({
      where: {
        name,
      },
    });
  }
}
