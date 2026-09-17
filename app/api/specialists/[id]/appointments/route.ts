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

    // --------------------------------------------------
    // 1. Buscar especialista
    // --------------------------------------------------

    const specialist = await prisma.specialist.findUnique({
      where: {
        id,
      },
      include: {
      user: true,
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

    // --------------------------------------------------
    // 2. Obtener citas pendientes
    // --------------------------------------------------

    const appointments =
      await prisma.appointment.findMany({
        where: {
          specialistId: id,
          status: "PENDING",
        },
        include: {
          patient: true,
          service: true,
          office: {
            include: {
              address: true,
            },
          },
        },
        orderBy: [
          {
            date: "asc",
          },
          {
            time: "asc",
          },
        ],
      });

    // --------------------------------------------------
    // 3. Respuesta
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      specialist: {
        id: specialist.id,
        firstName: specialist.firstName,
        lastName: specialist.lastName,
        email: specialist.email,
        userId: specialist.userId,
        userEmail: specialist.user?.email ?? null,
        userRole: specialist.user?.role ?? null,
    },
  data: appointments,
});
  } catch (error) {
    console.error(
      "Error obteniendo citas del especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener las citas del especialista.",
      },
      { status: 500 }
    );
  }
}