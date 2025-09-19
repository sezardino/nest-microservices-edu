import { GqlContext } from '@nest-microservices-edu/nestjs';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  login(@Args('input') input: LoginInput, @Context() context: GqlContext) {
    return this.authService.login(input, context);
  }
}
