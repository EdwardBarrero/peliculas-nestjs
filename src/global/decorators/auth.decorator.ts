import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermitActions, PermitModules } from 'src/roles/roles.decorator';
import {
  PermitActionsEnum,
  PermitModulesEnum,
} from 'src/roles/roles.interface';
import { PermitActionsGuard, PermitModulesGuard } from 'src/roles/roles.guard';

export function ModuleProtected(module: PermitModulesEnum) {
  return applyDecorators(
    PermitModules(module),
    UseGuards(AuthGuard, PermitModulesGuard),
  );
}

export function EndpointProtected(action: PermitActionsEnum) {
  return applyDecorators(PermitActions(action), UseGuards(PermitActionsGuard));
}
