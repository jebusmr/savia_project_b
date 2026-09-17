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
 * Obtiene todas las certificaciones
 * pertenecientes al especialista.
 */
export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const certifications =
      await prisma.specialistcertification.findMany({
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
      data: certifications,
    });
  } catch (error) {
    console.error(
      "Error obteniendo certificaciones:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener las certificaciones.",
      },
      { status: 500 }
    );
  }
}

/**
 * POST
 *
 * Agrega una nueva certificación.
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

    if (!name || !organization || !year) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El nombre, la organización y el año son obligatorios.",
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

    const certification =
      await prisma.specialistcertification.create({
        data: {
          id: crypto.randomUUID(),
          specialistId: id,
          name,
          organization,
          year,
          description:
            description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: certification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando certificación:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible guardar la certificación.",
      },
      { status: 500 }
    );
  }
}

/**
 * PUT
 *
 * Actualiza una certificación existente.
 */
export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      certificationId,
      name,
      organization,
      year,
      description,
    } = body;

    if (
      !certificationId ||
      !name ||
      !organization ||
      !year
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El registro, el nombre, la organización y el año son obligatorios.",
        },
        { status: 400 }
      );
    }

    const existingCertification =
      await prisma.specialistcertification.findFirst({
        where: {
          id: certificationId,
          specialistId: id,
        },
      });

    if (!existingCertification) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Certificación no encontrada.",
        },
        { status: 404 }
      );
    }

    const updatedCertification =
      await prisma.specialistcertification.update({
        where: {
          id: certificationId,
        },
        data: {
          name,
          organization,
          year,
          description:
            description || null,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({
      success: true,
      data: updatedCertification,
    });
  } catch (error) {
    console.error(
      "Error actualizando certificación:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible actualizar la certificación.",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE
 *
 * Elimina una certificación existente.
 */
export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { certificationId } = body;

    if (!certificationId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se especificó la certificación.",
        },
        { status: 400 }
      );
    }

    const existingCertification =
      await prisma.specialistcertification.findFirst({
        where: {
          id: certificationId,
          specialistId: id,
        },
      });

    if (!existingCertification) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Certificación no encontrada.",
        },
        { status: 404 }
      );
    }

    await prisma.specialistcertification.delete({
      where: {
        id: certificationId,
      },
    });

    return NextResponse.json({
      success: true,
      message:
        "La certificación se eliminó correctamente.",
    });
  } catch (error) {
    console.error(
      "Error eliminando certificación:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible eliminar la certificación.",
      },
      { status: 500 }
    );
  }
}