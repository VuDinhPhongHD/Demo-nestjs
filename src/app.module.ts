import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DataloaderModule } from './common/dataloader/dataloader.module';
import { DataloaderService } from './common/dataloader/dataloader.service';
import { dataSourceOption } from 'db/data-source';
import { DataloaderMiddleware } from './common/middleware/dataloader.middleware';

@Module({
  imports: [
    DataloaderModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      context: ({ req }) => ({ loaders: req.loaders }),
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class', // or 'interface',
      },
    }),
    TypeOrmModule.forRoot(dataSourceOption),
    PetsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DataloaderService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DataloaderMiddleware).forRoutes('*'); // Apply middleware for all routes
  }
}
