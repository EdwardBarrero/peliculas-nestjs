import { PermitModulesEnum, PermitActionsEnum } from './roles.interface';
import { SetMetadata } from '@nestjs/common';

export const PERMIT_MODULES_KEYS = 'permit_modules';
export const PERMIT_ACTIONS_KEYS = 'permit_actions';

export const PermitModules = (permitModule: PermitModulesEnum) =>
  SetMetadata(PERMIT_MODULES_KEYS, permitModule);

export const PermitActions = (permitActions: PermitActionsEnum) =>
  SetMetadata(PERMIT_ACTIONS_KEYS, permitActions);
