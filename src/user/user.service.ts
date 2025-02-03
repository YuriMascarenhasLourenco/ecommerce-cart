import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (checkUser) {
      throw new HttpException(
        'This user already exists',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const user = await this.userRepo.create({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
    });
    return this.userRepo.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(
        'There is no user like that',
        HttpStatus.BAD_REQUEST,
      );
    }
    user.password = updateUserDto.password;
    return await this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (user) {
      return await this.userRepo.remove(user);
    } else {
      throw new HttpException('There is no user', HttpStatus.NOT_FOUND);
    }
  }
}
