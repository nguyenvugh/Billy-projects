import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { MicroserviceConsts } from '../constants/microservices';
import { CustomerStatusConst } from '../constants/customer.constant';
import { get } from '../helpers/util.helper';
import { MicroserviceService } from '../../customer/microservice/microservice.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private microserviceService: MicroserviceService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: any) {
    // Check if type is manager or client inside data token.
    const typeUser = get(
      payload,
      'type',
      MicroserviceConsts.TYPE_USERS.CUSTOMER,
    );
    const idUser = get(payload, 'sub', 0);
    if (!typeUser || !idUser) {
      return null;
    }

    let objAuth = {};
    if (typeUser === MicroserviceConsts.TYPE_USERS.CUSTOMER) {
      objAuth = await this.microserviceService.call(
        'customer-customer-find-one',
        idUser,
      );
      if (!objAuth) {
        return null;
      }
      if (CustomerStatusConst.ACTIVE != objAuth['status']) {
        return null;
      }
    } else {
    }

    return {
      ...objAuth,
      type: typeUser,
    };
  }
}
