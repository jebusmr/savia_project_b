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
 * Obtiene toda la formación académica
 * perteneciente al especialista.
 */
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const education =
      await prisma.specialisteducation.findMany({
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
      data: education,
    });
  } catch (error) {
    console.error(
      "Error obteniendo formación académica:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener la formación académica.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 *
 * Agrega un nuevo registro de formación académica.
 */
export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      degree,
      institution,
      year,
      description,
    } = body;

    if (!degree || !institution) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El grado y la institución son obligatorios.",
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

    const education =
      await prisma.specialisteducation.create({
        data: {
          id: crypto.randomUUID(),
          specialistId: id,
          degree,
          institution,
          year: year || null,
          description: description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: education,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando formación académica:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible guardar la formación académica.",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT
 *
 * Modifica un registro existente de formación académica.
 */
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      educationId,
      degree,
      institution,
      year,
      description,
    } = body;

    if (
      !educationId ||
      !degree ||
      !institution
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El registro, el grado y la institución son obligatorios.",
        },
        { status: 400 }
      );
    }

    const education =
      await prisma.specialisteducation.findFirst({
        where: {
          id: educationId,
          specialistId: id,
        },
      });

    if (!education) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Formación académica no encontrada.",
        },
        { status: 404 }
      );
    }

    const updatedEducation =
      await prisma.specialisteducation.update({
        where: {
          id: educationId,
        },
        data: {
          degree,
          institution,
          year: year || null,
          description:
            description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      data: updatedEducation,
    });
  } catch (error) {
    console.error(
      "Error actualizando formación académica:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible actualizar la formación académica.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE
 *
 * Elimina un registro de formación académica
 * perteneciente al especialista.
 */
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { educationId } = body;

    if (!educationId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se especificó el registro de formación.",
        },
        { status: 400 }
      );
    }

    const education =
      await prisma.specialisteducation.findFirst({
        where: {
          id: educationId,
          specialistId: id,
        },
      });

    if (!education) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Formación académica no encontrada.",
        },
        { status: 404 }
      );
    }

    await prisma.specialisteducation.delete({
      where: {
        id: educationId,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "La formación académica se eliminó correctamente.",
    });
  } catch (error) {
    console.error(
      "Error eliminando formación académica:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible eliminar la formación académica.",
      },
      { status: 500 }
    );
  }
}