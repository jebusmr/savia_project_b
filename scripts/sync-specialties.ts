/**
 * SAVIA
 * Sincronización del catálogo maestro de especialidades.
 *
 * Este script toma el catálogo definido en:
 *
 * data/specialties.ts
 *
 * y lo sincroniza con la tabla `specialty` de MariaDB.
 *
 * Utiliza upsert para evitar duplicados.
 *
 * Puede ejecutarse varias veces de forma segura.
 */

import { prisma } from "../lib/prisma";
import { specialtiesCatalog } from "../data/specialties";

async function main() {
  console.log("🌿 Iniciando sincronización de especialidades...\n");

  for (const specialty of specialtiesCatalog) {
    await prisma.specialty.upsert({
      where: {
        slug: specialty.slug,
      },

      update: {
        name: specialty.name,
        shortName: specialty.shortName,
        description: specialty.description,
        icon: specialty.icon,
        color: specialty.color,
        order: specialty.order,
        status: "ACTIVE",
        updatedAt: new Date(),
      },

      create: {
        id: crypto.randomUUID(),
        name: specialty.name,
        slug: specialty.slug,
        shortName: specialty.shortName,
        description: specialty.description,
        icon: specialty.icon,
        color: specialty.color,
        order: specialty.order,
        status: "ACTIVE",
        updatedAt: new Date(),
      },
    });

    console.log(`✓ ${specialty.name}`);
  }

  console.log("\n🌿 Catálogo sincronizado correctamente.");
}

main()
  .catch((error) => {
    console.error(
      "\n❌ Error sincronizando especialidades:",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });