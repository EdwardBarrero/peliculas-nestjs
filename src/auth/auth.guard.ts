import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from '../config/jwtConfig';
import { Request } from 'express';
import { RolesService } from 'src/roles/roles.service';
import { RoleAttributes } from 'src/roles/entities/roles.entity';
import { IPermitModule } from 'src/roles/roles.interface';
import { UserHTTPHeader, UserJwtPayload } from 'src/users/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private rolesService: RolesService,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload: UserJwtPayload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      let role: RoleAttributes | null = null;

      if (payload.userInfo.roleId) {
        role = await this.rolesService.findOne(payload.userInfo.roleId);
      }

      if (!role || !role.permitModules) {
        request['user'] = payload;
        return true;
      }

      const permitModules: IPermitModule[] = role.permitModules.map(
        (permitModule) => {
          let actions = permitModule.permits?.map((permit) => permit.name);
          if (!actions) actions = [];
          return { name: permitModule.name, actions };
        },
      );

      const user: UserHTTPHeader = {
        ...payload,
        permitModules: permitModules,
      };

      request['user'] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
