import { InjectConnection } from '@nestjs/typeorm';
import { SlugService } from 'src/utils-module/service/slug.service';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Like,
  UpdateEvent,
} from 'typeorm';
import { ArticleCategoryTranslation } from '../entitiy/article_cetegory_translation.entity';

@EventSubscriber()
export class ArticleCategoryTranslationSubscriber
  implements EntitySubscriberInterface<ArticleCategoryTranslation>
{
  constructor(
    @InjectConnection() readonly connection: Connection,
    private slugService: SlugService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ArticleCategoryTranslation;
  }

  /**
   * Called before insert.
   */
  async beforeInsert(event: InsertEvent<ArticleCategoryTranslation>) {
    const name = event.entity?.name;
    if (name) await this.slugArticleCateTranslate(event);
  }

  async beforeUpdate(event: UpdateEvent<ArticleCategoryTranslation>) {
    const name = event.entity?.name;
    if (name) await this.slugArticleCateTranslate(event);
  }

  private async slugArticleCateTranslate(
    event:
      | InsertEvent<ArticleCategoryTranslation>
      | UpdateEvent<ArticleCategoryTranslation>,
  ) {
    const { name } = event.entity;
    const articleCateTranslationRepo = event.manager.getRepository(
      ArticleCategoryTranslation,
    );
    let slug = this.slugService.slug(name);
    const numSlugs = await articleCateTranslationRepo.count({
      where: {
        slug: Like('%' + slug + '%'),
      },
      withDeleted: true,
    });

    if (numSlugs) {
      slug = slug + `-${numSlugs + 1}`;
    }

    event.entity.slug = slug;
  }
}
