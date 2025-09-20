import { AbstractModel } from '@nest-microservices-edu/nestjs';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Job extends AbstractModel {
  @Field(() => String, { description: 'Job title' })
  title: string;

  @Field(() => String, { description: 'Job description' })
  description: string;
}
