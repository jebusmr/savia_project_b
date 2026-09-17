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

    const specialist =
      await prisma.specialist.findUnique({
        where: {
          id,
        },

        include: {
          specialistprofile: true,

          specialisteducation: {
            orderBy: {
              createdAt: "asc",
            },
          },

          specialistexperience: {
            orderBy: {
              createdAt: "asc",
            },
          },

          specialistcertification: {
            orderBy: {
              createdAt: "asc",
            },
          },

          specialistaward: {
            orderBy: {
              createdAt: "asc",
            },
          },

          specialistverification: true,

          specialty: {
            where: {
              status: "ACTIVE",
            },
            orderBy: {
              order: "asc",
            },
          },

          sociallink: {
            orderBy: {
              createdAt: "asc",
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

          specialistservice: {
            where: {
              status: "ACTIVE",
            },
            include: {
              service: true,
            },
          },

          specialistattentionarea: {
            include: {
              attentionarea: {
                include: {
                  specialty: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
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

    return NextResponse.json({
      success: true,
      data: specialist,
    });
  } catch (error) {
    console.error(
      "Error obteniendo especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener el especialista.",
      },
      { status: 500 }
    );
  }
}