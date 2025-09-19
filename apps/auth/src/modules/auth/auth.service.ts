import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { GqlContext } from '@nest-microservices-edu/nestjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginInput } from './dto/login.input';
import { JwtTokenPayload } from './interfaces/token-payload.interface';

const AUTH_TOKEN_EXPIRATION_MINUTES = 15;
const AUTH_TOKEN_EXPIRATION_MILLISECONDS =
  AUTH_TOKEN_EXPIRATION_MINUTES * 60 * 1000;
const AUTH_TOKEN_NAME = 'Authentication';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async login(input: LoginInput, context: GqlContext) {
    const { email, password } = input;

    const user = await this.validateUser(email, password);

    const payload: JwtTokenPayload = { userId: user.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: `${AUTH_TOKEN_EXPIRATION_MINUTES}m`,
    });

    context.res.cookie(AUTH_TOKEN_NAME, token, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      maxAge: AUTH_TOKEN_EXPIRATION_MILLISECONDS,
    });

    return user;
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
