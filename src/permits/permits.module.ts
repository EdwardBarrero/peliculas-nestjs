import { Module } from '@nestjs/common';
import { PermitsService } from './permits.service';
import { PermitsController } from './permits.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permit } from './entities/permits.entity';

@Module({
  imports: [SequelizeModule.forFeature([Permit])],
  controllers: [PermitsController],
  providers: [PermitsService],
})
export class PermitsModule {}
