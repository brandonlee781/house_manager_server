import { z } from 'zod'
import { Module } from '@nestjs/common'
import configuration from './configuration'
import { DatabaseConfigService } from './configuration.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: (data) => {
        return z
          .object({
            DB_HOST: z.string().default('localhost'),
            DB_PORT: z.coerce.number().default(3006),
            DB_USER: z.string().default('root'),
            DB_PASS: z.string(),
            DB_NAME: z.string(),
          })
          .parse(data)
      },
    }),
  ],
  providers: [ConfigService, DatabaseConfigService],
  exports: [ConfigService, DatabaseConfigService],
})
export class DatabaseConfigModule {}
