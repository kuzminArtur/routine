import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.dayPart.upsert({
    where: { alias: 'MORNING' },
    update: {},
    create: {
      alias: 'MORNING',
    },
  });
  await prisma.dayPart.upsert({
    where: { alias: 'EVENING' },
    update: {},
    create: {
      alias: 'EVENING',
    },
  });
  await prisma.dayPart.upsert({
    where: { alias: 'AFTERNOON' },
    update: {},
    create: {
      alias: 'AFTERNOON',
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
