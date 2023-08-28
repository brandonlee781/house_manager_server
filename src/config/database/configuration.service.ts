import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host() {
    return this.configService.get<string>('database.host')
  }

  get user() {
    return this.configService.get<string>('database.user')
  }

  get dbName() {
    return this.configService.get<string>('database.dbName')
  }

  get pass() {
    return this.configService.get<string>('database.pass')
  }

  get port() {
    return Number(this.configService.get<string>('database.port'))
  }
}
