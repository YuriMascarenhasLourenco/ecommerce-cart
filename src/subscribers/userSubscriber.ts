import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { cryptoUtil } from 'src/utils/crypt.util';
import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class userSuscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }
  async beforeInsert(event: InsertEvent<User>) {
    await this.validateEmail(event);
    await this.hashInsertedPassword(event);
  }
  async beforeUpdate(event: UpdateEvent<User>) {
    await this.validateEmail(event);
    await this.hashPasswordChange(event);
  }

  async hashPasswordChange(event: UpdateEvent<User>) {
    const userChange = event.entity as User;

    if (userChange.id) {
      const hasUser = await event.manager.findOne(User, {
        where: {
          id: userChange.id,
        },
      });
      if (hasUser) {
        await this.hashPassword(userChange);
      } else {
        throw new HttpException(
          'there is no user like this in database',
          HttpStatus.NOT_FOUND,
        );
      }
    }
  }
  async hashInsertedPassword(event: InsertEvent<User>) {
    const user = event.entity;

    await this.hashPassword(user);

    return;
  }
  async hashPassword(user: User) {
    user.salt = await cryptoUtil.generateSalt();
    user.password = await cryptoUtil.hashPassword(user.password, user.salt);
  }

  async validateEmail(event: InsertEvent<User> | UpdateEvent<User>) {
    const user = event.entity;

    if (user.email) {
      const hasUser = await event.manager.findOne(User, {
        where: {
          email: user.email,
        },
      });
      if (hasUser) {
        throw new HttpException(
          'this email is already used',
          HttpStatus.FORBIDDEN,
        );
      } else {
        return;
      }
    }
  }
}
