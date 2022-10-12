import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern('admin-users-find-one')
  async findOne({ user_id }) {
    const result = await this.usersService.findOne(user_id);
    return {
      code: result ? 200 : 404,
      data: result || 'User not found',
    };
  }

  @MessagePattern('admin-users-update-one')
  async updateOne({
    user_id,
    body,
  }: {
    user_id: number;
    body: UpdateUserProfileDto;
  }) {
    const result = await this.usersService.update(user_id, body);
    return result;
  }
}
