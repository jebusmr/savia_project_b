import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const specialists = await prisma.specialist.findMany({
      where: {
        status: "ACTIVE",

        specialistverification: {
          is: {
            verificationStatus: "VERIFIED",
          },
        },
      },

      include: {
        specialistprofile: true,

        specialistverification: true,

        specialty: {
          where: {
            status: "ACTIVE",
          },
          orderBy: {
            order: "asc",
          },
        },

        specialistattentionarea: {
          include: {
            attentionarea: true,
          },
        },

        specialistoffice: {
          include: {
            office: {
              include: {
                address: true,
              },
            },
          },
        },

        availability: {
          where: {
            status: "ACTIVE",
          },
          orderBy: [
            {
              dayOfWeek: "asc",
            },
            {
              startTime: "asc",
            },
          ],
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: specialists,
    });
  } catch (error) {
    console.error(
      "Error obteniendo especialistas:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener los especialistas.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      title,
      email,
      phone,
    } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Nombre, apellidos y correo son obligatorios.",
        },
        { status: 400 }
      );
    }

    const specialist = await prisma.specialist.create({
      data: {
        firstName,
        lastName,
        title,
        email,
        phone,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: specialist,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible crear el especialista.",
      },
      { status: 500 }
    );
  }
}