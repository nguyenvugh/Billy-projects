import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindAllPageDto } from './dto/find-all.dto';

@Injectable()
export class PagesService {
  constructor(private adminMicroservice: MicroserviceService) {}

  findAll(authorization, body: FindAllPageDto) {
    return this.adminMicroservice.call('admin-pages-find-all', {
      authorization,
      body,
    });
  }

  initData(authorization) {
    return this.adminMicroservice.call('admin-pages-init-data', {
      authorization,
    });
  }

  initSlugData(authorization) {
    return this.adminMicroservice.call('admin-pages-init-slug-data', {
      authorization,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-pages-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-pages-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  findBySlug(authorization, slug: string) {
    return this.adminMicroservice.call('admin-pages-find-by-slug', {
      authorization,
      body: {
        slug,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-pages-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-pages-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }

  getCompanyInformation(authorization) {
    return this.adminMicroservice.call('admin-get-company-information', {
      authorization,
    });
  }

  updateCompanyInformation(authorization, body) {
    return this.adminMicroservice.call('admin-update-company-information', {
      authorization,
      body,
    });
  }
}
