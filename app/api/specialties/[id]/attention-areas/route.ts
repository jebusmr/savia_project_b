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

    const specialty = await prisma.specialty.findUnique({
      where: {
        id,
      },
    });

    if (!specialty) {
      return NextResponse.json(
        {
          success: false,
          error: "Especialidad no encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    const attentionAreas =
      await prisma.attentionarea.findMany({
        where: {
          specialtyId: id,
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
      specialty: {
        id: specialty.id,
        name: specialty.name,
        slug: specialty.slug,
      },
      data: attentionAreas,
    });
  } catch (error) {
    console.error(
      "Error obteniendo áreas de atención:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener las áreas de atención.",
      },
      {
        status: 500,
      }
    );
  }
}