import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'Email for user authentication' })
  email: string;

  @Field(() => String, { description: 'Password for user authentication' })
  password: string;
}
