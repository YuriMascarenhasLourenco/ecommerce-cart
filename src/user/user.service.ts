import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { userDto } from 'src/user/dto/user.dto';
import { cryptoUtil } from 'src/utils/crypt.util';
import { plainToInstance } from 'class-transformer';

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
    user.name = updateUserDto.name;
    user.email = updateUserDto.email;
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
  async validatePassword(
    email: string,
    password: string,
  ): Promise<userDto | null> {
    Logger.log('');
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    if (
      user &&
      (await cryptoUtil.validatePassword(password, user.salt, user.password))
    ) {
      return plainToInstance(userDto, user);
    } else {
      return null;
    }
  }
}
