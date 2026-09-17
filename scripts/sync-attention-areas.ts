import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../lib/generated/prisma/client";
import { attentionAreas } from "../data/attention-areas";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL no está definida.");
}

const url = new URL(databaseUrl);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace(/^\//, ""),
  connectionLimit: 5,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log(
    "🌿 Iniciando sincronización de áreas de atención...\n"
  );

  for (const area of attentionAreas) {
    const specialty = await prisma.specialty.findUnique({
      where: {
        slug: area.specialtySlug,
      },
    });

    if (!specialty) {
      console.warn(
        `⚠️ Especialidad no encontrada: ${area.specialtySlug}`
      );

      continue;
    }

    await prisma.attentionarea.upsert({
      where: {
        specialtyId_slug: {
          specialtyId: specialty.id,
          slug: area.slug,
        },
      },
      update: {
        name: area.name,
        description: area.description,
        order: area.order,
        status: "ACTIVE",
        updatedAt: new Date(),
      },
      create: {
        id: crypto.randomUUID(),
        specialtyId: specialty.id,
        name: area.name,
        slug: area.slug,
        description: area.description,
        order: area.order,
        status: "ACTIVE",
        updatedAt: new Date(),
      },
    });

    console.log(
      `✓ ${specialty.name} → ${area.name}`
    );
  }

  console.log(
    "\n🌿 Catálogo de áreas de atención sincronizado correctamente."
  );
}

main()
  .catch((error) => {
    console.error(
      "❌ Error sincronizando áreas de atención:",
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });