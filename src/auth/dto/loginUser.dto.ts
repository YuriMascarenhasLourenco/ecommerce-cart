import { userDto } from '../../user/dto/user.dto';

export class loginUser extends userDto {
  id: number;
  email: string;
  password: string;
  role: string;
}
