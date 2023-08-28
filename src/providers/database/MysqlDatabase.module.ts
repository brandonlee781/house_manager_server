import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { DatabaseConfigModule } from '@/config/database/configuration.module'
import { DatabaseConfigService } from '@/config/database/configuration.service'
import config from '@/mikro-orm.config'

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useFactory: async () => ({
        ...config,
      }),
      inject: [DatabaseConfigService],
    }),
  ],
})
export class MysqlDatabaseModule {}
