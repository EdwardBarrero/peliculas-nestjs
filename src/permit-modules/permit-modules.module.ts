import { Module } from '@nestjs/common';
import { PermitModulesService } from './permit-modules.service';
import { PermitModulesController } from './permit-modules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermitModule } from './entities/permit-modules.entity';

@Module({
  imports: [SequelizeModule.forFeature([PermitModule])],
  controllers: [PermitModulesController],
  providers: [PermitModulesService],
})
export class PermitModulesModule {}
