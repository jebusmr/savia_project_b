import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Debes iniciar sesión.",
        },
        { status: 401 }
      );
    }

    if (
      user.role !== "SPECIALIST" &&
      user.role !== "PROFESSIONAL"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No tienes autorización para realizar esta acción.",
        },
        { status: 403 }
      );
    }

    if (!user.specialist) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Tu cuenta no tiene un perfil profesional asociado.",
        },
        { status: 400 }
      );
    }

    const { id } = await context.params;

    if (user.specialist.id !== id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No tienes autorización para modificar este perfil.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();
    const action = body.action as string;

    if (action !== "REQUEST_REVIEW") {
      return NextResponse.json(
        {
          success: false,
          error: "La acción solicitada no es válida.",
        },
        { status: 400 }
      );
    }

    const verification =
      await prisma.specialistverification.findUnique({
        where: {
          specialistId: id,
        },
      });

    if (!verification) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No existe un registro de verificación para este perfil.",
        },
        { status: 404 }
      );
    }

    if (
      verification.verificationStatus !==
      "CHANGES_REQUIRED"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Solo puedes solicitar una nueva revisión cuando SAVIA haya solicitado correcciones.",
        },
        { status: 400 }
      );
    }

    const updatedVerification =
      await prisma.specialistverification.update({
        where: {
          specialistId: id,
        },
        data: {
          verificationStatus: "IN_REVIEW",
        },
      });

    return NextResponse.json({
      success: true,
      message:
        "Tu solicitud volvió a revisión.",
      data: updatedVerification,
    });
  } catch (error) {
    console.error(
      "Error solicitando nueva revisión:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible solicitar una nueva revisión.",
      },
      { status: 500 }
    );
  }
}