import { PrismaClient } from "../../generated/prisma";
import itemsSeed from "./items_seed";

const prisma = new PrismaClient();

async function main() {
  const createdItems = await prisma.item.createMany({
    data: itemsSeed,
  });
  console.log(`Created items with total: ${createdItems.count}`);
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
