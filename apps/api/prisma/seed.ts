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

// Tier IDs and multipliers follow docs/database/07-tiers.md
const tiers = [
  { id: 1, name: 'Starter', level: 1, multiplier: 1.0, description: 'Default tier for new affiliates' },
  { id: 2, name: 'Advanced', level: 2, multiplier: 1.2, description: 'Mid performance tier' },
  { id: 3, name: 'Elite', level: 3, multiplier: 1.5, description: 'Top performance tier' },
];

const cities = [
  { code: 'BTM', name: 'Batam', province: 'Kepulauan Riau' },
  { code: 'JKT', name: 'Jakarta', province: 'DKI Jakarta' },
  { code: 'SBY', name: 'Surabaya', province: 'Jawa Timur' },
  { code: 'BDG', name: 'Bandung', province: 'Jawa Barat' },
  { code: 'MDN', name: 'Medan', province: 'Sumatera Utara' },
  { code: 'PGK', name: 'Pangkal Pinang', province: 'Bangka Belitung' },
  { code: 'PLM', name: 'Palembang', province: 'Sumatera Selatan' },
  { code: 'SMG', name: 'Semarang', province: 'Jawa Tengah' },
  { code: 'DPS', name: 'Denpasar', province: 'Bali' },
  { code: 'YOG', name: 'Yogyakarta', province: 'DI Yogyakarta' },
];

const banks = [
  { code: 'BCA', name: 'Bank Central Asia' },
  { code: 'BRI', name: 'Bank Rakyat Indonesia' },
  { code: 'BNI', name: 'Bank Negara Indonesia' },
  { code: 'MANDIRI', name: 'Bank Mandiri' },
  { code: 'SEABANK', name: 'SeaBank Indonesia' },
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

  // Seed tiers (idempotent)
  for (const tier of tiers) {
    await prisma.tier.upsert({
      where: { id: tier.id },
      update: { name: tier.name, level: tier.level, multiplier: tier.multiplier, description: tier.description },
      create: tier,
    });
  }
  console.log(`Seeded ${tiers.length} tiers`);

  // Seed cities (idempotent by unique code)
  for (const city of cities) {
    await prisma.city.upsert({
      where: { code: city.code },
      update: { name: city.name, province: city.province },
      create: city,
    });
  }
  console.log(`Seeded ${cities.length} cities`);

  // Seed banks (idempotent by unique code)
  for (const bank of banks) {
    await prisma.bank.upsert({
      where: { code: bank.code },
      update: { name: bank.name },
      create: bank,
    });
  }
  console.log(`Seeded ${banks.length} banks`);

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
