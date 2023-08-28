import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateMaintainenceInput {
  @Field()
  name!: string

  @Field()
  nextDate!: Date

  @Field({ nullable: true })
  previousDate?: Date

  @Field({ nullable: true })
  completed?: boolean

  @Field({ nullable: true })
  interval?: number
}

@InputType()
export class UpdateMaintainenceInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  nextDate?: Date

  @Field({ nullable: true })
  previousDate?: Date

  @Field({ nullable: true })
  completed?: boolean

  @Field({ nullable: true })
  interval?: number
}
