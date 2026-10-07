import { prisma } from "@/lib/prisma";

async function main() {
  const specialist =
    await prisma.specialist.findUnique({
      where: {
        email: "carlos.mendoza@savia.test",
      },
      include: {
        specialistverification: true,
      },
    });

  if (!specialist) {
    throw new Error(
      "No se encontró al profesional Carlos Mendoza."
    );
  }

  if (!specialist.specialistverification) {
    throw new Error(
      "Carlos Mendoza no tiene registro de verificación."
    );
  }

  const verification =
    await prisma.specialistverification.update({
      where: {
        specialistId: specialist.id,
      },
      data: {
        identityVerified: true,
        licenseVerified: true,
        specialtyVerified: true,
        documentsVerified: true,
        verificationStatus: "VERIFIED",
        verifiedAt:
          specialist.specialistverification.verifiedAt ??
          new Date(),
        verifiedBy:
          specialist.specialistverification.verifiedBy ??
          "SAVIA",
      },
    });

  await prisma.specialist.update({
    where: {
      id: specialist.id,
    },
    data: {
      status: "ACTIVE",
    },
  });

  console.log("");
  console.log(
    "=========================================="
  );
  console.log(
    "VERIFICACIÓN DE CARLOS CORREGIDA"
  );
  console.log(
    "=========================================="
  );
  console.log("");

  console.log(
    `Profesional: ${specialist.firstName} ${specialist.lastName}`
  );

  console.log(
    `Estado: ${verification.verificationStatus}`
  );

  console.log(
    `Identidad: ${verification.identityVerified}`
  );

  console.log(
    `Cédula: ${verification.licenseVerified}`
  );

  console.log(
    `Especialidad: ${verification.specialtyVerified}`
  );

  console.log(
    `Documentos: ${verification.documentsVerified}`
  );

  console.log("");
}

main()
  .catch((error) => {
    console.error(
      "Error corrigiendo verificación:",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });