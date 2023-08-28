import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './configuration'
import { z } from 'zod'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validate: (data) => {
        return z
          .object({
            APP_TITLE: z.string().default('NestJS App'),
            PORT: z.coerce.number().default(3000),
            NODE_ENV: z.enum(['development', 'production']),
          })
          .parse(data)
      },
    }),
  ],
})
export class AppConfigModule {}
