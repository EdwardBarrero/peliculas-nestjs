import { Module } from '@nestjs/common';
import { GenrsService } from './genrs.service';
import { GenrsController } from './genrs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genr } from './models/genrs.models';

@Module({
  imports: [SequelizeModule.forFeature([Genr])],
  controllers: [GenrsController],
  providers: [GenrsService],
})
export class GenrsModule {}
