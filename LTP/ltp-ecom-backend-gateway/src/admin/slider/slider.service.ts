import { Injectable } from '@nestjs/common';
import { MicroserviceService } from '../microservice/microservice.service';
import { FindSliderByCriteriaDto } from './dto/find-by-criterial.dto';

@Injectable()
export class SliderService {
  constructor(private adminMicroservice: MicroserviceService) { }

  findByCriteria(authorization, body: FindSliderByCriteriaDto) {
    return this.adminMicroservice.call('admin-slider-find-by-criteria', {
      authorization,
      body,
    });
  }

  create(authorization, body) {
    return this.adminMicroservice.call('admin-slider-create', {
      authorization,
      body,
    });
  }

  findOne(authorization, id: number) {
    return this.adminMicroservice.call('admin-slider-find-one', {
      authorization,
      body: {
        id,
      },
    });
  }

  update(authorization, id, body) {
    return this.adminMicroservice.call('admin-slider-update-one', {
      authorization,
      body: {
        id,
        ...body,
      },
    });
  }

  delete(authorization, ids: [number]) {
    return this.adminMicroservice.call('admin-slider-delete', {
      authorization,
      body: {
        ids,
      },
    });
  }
}
