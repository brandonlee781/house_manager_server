import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MaintainenceModule } from './features/maintainence/maintainence.module'
import { ConfigModule } from '@nestjs/config'
import { AppLoggerMiddleware } from './middleware/app-logger/app-logger.middleware'
import { DatabaseConfigModule } from './config/database/configuration.module'
import { MysqlDatabaseModule } from './providers/database/MysqlDatabase.module'
import { MaintainenceService } from './features/maintainence/maintainence.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'
import { LoggingPlugin } from './middleware/apollo-logger/apollo-logger.plugin'

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MaintainenceModule,
    DatabaseConfigModule,
    MysqlDatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, MaintainenceService, LoggingPlugin],
})
export class AppModule /*implements NestModule*/ {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AppLoggerMiddleware).forRoutes('')
  // }
}
