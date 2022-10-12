import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { CompanyInformationTranslate } from './company-information-translate.schema';

@Entity({
  name: 'company_information',
})
export class CompanyInformation extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => CompanyInformationTranslate,
    (companyInformationTranslate) =>
      companyInformationTranslate.company_information_obj,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  translates: CompanyInformationTranslate[];
}
