import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'user email' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'user password' })
  @IsStrongPassword()
  password: string;
}
