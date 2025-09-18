import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { UserService } from '../user/user.service';
import { LoginInput } from './dto/login.input';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(input: LoginInput) {
    const { email, password } = input;

    const user = await this.validateUser(email, password);
  }

  private async validateUser(email: string, password: string) {
    const user = await this.userService.findOne({ email });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
