import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET
 *
 * Obtiene todos los reconocimientos
 * pertenecientes al especialista.
 */
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const awards =
      await prisma.specialistaward.findMany({
        where: {
          specialistId: id,
        },
        orderBy: [
          {
            year: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      data: awards,
    });
  } catch (error) {
    console.error(
      "Error obteniendo reconocimientos:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener los reconocimientos.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 *
 * Agrega un nuevo reconocimiento.
 */
export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      name,
      organization,
      year,
      description,
    } = body;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El nombre del reconocimiento es obligatorio.",
        },
        { status: 400 }
      );
    }

    const specialist =
      await prisma.specialist.findUnique({
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

    const award =
      await prisma.specialistaward.create({
        data: {
          id: crypto.randomUUID(),
          specialistId: id,
          name,
          organization:
            organization || null,
          year: year || null,
          description:
            description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: award,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando reconocimiento:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible guardar el reconocimiento.",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT
 *
 * Actualiza un reconocimiento existente.
 */
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      awardId,
      name,
      organization,
      year,
      description,
    } = body;

    if (!awardId || !name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El registro y el nombre del reconocimiento son obligatorios.",
        },
        { status: 400 }
      );
    }

    const existingAward =
      await prisma.specialistaward.findFirst({
        where: {
          id: awardId,
          specialistId: id,
        },
      });

    if (!existingAward) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Reconocimiento no encontrado.",
        },
        { status: 404 }
      );
    }

    const updatedAward =
      await prisma.specialistaward.update({
        where: {
          id: awardId,
        },
        data: {
          name,
          organization:
            organization || null,
          year: year || null,
          description:
            description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      data: updatedAward,
    });
  } catch (error) {
    console.error(
      "Error actualizando reconocimiento:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible actualizar el reconocimiento.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE
 *
 * Elimina un reconocimiento existente.
 */
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { awardId } = body;

    if (!awardId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se especificó el reconocimiento.",
        },
        { status: 400 }
      );
    }

    const existingAward =
      await prisma.specialistaward.findFirst({
        where: {
          id: awardId,
          specialistId: id,
        },
      });

    if (!existingAward) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Reconocimiento no encontrado.",
        },
        { status: 404 }
      );
    }

    await prisma.specialistaward.delete({
      where: {
        id: awardId,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "El reconocimiento se eliminó correctamente.",
    });
  } catch (error) {
    console.error(
      "Error eliminando reconocimiento:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible eliminar el reconocimiento.",
      },
      { status: 500 }
    );
  }
}