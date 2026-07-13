/**
 * Fixed role IDs. These must match the seed data in prisma/seed.ts and
 * docs/database/04-roles.md.
 */
export const RoleId = {
  SUPER_ADMIN: 1,
  MANAGER: 2,
  FINANCE: 3,
  MARKETING: 4,
  AFFILIATE: 5,
} as const;

export type RoleIdValue = (typeof RoleId)[keyof typeof RoleId];
