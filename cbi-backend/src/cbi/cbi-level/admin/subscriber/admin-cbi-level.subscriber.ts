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
import { CbiLevelEntity } from '../../entity/cbi-level.entity';
import { CbiLevelRepository } from '../../repository/cbi-level.repository';

@EventSubscriber()
export class AdminCbiLevelSubscriber
  implements EntitySubscriberInterface<CbiLevelEntity>
{
  constructor(connection: Connection, private slugService: SlugService) {
    connection.subscribers.push(this);
  }

  /**
   * Called before insert.
   */
  async beforeInsert(event: InsertEvent<CbiLevelEntity>) {
    await this.generateSlug(event, event.entity.name);
  }

  /**
   * Called before update.
   */
  async beforeUpdate(event: UpdateEvent<CbiLevelEntity>) {
    if (event.entity.name) {
      await this.generateSlug(event, event.entity.name, event.entity.id);
    }
  }

  listenTo() {
    return CbiLevelEntity;
  }

  private async generateSlug(
    event: InsertEvent<CbiLevelEntity> | UpdateEvent<CbiLevelEntity>,
    name: string,
    idCbiLevelUpdating: string = null,
  ) {
    const cbiRepo = event.manager.getCustomRepository(CbiLevelRepository);
    let slug = this.slugService.slug(name);
    const conditions: any = {
      slug: Like(slug + '%'),
    };
    if (idCbiLevelUpdating) {
      conditions['id'] = Not(idCbiLevelUpdating);
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
