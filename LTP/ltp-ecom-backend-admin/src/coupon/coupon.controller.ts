import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create.dto';
import { FindCouponByCriteriaDto } from './dto/find-by-criteria.dto';
import { UpdateCouponDto } from './dto/update.dto';

@Controller('coupon')
@UseGuards(AuthGuard, PermissionsGuard)
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @MessagePattern('admin-coupon-find-by-criteria')
  @Permissions('coupon')
  async findByCriteria({ body }: { body: FindCouponByCriteriaDto }) {
    return await this.couponService.findByCriteria(body);
  }

  @MessagePattern('admin-coupon-create')
  @Permissions('coupon')
  async create({ body }: { body: CreateCouponDto }) {
    return await this.couponService.create(body);
  }

  @MessagePattern('admin-coupon-find-one')
  @Permissions('coupon')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.couponService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Coupon not found',
    };
  }

  @MessagePattern('admin-coupon-update-one')
  @Permissions('coupon')
  async updateOne({ body }: { body: UpdateCouponDto }) {
    const result = await this.couponService.update(body);
    return result;
  }

  @MessagePattern('admin-coupon-delete')
  @Permissions('coupon')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.couponService.delete(ids);
    return result;
  }

  @MessagePattern('admin-coupon-get-product-list')
  @Permissions('coupon')
  async getProductList() {
    const result = await this.couponService.getProductList();
    return result;
  }
}
