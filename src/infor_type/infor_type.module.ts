import { Module } from '@nestjs/common';
import { InforTypeService } from './infor_type.service';
import { InforTypeController } from './infor_type.controller';
import { DatabaseModule } from 'src/database/database.module';
import { inforProviders } from './info_type.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InforTypeController],
  providers: [InforTypeService,  ...inforProviders],
  exports: [InforTypeService],
})
export class InforTypeModule {}
