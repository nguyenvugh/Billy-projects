export class CreateUserTypeDTO {
  key: string;

  name: string;

  description: string;

  constructor(partial: Partial<CreateUserTypeDTO>) {
    Object.assign(this, partial);
  }
}
