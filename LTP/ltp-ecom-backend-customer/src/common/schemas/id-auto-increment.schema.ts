import { EntitySchemaColumnOptions } from 'typeorm';

export const IdAutoIncrement = {
  id: {
    type: Number,
    primary: true,
    generated: true,
  } as EntitySchemaColumnOptions,
};
