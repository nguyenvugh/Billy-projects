import { Expose } from 'class-transformer';

export class ContactDTO {
  @Expose()
  id: string;

  @Expose()
  createdAt: Date;

  @Expose()
  name: string;

  @Expose()
  phone: string;

  @Expose()
  email: string;

  @Expose()
  content: string;

  constructor(partial: Partial<ContactDTO>) {
    Object.assign(this, partial);
  }
}
