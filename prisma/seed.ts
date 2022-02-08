import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.create({
    data:
    {
      event: "Opening Balance",
      date: "2022-01-01",
      amount: 626196.42,
      type: "open",
      description: "Opening Balance for 2022",
      signedOff: "Shashank Dhavala",
      society: "Main",
      level: 5,
      LastStatus: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);