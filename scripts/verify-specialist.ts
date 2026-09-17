import { prisma } from "../lib/prisma";

async function main() {
  const specialist =
    await prisma.specialist.findUnique({
      where: {
        email: "carlos.mendoza@savia.test",
      },
    });

  if (!specialist) {
    throw new Error(
      "No se encontró el especialista Carlos Mendoza."
    );
  }

  await prisma.specialistverification.update({
    where: {
      specialistId: specialist.id,
    },

    data: {
      verificationStatus: "VERIFIED",
      verifiedAt: new Date(),
      verifiedBy: "SAVIA",
    },
  });

  console.log(
    `✓ ${specialist.firstName} ${specialist.lastName} ahora está VERIFIED`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });