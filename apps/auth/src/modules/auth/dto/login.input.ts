import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'Email for user authentication' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'Password for user authentication' })
  @IsNotEmpty()
  password: string;
}
