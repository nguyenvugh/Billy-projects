import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import {
  ManualSerialize,
  Serialize,
} from 'src/common/interceptors/serialize.interceptor';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { CreateAdminDTO } from '../dto/req/create-admin.dto';
import { DeleteMultiAdmin } from '../dto/req/delete-multi-admin.dto';
import { UpdateAdminAccountDTO } from '../dto/req/update-admin-account.dto';
import { UpdateAdminDTO } from '../dto/req/update-admin-profile.dto';
import { AdminPagingDTO } from '../dto/res/admin-paging.dto';
import { AdminDTO } from '../dto/res/admin.dto';
import { User as UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../service/user.service';

@Controller('admin-manage')
@ApiTags('Admin-manage')
export class AdminManageController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(AdminPagingDTO)
  async getAdminAccount(@Query() query: PaginateDto) {
    return this.userService.getAdminAccount(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(AdminDTO)
  async getAdminAccountById(@Param('id') id: string) {
    return this.userService.findProfile(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Serialize(AdminDTO)
  @ApiBody({ type: CreateAdminDTO })
  async registerAdmin(@Body() body: CreateAdminDTO) {
    return this.userService.registerAdmin(body);
  }

  // @Post('user-type')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @ApiBody({ type: CreateUserTypeDTO })
  // async createUserType(@Body() body: CreateUserTypeDTO) {
  //   return this.userService.createUserType(body);
  // }

  @Patch('/profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Serialize(AdminDTO)
  @ApiBody({ type: UpdateAdminDTO })
  async update(
    @User() user: UserEntity,
    @Body() updateAdminDto: UpdateAdminDTO,
  ) {
    return await this.userService.updateAdminProfile(user, updateAdminDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Serialize(AdminDTO)
  @ApiBody({ type: UpdateAdminAccountDTO })
  async updateById(
    @Param('id') id: string,
    @Body() updateAdminAccountDto: UpdateAdminAccountDTO,
  ) {
    return await this.userService.updateAdminAccountById(
      id,
      updateAdminAccountDto,
    );
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: DeleteMultiAdmin })
  async removeMulti(@Body() body: DeleteMultiAdmin) {
    return this.userService.removeMulti(body);
  }
}
