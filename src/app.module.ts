import { Module } from '@nestjs/common'
import { MaintainenceModule } from './features/maintainence/maintainence.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseConfigModule } from './config/database/configuration.module'
import { MysqlDatabaseModule } from './providers/database/MysqlDatabase.module'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { join } from 'path'

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
  controllers: [],
  providers: [],
})
export class AppModule /*implements NestModule*/ {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AppLoggerMiddleware).forRoutes('')
  // }
}
