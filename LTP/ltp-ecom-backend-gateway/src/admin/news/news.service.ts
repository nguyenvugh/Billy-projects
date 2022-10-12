import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindNewsByCriteriaDto } from './dto/find-by-criteria.dto';

@Injectable()
export class NewsService {
  constructor(private adminMicroservice: MicroserviceService) {}

  async initSlugData(authorization) {
    return await this.adminMicroservice.call('admin-news-init-slug-data', {
      authorization,
    });
  }

  findByCriteria(authorization, request: FindNewsByCriteriaDto) {
    return this.adminMicroservice.call('admin-news-find-by-criteria', {
      authorization,
      body: request,
    });
  }
  create(authorization, body) {
    return this.adminMicroservice.call('admin-news-create', {
      authorization,
      body,
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-news-update', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-news-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
