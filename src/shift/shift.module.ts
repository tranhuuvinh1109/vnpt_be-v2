import { Module } from '@nestjs/common';
import { ShiftService } from './shift.service';
import { ShiftController } from './shift.controller';
import { InforDetailModule } from 'src/infor_detail/infor_detail.module';
import { shiftProviders } from './shift.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    InforDetailModule,
  ],
  controllers: [ShiftController],
  providers: [ShiftService, ...shiftProviders],
})
export class ShiftModule {}
