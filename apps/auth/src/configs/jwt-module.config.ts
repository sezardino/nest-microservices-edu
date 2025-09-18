import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleConfig = (
  configService: ConfigService
): JwtModuleOptions => ({
  secret: configService.get<string>('AUTH_JWT_SECRET'),
});
