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

    const attentionAreas =
      await prisma.specialistattentionarea.findMany({
        where: {
          specialistId: id,
        },
        include: {
          attentionarea: {
            include: {
              specialty: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    return NextResponse.json({
      success: true,
      data: attentionAreas,
    });
  } catch (error) {
    console.error(
      "Error obteniendo áreas de atención del especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener las áreas de atención del especialista.",
      },
      {
        status: 500,
      }
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

    const { attentionAreaId } = body;

    if (!attentionAreaId) {
      return NextResponse.json(
        {
          success: false,
          error: "El área de atención es obligatoria.",
        },
        {
          status: 400,
        }
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
        {
          status: 404,
        }
      );
    }

    const attentionArea =
      await prisma.attentionarea.findUnique({
        where: {
          id: attentionAreaId,
        },
      });

    if (!attentionArea) {
      return NextResponse.json(
        {
          success: false,
          error: "Área de atención no encontrada.",
        },
        {
          status: 404,
        }
      );
    }

    const relation =
      await prisma.specialistattentionarea.upsert({
        where: {
          specialistId_attentionAreaId: {
            specialistId: id,
            attentionAreaId,
          },
        },
        update: {
          updatedAt: new Date(),
        },
        create: {
          id: crypto.randomUUID(),
          specialistId: id,
          attentionAreaId,
          updatedAt: new Date(),
        },
        include: {
          attentionarea: {
            include: {
              specialty: true,
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: relation,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Error asignando área de atención al especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible asignar el área de atención al especialista.",
      },
      {
        status: 500,
      }
    );
  }
}