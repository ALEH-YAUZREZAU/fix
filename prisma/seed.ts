import { PrismaClient } from "@prisma/client";
import tags from "./json/tags.json";

const prisma = new PrismaClient();

async function main() {
  const tagsList: any = tags.data;
  // Seed data
  for (const tag of tagsList) {
    await prisma.tag.upsert({
      where: { name: tag.name },
      update: {},
      create: tag,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
