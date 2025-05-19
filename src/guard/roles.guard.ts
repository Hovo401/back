import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { log } from 'console';
import { ROLES_KEY } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const payload = request?.payload;

    if (
      requiredRoles.find((val) => {
        return String(payload?.roles).toLowerCase() === val.toLowerCase();
      })
    ) {
      return true;
    }

    return false;
  }
}
