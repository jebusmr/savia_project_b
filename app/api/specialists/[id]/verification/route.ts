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
      professionalLicense,
      specialtyLicense,
      identityVerified = false,
      licenseVerified = false,
      specialtyVerified = false,
      documentsVerified = false,
      verificationStatus = "PENDING",
      verifiedAt,
      verifiedBy,
      notes,
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

    const verification =
      await prisma.specialistverification.upsert({
        where: {
          specialistId: id,
        },
        update: {
          professionalLicense,
          specialtyLicense,
          identityVerified,
          licenseVerified,
          specialtyVerified,
          documentsVerified,
          verificationStatus,
          verifiedAt: verifiedAt
            ? new Date(verifiedAt)
            : null,
          verifiedBy,
          notes,
        },
        create: {
          specialistId: id,
          professionalLicense,
          specialtyLicense,
          identityVerified,
          licenseVerified,
          specialtyVerified,
          documentsVerified,
          verificationStatus,
          verifiedAt: verifiedAt
            ? new Date(verifiedAt)
            : null,
          verifiedBy,
          notes,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: verification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error guardando verificación:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible guardar la verificación.",
      },
      { status: 500 }
    );
  }
}