import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { connectDB } from './config/db';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const mongoUri = this.configService.get<string>('MONGO_URI');
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await connectDB(mongoUri);
  }
  
}