import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.assignment.deleteMany({
    where: {
      // Prisma tidak tahu enum MATHEMATIC, jadi kita pakai raw filter
      subject: 'MATEMATHIC',
    },
  });

  console.log(`Deleted ${deleted.count} assignment(s) with invalid subject.`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
