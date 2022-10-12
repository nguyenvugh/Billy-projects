import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Index,
  JoinColumn,
} from 'typeorm';
import { CompanyInformation } from './company-information.schema';

@Entity({
  name: 'company_information_translates',
})
export class CompanyInformationTranslate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'company_information', type: 'int' })
  company_information: number;

  @ManyToOne(
    () => CompanyInformation,
    (companyInformation) => companyInformation.translates,
  )
  @Index()
  @JoinColumn([
    {
      name: 'company_information',
      referencedColumnName: 'id',
    },
  ])
  company_information_obj: CompanyInformation;

  @Column({ length: 10, type: 'varchar' })
  language_code: string;

  @Column({ length: 255, type: 'varchar' })
  language_field: string;

  @Column({ type: 'mediumtext' })
  language_value: string;
}
