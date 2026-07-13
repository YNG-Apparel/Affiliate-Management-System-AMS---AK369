import { SetMetadata } from '@nestjs/common';
import { RoleIdValue } from '../roles.constant';

export const ROLES_KEY = 'roles';

/**
 * Restricts a route to the given role IDs. Use together with RolesGuard.
 * Usage: `@Roles(RoleId.MANAGER)`.
 */
export const Roles = (...roles: RoleIdValue[]): MethodDecorator & ClassDecorator =>
  SetMetadata(ROLES_KEY, roles);
