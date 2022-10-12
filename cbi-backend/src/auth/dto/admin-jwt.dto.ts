import { Exclude, Expose } from 'class-transformer';

// Maybe we need role later.
export class AdminJwtDto {
  @Expose()
  id: string;

  @Expose()
  username: string;
}
