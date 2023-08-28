import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { Maintainence } from './maintainence.entity'
import { MaintainenceService } from './maintainence.service'
import { MaintainenceResolver } from './maintainence.resolver'

@Module({
  imports: [MikroOrmModule.forFeature([Maintainence])],
  providers: [MaintainenceService, MaintainenceResolver],
})
export class MaintainenceModule {}
