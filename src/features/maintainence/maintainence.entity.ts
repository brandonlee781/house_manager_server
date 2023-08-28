import {
  BaseEntity,
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Field, Int, ObjectType } from '@nestjs/graphql'

export type UpsertMaintainence = {
  name: string
  nextDate: Date
  previousDate?: Date | null
  interval?: number
  completed?: boolean | null
  previousId?: number
}

@Entity()
@ObjectType()
export class Maintainence extends BaseEntity<Maintainence, 'id'> {
  @PrimaryKey()
  @Field(() => Int)
  id!: number

  @Property()
  @Field()
  name!: string

  @Property({ nullable: true })
  @Field({ nullable: true })
  previousDate?: Date

  @Property()
  @Field()
  nextDate: Date

  @Property({ default: false })
  @Field()
  completed?: boolean = false

  @Property({ default: 0 })
  @Field(() => Int, {
    description: 'Number of days between needing to perform maintainence',
  })
  interval?: number = 0

  @OneToOne({ nullable: true, type: Maintainence })
  previous?: Maintainence

  @Property({ defaultRaw: 'now()' })
  @Field()
  createdDate?: Date = new Date()

  @Property({ defaultRaw: 'now()' })
  @Field()
  updatedDate?: Date = new Date()

  @Property({ nullable: true })
  deletedDate?: Date

  constructor({
    name,
    nextDate,
    previousDate,
    completed,
    interval,
  }: UpsertMaintainence) {
    super()
    this.name = name
    this.nextDate = nextDate
    this.previousDate = previousDate ?? undefined
    this.completed = completed ?? undefined
    this.interval = interval
    // this.previousId = previousId
  }
}
