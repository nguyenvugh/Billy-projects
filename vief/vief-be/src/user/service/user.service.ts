import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async findOneOrError(firIdToken: string) {
    return this.userRepository.findOne({ firId: firIdToken });
  }

  create() {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
