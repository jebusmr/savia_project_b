import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

function createSlug(name: string) {
  const normalized = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "establecimiento";
}

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Debes iniciar sesión." },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "No tienes autorización." },
        { status: 403 }
      );
    }

    const establishments = await prisma.establishment.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: establishments,
    });
  } catch (error) {
    console.error("Error obteniendo establecimientos:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener los establecimientos.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Debes iniciar sesión." },
        { status: 401 }
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "No tienes autorización." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const project =
      typeof body.project === "string" ? body.project : "";
    const category =
      typeof body.category === "string" ? body.category : "";
    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const city =
      typeof body.city === "string" ? body.city.trim() : "";

    if (
      !["SAVIA", "HUELLITAS"].includes(project) ||
      !category ||
      !name ||
      !city
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Catálogo, categoría, nombre y ciudad son obligatorios.",
        },
        { status: 400 }
      );
    }

    const baseSlug = createSlug(name);
    let slug = baseSlug;
    let suffix = 1;

    while (await prisma.establishment.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    const establishment = await prisma.establishment.create({
      data: {
        project,
        category,
        name,
        slug,
        city,
        description:
          typeof body.description === "string"
            ? body.description.trim() || null
            : null,
        address:
          typeof body.address === "string"
            ? body.address.trim() || null
            : null,
        municipality:
          typeof body.municipality === "string"
            ? body.municipality.trim() || null
            : null,
        phone:
          typeof body.phone === "string"
            ? body.phone.trim() || null
            : null,
        whatsapp:
          typeof body.whatsapp === "string"
            ? body.whatsapp.trim() || null
            : null,
        email:
          typeof body.email === "string"
            ? body.email.trim() || null
            : null,
        website:
          typeof body.website === "string"
            ? body.website.trim() || null
            : null,
        image:
          typeof body.image === "string"
            ? body.image.trim() || null
            : null,
        status: body.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT",
      },
    });

    return NextResponse.json(
      { success: true, data: establishment },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando establecimiento:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible crear el establecimiento.",
      },
      { status: 500 }
    );
  }
}
