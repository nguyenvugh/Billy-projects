import { InjectConnection } from '@nestjs/typeorm';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Like,
  Not,
  UpdateEvent,
} from 'typeorm';
import { SlugService } from '../../../../utils-module/service/slug.service';
import { CbiEntity } from '../../entity/cbi.entity';
import { CbiRepository } from '../../repository/cbi.repository';

@EventSubscriber()
export class AdminCbiSubscriber
  implements EntitySubscriberInterface<CbiEntity>
{
  constructor(connection: Connection, private slugService: SlugService) {
    connection.subscribers.push(this);
  }

  /**
   * Called before insert.
   */
  async beforeInsert(event: InsertEvent<CbiEntity>) {
    await this.generateSlug(event, event.entity.name);
  }

  /**
   * Called before update.
   */
  async beforeUpdate(event: UpdateEvent<CbiEntity>) {
    if (event.entity.name) {
      await this.generateSlug(event, event.entity.name, event.entity.id);
    }
  }

  listenTo() {
    return CbiEntity;
  }

  private async generateSlug(
    event: InsertEvent<CbiEntity> | UpdateEvent<CbiEntity>,
    name: string,
    idCbiUpdating: string = null,
  ) {
    const cbiRepo = event.manager.getCustomRepository(CbiRepository);
    let slug = this.slugService.slug(name);
    const conditions: any = {
      slug: Like(slug + '%'),
    };
    if (idCbiUpdating) {
      conditions['id'] = Not(idCbiUpdating);
    }
    const numSlugs = await cbiRepo.count({
      where: conditions,
    });

    if (numSlugs) {
      slug = slug + `-${numSlugs + 1}`;
    }

    event.entity.slug = slug;
  }
}
