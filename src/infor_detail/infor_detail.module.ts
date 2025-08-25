import { Module } from '@nestjs/common';
import { InforDetailService } from './infor_detail.service';
import { InforDetailController } from './infor_detail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { InforDetail, InforDetailSchema } from './schemas/infor_detail.schema';
import { InforTypeModule } from 'src/infor_type/infor_type.module';
import { inforDetailProviders } from './infor_detail.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    InforTypeModule,
  ],
  controllers: [InforDetailController],
  providers: [InforDetailService, ...inforDetailProviders],
  exports: [InforDetailService],
})
export class InforDetailModule {}
