import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
    attentionAreaId: string;
  }>;
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id, attentionAreaId } =
      await context.params;

    const existingRelation =
      await prisma.specialistattentionarea.findFirst({
        where: {
          specialistId: id,
          attentionAreaId,
        },
      });

    if (!existingRelation) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El área de atención no está asignada a este especialista.",
        },
        { status: 404 }
      );
    }

    await prisma.specialistattentionarea.delete({
      where: {
        id: existingRelation.id,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "Área de atención eliminada correctamente.",
    });
  } catch (error) {
    console.error(
      "Error eliminando área de atención:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible eliminar el área de atención.",
      },
      { status: 500 }
    );
  }
}