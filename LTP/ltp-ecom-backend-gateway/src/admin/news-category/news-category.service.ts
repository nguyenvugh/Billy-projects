import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class NewsCategoryService {
  constructor(private adminMicroservice: MicroserviceService) {}

  async initSlugData(authorization) {
    return await this.adminMicroservice.call(
      'admin-news-category-init-slug-data',
      {
        authorization,
      },
    );
  }

  findAll(authorization) {
    return this.adminMicroservice.call('admin-news-category-find-all', {
      authorization,
    });
  }

  create(authorization, createBody) {
    return this.adminMicroservice.call('admin-news-category-create', {
      body: createBody,
      authorization,
    });
  }

  update(authorization, id, updateBody) {
    return this.adminMicroservice.call('admin-news-category-update', {
      authorization,
      body: {
        id: id,
        data: updateBody,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-news-category-delete', {
      body: {
        ids,
      },
      authorization,
    });
  }
}
