import { Injectable } from '@nestjs/common';
import { userDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { loginUser } from 'src/auth/dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<userDto | null> {
    const user = this.userService.validatePassword(email, password);

    if (user) {
      return user;
    }
    return null;
  }
  login(user: loginUser) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
