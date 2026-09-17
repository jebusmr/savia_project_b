
import crypto from "crypto";
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

    const {
      firstName,
      lastName,
      title,
      biography,
      yearsExperience,
      university,
      specialtySchool,
      certifications,
      awards,
      languages,
      approach,
      philosophy,
    } = body;

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

    const updatedSpecialist =
      await prisma.$transaction(async (tx) => {
        const updated = await tx.specialist.update({
          where: {
            id,
          },
          data: {
            firstName:
              typeof firstName === "string"
                ? firstName.trim()
                : specialist.firstName,

            lastName:
              typeof lastName === "string"
                ? lastName.trim()
                : specialist.lastName,

            title:
              typeof title === "string"
                ? title.trim()
                : specialist.title,
          },
        });

        await tx.specialistprofile.upsert({
          where: {
            specialistId: id,
          },

          update: {
            biography,
            yearsExperience,
            university,
            specialtySchool,
            certifications,
            awards,
            languages,
            approach,
            philosophy,
          },

          create: {
            id: crypto.randomUUID(),
            specialistId: id,
            biography,
            yearsExperience,
            university,
            specialtySchool,
            certifications,
            awards,
            languages,
            approach,
            philosophy,
            updatedAt: new Date(),
          },
        });

        return updated;
      });

    return NextResponse.json(
      {
        success: true,
        data: {
          specialist: updatedSpecialist,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error guardando perfil:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible guardar el perfil.",
      },
      { status: 500 }
    );
  }
}