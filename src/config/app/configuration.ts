import { registerAs } from '@nestjs/config'

export default registerAs('app', () => ({
  title: process.env.APP_TITLE,
  port: process.env.PORT,
  env: process.env.NODE_ENV,
}))
