import { defineConfig } from '@mikro-orm/mariadb'

export default defineConfig({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  dbName: 'house_manager',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  migrations: {
    path: 'src/database/migrations',
  },
})
