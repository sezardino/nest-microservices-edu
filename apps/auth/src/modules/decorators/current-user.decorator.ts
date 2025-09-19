import { createParamDecorator, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtTokenPayload } from '../auth/interfaces/token-payload.interface';

type CurrentUserKeys = keyof JwtTokenPayload;

export const CurrentUser = createParamDecorator((key: CurrentUserKeys, ctx) => {
  const user = GqlExecutionContext.create(ctx).getContext().req.user;

  if (!user) throw new UnauthorizedException();

  return key ? user[key] : user;
});
