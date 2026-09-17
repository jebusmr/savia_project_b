import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const { specialtyId } = body;

    if (!specialtyId) {
      return NextResponse.json(
        {
          success: false,
          error: "El specialtyId es obligatorio.",
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

    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });

    if (!specialty) {
      return NextResponse.json(
        {
          success: false,
          error: "Especialidad no encontrada.",
        },
        { status: 404 }
      );
    }

    await prisma.specialist.update({
      where: {
        id,
      },
      data: {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
    });

    const updatedSpecialist =
      await prisma.specialist.findUnique({
        where: {
          id,
        },
        include: {
          specialty: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: updatedSpecialist,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error relacionando especialista con especialidad:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible relacionar la especialidad.",
      },
      { status: 500 }
    );
  }
}