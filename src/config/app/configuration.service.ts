import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get title() {
    return this.configService.get<string>('app.title')
  }

  get port() {
    return Number(this.configService.get<string>('app.port'))
  }

  get env() {
    return this.configService.get<string>('app.env')
  }
}
