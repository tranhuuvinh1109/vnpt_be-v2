import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { StationModule } from './station/station.module';
import { InforTypeModule } from './infor_type/infor_type.module';
import { InforDetailModule } from './infor_detail/infor_detail.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule, InforTypeModule, StationModule, InforDetailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
}