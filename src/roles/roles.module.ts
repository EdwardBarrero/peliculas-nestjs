import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role, RolesPermitModules } from './entities/roles.entity';
import { PermitActionsGuard, PermitModulesGuard } from './roles.guard';

@Module({
  imports: [SequelizeModule.forFeature([Role, RolesPermitModules])],
  controllers: [RolesController],
  providers: [RolesService, PermitActionsGuard, PermitModulesGuard],
  exports: [RolesService],
})
export class RolesModule {}
