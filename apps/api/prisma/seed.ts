import { PrismaClient, UserStatus } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

const roles = [
  { id: 1, name: 'Super Admin', description: 'Full system access' },
  { id: 2, name: 'Manager', description: 'Manages affiliates, content, and payroll' },
  { id: 3, name: 'Finance', description: 'Reviews commissions and approves payroll' },
  { id: 4, name: 'Marketing', description: 'Uploads and distributes content' },
  { id: 5, name: 'Affiliate', description: 'External affiliate member' },
];

async function main(): Promise<void> {
  // Seed roles (idempotent)
  for (const role of roles) {
    await prisma.role.upsert({
      where: { id: role.id },
      update: { name: role.name, description: role.description },
      create: role,
    });
  }
  console.log(`Seeded ${roles.length} roles`);

  // Seed a default Super Admin so you can log in immediately
  const adminEmail = 'admin@ams.local';
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    console.log(`Admin user already exists (${adminEmail}), skipping`);
  } else {
    const passwordHash = await argon2.hash('Admin123!');
    await prisma.user.create({
      data: {
        fullName: 'Super Admin',
        email: adminEmail,
        passwordHash,
        status: UserStatus.ACTIVE,
        emailVerifiedAt: new Date(),
        role: { connect: { id: 1 } },
      },
    });
    console.log(`Seeded admin user: ${adminEmail} / Admin123!`);
  }

  console.log('Seed complete');
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
