import { userDto } from './user.dto';

export class loginUser extends userDto {
  userId: number;
  email: string;
  password: string;
  role: string;
}
