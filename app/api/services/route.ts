import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: {
        status: "ACTIVE",
      },
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error("Error obteniendo servicios:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener los servicios.",
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
      description,
      durationMinutes,
      price,
    } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre del servicio es obligatorio.",
        },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        name,
        description,
        durationMinutes,
        price,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: service,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando servicio:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible crear el servicio.",
      },
      { status: 500 }
    );
  }
}