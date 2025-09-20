import { GqlContext } from '@nest-microservices-edu/nestjs';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { envVarsConfig } from './configs/env-vars.config';
import { JobsModule } from './modules/jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: envVarsConfig }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: {
        settings: { 'request.credentials': 'include' },
      },
      context: ({ req, res }): GqlContext => ({ req, res }),
    }),
    JobsModule,
  ],
})
export class AppModule {}
