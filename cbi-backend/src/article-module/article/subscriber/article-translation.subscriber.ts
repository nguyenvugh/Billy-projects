import { InjectConnection } from '@nestjs/typeorm';
import slugify from 'slugify';
import { SlugService } from '../../../utils-module/service/slug.service';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  Like,
  UpdateEvent,
} from 'typeorm';
import { ArticleTranslation } from '../entity/articleTranslation.entity';

@EventSubscriber()
export class ArticleTranslationSubscriber
  implements EntitySubscriberInterface<ArticleTranslation>
{
  constructor(
    @InjectConnection() readonly connection: Connection,
    private slugService: SlugService,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return ArticleTranslation;
  }

  /**
   * Called before insert.
   */
  async beforeInsert(event: InsertEvent<ArticleTranslation>) {
    const title = event.entity?.title;
    if (title) await this.slugArticleTranslate(event);
  }

  async beforeUpdate(event: UpdateEvent<ArticleTranslation>) {
    const title = event.entity?.title;
    if (title) await this.slugArticleTranslate(event);
  }

  private async slugArticleTranslate(
    event: InsertEvent<ArticleTranslation> | UpdateEvent<ArticleTranslation>,
  ) {
    const { title } = event.entity;
    const articleTranslationRepo =
      event.manager.getRepository(ArticleTranslation);
    let slug = this.slugService.slug(title);
    const numSlugs = await articleTranslationRepo.count({
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
