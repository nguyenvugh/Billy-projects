import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtCoreService {
  constructor(private readonly jwtService: JwtService) { }

  async sign(payload, options = {}) {
    return await this.jwtService.sign(payload, options);
  }

  async verify(bearerToken, options = {}) {
    return await this.jwtService.verify(bearerToken, options);
  }
}
