import { Reflector } from '@nestjs/core';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PERMIT_MODULES_KEYS, PERMIT_ACTIONS_KEYS } from './roles.decorator';
import { PermitModulesEnum, PermitActionsEnum } from './roles.interface';
import { UserHTTPHeader } from 'src/users/entities/user.entity';

@Injectable()
export class PermitModulesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredPermitModules =
      this.reflector.getAllAndOverride<PermitModulesEnum>(PERMIT_MODULES_KEYS, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredPermitModules) return true;

    const request = context.switchToHttp().getRequest();
    const user: UserHTTPHeader = request.user;

    request['permitModule'] = requiredPermitModules;

    if (!user?.permitModules) return false;

    return user.permitModules.some(
      (permitModule) => permitModule.name === requiredPermitModules,
    );
  }
}

interface ICustomRequest {
  user: UserHTTPHeader;
  permitModule: PermitModulesEnum[];
}
@Injectable()
export class PermitActionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermitActions =
      this.reflector.getAllAndOverride<PermitActionsEnum>(PERMIT_ACTIONS_KEYS, [
        context.getHandler(),
        context.getClass(),
      ]);

    if (!requiredPermitActions) return true;
    const { user, permitModule }: ICustomRequest = context
      .switchToHttp()
      .getRequest();

    if (!permitModule) return true;
    if (!user?.permitModules) return false;

    return user.permitModules.some((permitModule) =>
      permitModule.actions.includes(requiredPermitActions),
    );
  }
}
