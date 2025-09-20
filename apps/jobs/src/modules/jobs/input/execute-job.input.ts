import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ExecuteJobInput {
  @Field(() => String, { description: 'Email for user authentication' })
  @IsNotEmpty()
  @IsString()
  id: string;
}
