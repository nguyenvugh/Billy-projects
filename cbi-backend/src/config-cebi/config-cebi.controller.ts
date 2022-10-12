import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginateDto } from 'src/common/dto/request/paginate.dto';
import { ConfigCebiService } from './config-cebi.service';
import { ConfigCebiKey } from 'src/config-cebi/enums/configCebi.enum';
import { UpdateConfigDto } from './dtos/request/update-config.dto';
import { FooterConfigDto } from './dtos/response/footer-config.dto';
import { PageConfigDto } from './dtos/response/page-config.dto';
import { ConfigCebiDto } from './dtos/response/config-cebi.dto';

// We need to authorize config controller
@ApiTags('Config cebi')
@ApiExtraModels(FooterConfigDto, PageConfigDto)
@Controller('config-cebi')
export class ConfigCebiController {
  constructor(private configCebiService: ConfigCebiService) {}

  @Get()
  @ApiResponse({ type: ConfigCebiDto })
  getAllConfig(@Query() query: PaginateDto) {
    return this.configCebiService.getAllConfig(query);
  }

  @Get(':key')
  @ApiParam({ name: 'key', enum: ConfigCebiKey })
  @ApiResponse({
    schema: {
      oneOf: [
        {
          $ref: getSchemaPath(FooterConfigDto),
        },
        {
          $ref: getSchemaPath(PageConfigDto),
        },
      ],
    },
  })
  getConfigByKey(@Param('key') key: ConfigCebiKey) {
    return this.configCebiService.getConfigByKey(key);
  }

  @Patch()
  @ApiResponse({
    type: UpdateConfigDto,
  })
  updateFormConfigByKey(@Body() body: UpdateConfigDto) {
    console.log({ body });
    return this.configCebiService.updateConfig(body);
  }
}
