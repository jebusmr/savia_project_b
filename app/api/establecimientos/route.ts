
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const project = searchParams.get("project");
    const category = searchParams.get("category");

    if (project !== "SAVIA" && project !== "HUELLITAS") {
      return NextResponse.json(
        { success: false, error: "Catálogo no válido." },
        { status: 400 }
      );
    }

    const establishments = await prisma.establishment.findMany({
      where: {
        project,
        status: "PUBLISHED",
        ...(category ? { category } : {}),
      },
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        category: true,
        description: true,
        phone: true,
        whatsapp: true,
        email: true,
        website: true,
        image: true,
        address: true,
        city: true,
        municipality: true,
        state: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: establishments,
    });
  } catch (error) {
    console.error("Error consultando establecimientos públicos:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible consultar los establecimientos.",
      },
      { status: 500 }
    );
  }
}
