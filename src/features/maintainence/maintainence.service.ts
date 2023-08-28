import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Maintainence, UpsertMaintainence } from './maintainence.entity'
import { EntityManager } from '@mikro-orm/mariadb'
import { addDays } from 'date-fns'

@Injectable()
export class MaintainenceService {
  constructor(private readonly em: EntityManager) {}

  async create(createData: UpsertMaintainence) {
    const created = new Maintainence(createData)
    await this.em.persistAndFlush([created])

    return created
  }

  async get(id: number) {
    const maintainenceItem = await this.em.findOne(Maintainence, id)
    if (maintainenceItem && maintainenceItem.deletedDate === null) {
      return maintainenceItem
    }

    throw new NotFoundException('Maintainence does not exist')
  }

  async getAll() {
    const maintainenceItems = await this.em.find(Maintainence, {
      deletedDate: null,
    })

    if (maintainenceItems.length) {
      return maintainenceItems
    }

    throw new BadRequestException()
  }

  async getHistory(
    id: number,
    items: Maintainence[] = [],
  ): Promise<Maintainence[]> {
    const current = await this.em.findOne(Maintainence, id)

    if (!current) {
      throw new NotFoundException('Maintance does not exist')
    }

    if (current && current.previous?.id && current.deletedDate !== null) {
      // current item has been deleted, but there are previous records
      return this.getHistory(current.previous.id, items)
    }

    if (current && current?.previous?.id) {
      return this.getHistory(current.previous.id, [...items, current])
    }
    return [...items, current]
  }

  async update(id: number, payload: Partial<UpsertMaintainence>) {
    const maintainenceItem = this.em.getReference(Maintainence, id)

    const createNew =
      payload.completed && payload.completed !== maintainenceItem.completed

    if (maintainenceItem) {
      maintainenceItem.name = payload.name
        ? payload.name
        : maintainenceItem.name

      maintainenceItem.previousDate = payload.previousDate
        ? payload.previousDate
        : maintainenceItem.previousDate

      maintainenceItem.nextDate = payload.nextDate
        ? payload.nextDate
        : maintainenceItem.nextDate

      maintainenceItem.completed = payload.completed
        ? payload.completed
        : maintainenceItem.completed

      maintainenceItem.interval = payload.interval
        ? payload.interval
        : maintainenceItem.interval

      maintainenceItem.updatedDate = new Date()

      await this.em.flush()

      if (createNew) {
        const current = await this.get(id)
        return this.createNext(current)
      } else {
        return this.get(id)
      }
    }

    throw new NotFoundException('Maintainence does not exist')
  }

  async createNext(previous: Maintainence) {
    const nextItem = new Maintainence({
      name: previous.name,
      previousDate: previous.nextDate,
      completed: false,
      interval: previous.interval,
      nextDate: addDays(previous.nextDate, previous.interval ?? 0),
    })

    nextItem.previous = previous

    await this.em.persistAndFlush([nextItem])

    return nextItem
  }

  async delete(id: number) {
    const maintainenceItem = await this.em.getReference(Maintainence, id)

    if (maintainenceItem) {
      maintainenceItem.deletedDate = new Date()
      await this.em.flush()
    }

    return id
  }
}
