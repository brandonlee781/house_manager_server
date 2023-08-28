import { Controller } from '@nestjs/common'
import { AppService } from './app.service'
import { MaintainenceService } from './features/maintainence/maintainence.service'

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly maintainenceService: MaintainenceService,
  ) {}

  // @Post()
  // createHello() {
  //   return this.maintainenceService.create()
  // }

  // @Get()
  // getAllHellos() {
  //   return this.maintainenceService.getAll()
  // }

  // @Get(':id')
  // getHellos(@Param('id') id: number) {
  //   return this.maintainenceService.get(id)
  // }
}
