import { Module } from '@nestjs/common';
import { GenrsService } from './genrs.service';
import { GenrsController } from './genrs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genr } from './models/genrs.models';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [SequelizeModule.forFeature([Genr]), RolesModule],
  controllers: [GenrsController],
  providers: [GenrsService],
})
export class GenrsModule {}
