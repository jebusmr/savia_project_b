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
 * Obtiene toda la experiencia profesional
 * perteneciente al especialista.
 */
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const experience =
      await prisma.specialistexperience.findMany({
        where: {
          specialistId: id,
        },
        orderBy: [
          {
            startYear: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      });

    return NextResponse.json({
      success: true,
      data: experience,
    });
  } catch (error) {
    console.error(
      "Error obteniendo experiencia profesional:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener la experiencia profesional.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 *
 * Agrega una nueva experiencia profesional.
 */
export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      position,
      institution,
      startYear,
      endYear,
      current,
      description,
    } = body;

    if (
      !position ||
      !institution ||
      !startYear
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El puesto, la institución y el año de inicio son obligatorios.",
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

    const experience =
      await prisma.specialistexperience.create({
        data: {
          id: crypto.randomUUID(),
          specialistId: id,
          position,
          institution,
          startYear,
          endYear: current
            ? null
            : endYear || null,
          current: Boolean(current),
          description:
            description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: experience,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando experiencia profesional:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible guardar la experiencia profesional.",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT
 *
 * Actualiza una experiencia profesional existente.
 */
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      experienceId,
      position,
      institution,
      startYear,
      endYear,
      current,
      description,
    } = body;

    if (
      !experienceId ||
      !position ||
      !institution ||
      !startYear
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El registro, el puesto, la institución y el año de inicio son obligatorios.",
        },
        { status: 400 }
      );
    }

    const existingExperience =
      await prisma.specialistexperience.findFirst({
        where: {
          id: experienceId,
          specialistId: id,
        },
      });

    if (!existingExperience) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Experiencia profesional no encontrada.",
        },
        { status: 404 }
      );
    }

    const updatedExperience =
      await prisma.specialistexperience.update({
        where: {
          id: experienceId,
        },
        data: {
          position,
          institution,
          startYear,
          endYear: current
            ? null
            : endYear || null,
          current: Boolean(current),
          description:
            description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      data: updatedExperience,
    });
  } catch (error) {
    console.error(
      "Error actualizando experiencia profesional:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible actualizar la experiencia profesional.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE
 *
 * Elimina una experiencia profesional existente.
 */
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { experienceId } = body;

    if (!experienceId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se especificó el registro de experiencia.",
        },
        { status: 400 }
      );
    }

    const existingExperience =
      await prisma.specialistexperience.findFirst({
        where: {
          id: experienceId,
          specialistId: id,
        },
      });

    if (!existingExperience) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Experiencia profesional no encontrada.",
        },
        { status: 404 }
      );
    }

    await prisma.specialistexperience.delete({
      where: {
        id: experienceId,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "La experiencia profesional se eliminó correctamente.",
    });
  } catch (error) {
    console.error(
      "Error eliminando experiencia profesional:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible eliminar la experiencia profesional.",
      },
      { status: 500 }
    );
  }
}