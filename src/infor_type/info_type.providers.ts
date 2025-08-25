// src/users/users.providers.ts
import { Connection } from 'mongoose';
import { InforTypeSchema } from './schemas/infor_type.schema';

export const inforProviders = [
  {
    provide: 'INFOR_TYPE_MODEL',
    useFactory: (connection: Connection) => connection.model('InforType', InforTypeSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
