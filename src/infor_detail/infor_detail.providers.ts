// src/users/users.providers.ts
import { Connection } from 'mongoose';
import { InforDetailSchema } from './schemas/infor_detail.schema';

export const inforDetailProviders = [
  {
    provide: 'INFOR_DETAIL_MODEL',
    useFactory: (connection: Connection) => connection.model('InforDetail', InforDetailSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
