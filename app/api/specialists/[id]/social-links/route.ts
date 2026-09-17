import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const socialLinks = await prisma.sociallink.findMany({
      where: {
        specialistId: id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: socialLinks,
    });
  } catch (error) {
    console.error(
      "Error obteniendo enlaces sociales:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener los enlaces.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { platform, url } = body;

    if (!platform || !url) {
      return NextResponse.json(
        {
          success: false,
          error: "platform y url son obligatorios.",
        },
        { status: 400 }
      );
    }

    const specialist = await prisma.specialist.findUnique({
      where: {
        id,
      },
    });

    if (!specialist) {
      return NextResponse.json(
        {
          success: false,
          error: "Especialista no encontrado.",
        },
        { status: 404 }
      );
    }

    const socialLink = await prisma.sociallink.create({
      data: {
        specialistId: id,
        platform,
        url,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: socialLink,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando enlace social:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible guardar el enlace.",
      },
      { status: 500 }
    );
  }
}