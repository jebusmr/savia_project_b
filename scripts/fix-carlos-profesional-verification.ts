import { prisma } from "@/lib/prisma";

async function main() {
  const email = "profesional@savia.test";

  const professional = await prisma.specialist.findFirst({
    where: {
      email,
    },
  });

  if (!professional) {
    throw new Error(
      `No se encontró el profesional con correo ${email}.`
    );
  }

  const existingVerification =
    await prisma.specialistverification.findUnique({
      where: {
        specialistId: professional.id,
      },
    });

  if (existingVerification) {
    console.log(
      "El profesional ya tiene un registro de verificación."
    );
    console.log(existingVerification);
    return;
  }

  const verification =
    await prisma.specialistverification.create({
      data: {
        specialistId: professional.id,
        verificationStatus: "PENDING",
        identityVerified: false,
        licenseVerified: false,
        specialtyVerified: false,
        documentsVerified: false,
      },
    });

  await prisma.specialist.update({
    where: {
      id: professional.id,
    },
    data: {
      status: "PENDING",
    },
  });

  console.log(
    "Registro de verificación creado correctamente."
  );

  console.log(verification);
}

main()
  .catch((error) => {
    console.error(
      "Error al corregir la verificación:",
      error
    );
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });