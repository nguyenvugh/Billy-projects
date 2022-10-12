import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { CurrentLang } from '../../common/decorators/current-lang.decorator';
import { AuthReq } from '../../common/decorators/auth-req.decorator';
import { JwtAuthenticateIsOptional } from '../../common/decorators/jwt-authenticate-is-optional.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CustomerFindAllProductsDto } from './dto/find-all-products.dto';
import { FindRelatedProductsDto } from './dto/find-related-products.dto';
import { FindOneProductDto } from './dto/find-one-product.dto';
import { CustomerFindProductReviewsDto } from './dto/find-product-reviews.dto';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { ListProductsEntity } from './entities/list.entity';
import { ListProductReviewsEntity } from './entities/list-product-reviews.entity';
import { ProductEntity } from './entities/product.entity';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/product`)
@ApiTags('Customer Product')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiBearerAuth()
  @JwtAuthenticateIsOptional()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get list products on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAll(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Query() reqData: CustomerFindAllProductsDto,
  ) {
    return new ListProductsEntity(
      await this.productService.findAll(
        curLang,
        reqData,
        authReq ? authReq['id'] : 0,
      ),
    );
  }

  @Get('/related')
  @ApiOperation({ summary: 'Get list related products on web customer' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findRelated(
    @CurrentLang() curLang,
    @Query() reqData: FindRelatedProductsDto,
  ) {
    return new ListProductsEntity(
      await this.productService.findRelated(curLang, reqData),
    );
  }

  @Get('find-slug-other-lang')
  @ApiOperation({ summary: 'Get product slug in other lang' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findSlugOtherLang(
    @CurrentLang() curLang,
    @Query() reqData: FindSLugOtherLangDto,
  ) {
    return await this.productService.findSlugOtherLang(curLang, reqData);
  }

  @Get('slug/:slug')
  @ApiBearerAuth()
  @JwtAuthenticateIsOptional()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get detail product by slug on web customer' })
  async findOneBySlug(
    @CurrentLang() curLang,
    @Param('slug') slug: string,
    @AuthReq() authReq: any,
  ) {
    return new ProductEntity(
      await this.productService.findOneBySlug(
        slug,
        curLang,
        authReq ? authReq['id'] : 0,
      ),
    );
  }

  @Get('slug/:slug/review')
  @ApiBearerAuth()
  @JwtAuthenticateIsOptional()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get list product reviews by slug on web customer' })
  async findReviewsBySlug(
    @CurrentLang() curLang,
    @Param('slug') slug: string,
    @Query() reqData: CustomerFindProductReviewsDto,
  ) {
    return new ProductEntity(
      await this.productService.findReviewsBySlug(slug, curLang, reqData),
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @JwtAuthenticateIsOptional()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get detail product on web customer' })
  async findOne(
    @CurrentLang() curLang,
    @Param('id') id: number,
    @AuthReq() authReq: any,
    @Query() reqData: FindOneProductDto,
  ) {
    return new ProductEntity(
      await this.productService.findOne(
        id,
        curLang,
        authReq ? authReq['id'] : 0,
        reqData,
      ),
    );
  }

  @Get(':id/review')
  @ApiOperation({ summary: 'Get list product reviews on web customer' })
  async findReviews(
    @Param('id') id: number,
    @Query() reqData: CustomerFindProductReviewsDto,
  ) {
    return new ListProductReviewsEntity(
      await this.productService.findReviews(id, reqData),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
