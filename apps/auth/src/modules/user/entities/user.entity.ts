import { AbstractModel } from '@nest-microservices-edu/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel {
  @Field(() => String, { description: 'User email' })
  email: number;
}
