import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.dayPart.upsert({
    where: { alias: 'MORNING' },
    update: {},
    create: {
      alias: 'MORNING',
      order: 0,
    },
  });
  await prisma.dayPart.upsert({
    where: { alias: 'EVENING' },
    update: {},
    create: {
      alias: 'EVENING',
      order: 2,
    },
  });
  await prisma.dayPart.upsert({
    where: { alias: 'AFTERNOON' },
    update: {},
    create: {
      alias: 'AFTERNOON',
      order: 1,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
