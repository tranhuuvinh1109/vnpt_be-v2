import { Module } from '@nestjs/common';
import { StationService } from './station.service';
import { StationController } from './station.controller';
import { DatabaseModule } from 'src/database/database.module';
import { stationProviders } from './station.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [StationController],
  providers: [StationService, ...stationProviders],
})
export class StationModule {}
