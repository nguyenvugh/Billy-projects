import { UserType } from 'src/common/constants/global.constant';
import { toLimitOffset } from 'src/common/utils';
import { Brackets, EntityRepository, Repository } from 'typeorm';
import { GetClientManageParams } from '../dto/req/get-client-manage-params.dto';
import { User } from '../entities/user.entity';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUserClient({
    searchText,
    status,
    page,
    limit: take,
  }: GetClientManageParams) {
    const { limit: size, offset } = toLimitOffset(page, take);
    const queryBuilder = this.createQueryBuilder('user');
    queryBuilder.where('user.userTypeKey = :userTypeKey', {
      userTypeKey: UserType.CLIENT,
    });
    searchText &&
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where(
            'LOWER(user.fullName) LIKE :s OR LOWER(user.email) LIKE :s OR LOWER(user.phoneNumber) LIKE :s',
            { s: `%${searchText.toLowerCase()}%` },
          );
        }),
      );
    status &&
      queryBuilder
        .andWhere('user.status = :status', { status })
        .leftJoinAndSelect('user.avatar', 'avatar');

    queryBuilder
      .orderBy({
        'user.createdAt': 'DESC',
      })
      .skip(offset)
      .take(size);

    return await queryBuilder.getManyAndCount();
  }
}
