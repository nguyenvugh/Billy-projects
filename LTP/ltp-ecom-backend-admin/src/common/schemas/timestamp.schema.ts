import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SoftDelete } from './soft-delete.schema';

export class TimestampWithoutSoftDelete {
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;
}

export class TimestampWithSoftDelete extends SoftDelete {
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;
}

export class TimestampOnlyCreate {
  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;
}
