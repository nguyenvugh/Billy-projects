import configuration from '../configs/main';
import * as bcrypt from 'bcrypt';

export default class HashHelper {
  async hashPassword(password: string) {
    return bcrypt.hashSync(password, configuration().other.salt);
  }
}
