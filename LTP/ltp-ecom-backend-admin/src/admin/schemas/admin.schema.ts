import {
  AdminSexConst,
  AdminStatusConst,
} from 'src/common/constants/admin.constant';
import { Group } from 'src/group/schemas/group.schema';
import { MediaUpload } from 'src/media-upload/schemas/media-upload.schema';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { TimestampWithSoftDelete } from '../../common/schemas/timestamp.schema';
import { InventoryInputHistory } from '../../inventory-input-history/schema/inventory-input-history.schema';

@Entity({
  name: 'admin',
})
export class Admin extends TimestampWithSoftDelete {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  @Index()
  username: string;

  @Column({ length: 255, type: 'varchar', select: false })
  password: string;

  @Column({ length: 255, type: 'varchar' })
  fullname: string;

  @Column({
    type: 'tinyint',
    default: AdminSexConst.MALE,
  })
  sex: number;

  @Column({
    type: 'tinyint',
    default: AdminStatusConst.ACTIVATED,
  })
  status: number;

  @Column({ length: 20, type: 'varchar' })
  national_id: string;

  @Column({ length: 20, type: 'varchar' })
  phone_number: string;

  @Column({ length: 255, type: 'varchar' })
  address: string;

  @Column({ type: 'tinyint' })
  group: number;

  @ManyToOne(() => Group)
  @JoinColumn({
    name: 'group',
  })
  group_obj: Group;

  @Column({ nullable: true, type: 'int' })
  @Index()
  avatar: number;

  @OneToOne(() => MediaUpload)
  @JoinColumn({
    name: 'avatar',
  })
  avatar_obj: MediaUpload;

  @OneToMany(
    () => InventoryInputHistory,
    (inventoryInputHistory) => inventoryInputHistory.created_by,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  inventory_input_histories_create: InventoryInputHistory[];

  @OneToMany(
    () => InventoryInputHistory,
    (inventoryInputHistory) => inventoryInputHistory.updated_by,
    {
      onUpdate: 'RESTRICT',
      onDelete: 'RESTRICT',
    },
  )
  inventory_input_histories_update: InventoryInputHistory[];
}
