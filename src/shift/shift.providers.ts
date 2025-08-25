// src/users/users.providers.ts
import { Connection } from 'mongoose';
import { ShiftSchema } from './schemas/shift.schema';

export const shiftProviders = [
  {
    provide: 'SHIFT_MODEL',
    useFactory: (connection: Connection) => connection.model('Shift', ShiftSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
