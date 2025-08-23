import mongoose, { Connection } from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (configService: ConfigService): Promise<Connection> => {
      const uri = configService.get<string>('MONGO_URI');
      if (!uri) throw new Error('MONGO_URI is not defined');
      return mongoose.createConnection(uri); // Tạo connection riêng
    },
    inject: [ConfigService],
  },
];
