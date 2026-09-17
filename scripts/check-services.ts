import { prisma } from "../lib/prisma";

async function main() {
  console.log("\n=== SERVICIOS ===\n");

  const services = await prisma.service.findMany({
    orderBy: {
      name: "asc",
    },
  });

  console.dir(services, {
    depth: null,
  });

  console.log("\n=== RELACIONES SPECIALIST-SERVICE ===\n");

  const specialistServices =
    await prisma.specialistservice.findMany({
      include: {
        specialist: true,
        service: true,
      },
    });

  console.dir(specialistServices, {
    depth: null,
  });
}

main()
  .catch((error) => {
    console.error("\nERROR:\n", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });