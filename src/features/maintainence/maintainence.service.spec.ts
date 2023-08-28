import { Test, TestingModule } from '@nestjs/testing'
import { MaintainenceService } from './maintainence.service'

describe('MaintainenceService', () => {
  let service: MaintainenceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaintainenceService],
    }).compile()

    service = module.get<MaintainenceService>(MaintainenceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
