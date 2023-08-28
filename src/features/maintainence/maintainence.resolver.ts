import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Maintainence } from './maintainence.entity'
import { MaintainenceService } from './maintainence.service'
import {
  CreateMaintainenceInput,
  UpdateMaintainenceInput,
} from './maintainence.inputs'

@Resolver(() => Maintainence)
export class MaintainenceResolver {
  constructor(private maintainenceService: MaintainenceService) {}

  @Query(() => Maintainence)
  async maintainence(@Args('id', { type: () => Int }) id: number) {
    return this.maintainenceService.get(id)
  }

  @Query(() => [Maintainence])
  async maintainences() {
    return this.maintainenceService.getAll()
  }

  @Query(() => [Maintainence])
  async maintainenceHistory(@Args('id', { type: () => Int }) id: number) {
    return this.maintainenceService.getHistory(id)
  }

  @Mutation(() => Maintainence)
  async createMaintainence(
    @Args('createMaintainenceData')
    createMaintainenceData: CreateMaintainenceInput,
  ): Promise<Maintainence | undefined> {
    return this.maintainenceService.create(createMaintainenceData)
  }

  @Mutation(() => Maintainence)
  async updateMaintainence(
    @Args('id')
    id: number,
    @Args('updateMaintainenceInput')
    updateMaintainenceInput: UpdateMaintainenceInput,
  ) {
    return this.maintainenceService.update(id, updateMaintainenceInput)
  }

  @Mutation(() => Int)
  async deleteMaintainence(@Args('id') id: number) {
    return this.maintainenceService.delete(id)
  }
}
