import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { Model } from 'mongoose';
import { InforType, InforTypeDocument } from './schemas/infor_type.schema';
import { CreateInforTypeDto } from './dto/create-infor_type.dto';
import { UpdateInforTypeDto } from './dto/update-infor_type.dto';
import { formatError } from '../utils';

@Injectable()
export class InforTypeService {
  constructor(@Inject('INFOR_TYPE_MODEL') private readonly inforTypeModel: Model<InforTypeDocument>) {}

  async create(dto: CreateInforTypeDto): Promise<InforType> {
    const created = new this.inforTypeModel(dto);
    return created.save();
  }

  async findAll(): Promise<InforType[]> {
    return this.inforTypeModel.find().exec();
  }

  async findOneByTypeName(type_name: string) {
    const found = await this.inforTypeModel.findOne({ type_name }).exec();

    if (!found) return formatError(`InforType with type_name "${type_name}" not found`)
    return found;
  }

  async update(id: string, dto: UpdateInforTypeDto) {
    const updated = await this.inforTypeModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) return formatError(`InforType with ID ${id} not found`)
    return updated;
  }

  async remove(id: string){
    const result = await this.inforTypeModel.findByIdAndDelete(id).exec();
    if (!result) return formatError(`InforType with ID ${id} not found`)
  }
}
