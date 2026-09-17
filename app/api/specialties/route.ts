import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const specialties = await prisma.specialty.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: [
        {
          order: "asc",
        },
        {
          name: "asc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      data: specialties,
    });
  } catch (error) {
    console.error("Error obteniendo especialidades:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener las especialidades.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      slug,
      shortName,
      description,
      icon,
      color,
      order = 0,
    } = body;

    if (!name || !slug) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre y el slug son obligatorios.",
        },
        { status: 400 }
      );
    }

    const specialty = await prisma.specialty.create({
      data: {
        name,
        slug,
        shortName,
        description,
        icon,
        color,
        order,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: specialty,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando especialidad:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible crear la especialidad.",
      },
      { status: 500 }
    );
  }
}