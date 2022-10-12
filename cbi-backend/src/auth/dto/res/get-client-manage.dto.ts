import { Exclude, Expose, Type } from 'class-transformer';
import { ClientDTO } from './client.dto';

@Exclude()
export class GetClientManageDTO {
  @Expose()
  @Type(() => ClientDTO)
  results: ClientDTO[];

  @Expose()
  total: number;

  @Expose()
  totalPage: number;

  constructor(partial: Partial<ClientDTO>) {
    Object.assign(this, partial);
  }
}
