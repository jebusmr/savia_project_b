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

    const { officeId, isPrimary = false } = body;

    if (!officeId) {
      return NextResponse.json(
        {
          success: false,
          error: "El officeId es obligatorio.",
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

    const office = await prisma.office.findUnique({
      where: {
        id: officeId,
      },
    });

    if (!office) {
      return NextResponse.json(
        {
          success: false,
          error: "Consultorio no encontrado.",
        },
        { status: 404 }
      );
    }

    if (isPrimary) {
      await prisma.specialistoffice.updateMany({
        where: {
          specialistId: id,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const specialistOffice =
      await prisma.specialistoffice.upsert({
        where: {
          specialistId_officeId: {
            specialistId: id,
            officeId,
          },
        },
        update: {
          isPrimary,
        },
        create: {
          specialistId: id,
          officeId,
          isPrimary,
        },
      });

    const updatedSpecialist =
      await prisma.specialist.findUnique({
        where: {
          id,
        },
        include: {
          specialistoffice: {
            include: {
              office: {
                include: {
                  address: true,
                },
              },
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: {
          relationship: specialistOffice,
          specialist: updatedSpecialist,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error relacionando especialista con consultorio:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible relacionar el consultorio.",
      },
      { status: 500 }
    );
  }
}