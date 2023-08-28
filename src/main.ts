import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ConsoleLogger } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'https://studio.apollographql.com',
    },
  })
  const config = app.get(ConfigService)
  const logger = new ConsoleLogger()
  const port = Number(config.get('app.port'))

  await app.listen(port).then(() => {
    logger.log(`Server started on port ${port}`)
  })
}
bootstrap()
