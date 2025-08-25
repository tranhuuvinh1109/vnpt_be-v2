// src/users/users.providers.ts
import { Connection } from 'mongoose';
import { StationSchema } from './schemas/station.schema';

export const stationProviders = [
  {
    provide: 'STATION_MODEL',
    useFactory: (connection: Connection) => connection.model('Station', StationSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
