import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth/session";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

type VerificationAction =
  | "START_REVIEW"
  | "VERIFY_CHECK"
  | "REQUEST_CHANGES"
  | "RETURN_TO_REVIEW"
  | "REJECT"
  | "APPROVE";

const validActions: VerificationAction[] = [
  "START_REVIEW",
  "VERIFY_CHECK",
  "REQUEST_CHANGES",
  "RETURN_TO_REVIEW",
  "REJECT",
  "APPROVE",
];

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    // -----------------------------------------------
    // 1. Obtener usuario actual
    // -----------------------------------------------

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

    // -----------------------------------------------
    // 2. Verificar administrador
    // -----------------------------------------------

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        {
          success: false,
          error:
            "No tienes autorización para realizar esta acción.",
        },
        { status: 403 }
      );
    }

    // -----------------------------------------------
    // 3. Obtener ID del profesional
    // -----------------------------------------------

    const { id } = await context.params;

    // -----------------------------------------------
    // 4. Leer solicitud
    // -----------------------------------------------

    const body = await request.json();

    const action = body.action as VerificationAction;

    if (!validActions.includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: "La acción solicitada no es válida.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // 5. Buscar profesional
    // -----------------------------------------------

    const professional =
      await prisma.specialist.findUnique({
        where: {
          id,
        },
        include: {
          specialistverification: true,
        },
      });

    if (!professional) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se encontró el profesional.",
        },
        { status: 404 }
      );
    }

    const verification =
      professional.specialistverification;

    if (!verification) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El profesional no tiene un registro de verificación.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // 6. TOMAR REVISIÓN
    // -----------------------------------------------

    if (action === "START_REVIEW") {
      if (
        verification.verificationStatus !==
        "PENDING"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Esta solicitud no se encuentra pendiente.",
          },
          { status: 400 }
        );
      }

      const updatedVerification =
        await prisma.specialistverification.update({
          where: {
            specialistId: professional.id,
          },
          data: {
            verificationStatus: "IN_REVIEW",
          },
        });

      return NextResponse.json({
        success: true,
        message:
          "La solicitud pasó a revisión.",
        data: updatedVerification,
      });
    }

    // -----------------------------------------------
    // 7. VERIFICAR UNA COMPROBACIÓN
    // -----------------------------------------------

    if (action === "VERIFY_CHECK") {
      const check = body.check as string;

      const allowedChecks = [
        "identityVerified",
        "licenseVerified",
        "specialtyVerified",
        "documentsVerified",
      ];

      if (!allowedChecks.includes(check)) {
        return NextResponse.json(
          {
            success: false,
            error:
              "La comprobación solicitada no es válida.",
          },
          { status: 400 }
        );
      }

      if (
        verification.verificationStatus !==
        "IN_REVIEW"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "El profesional debe estar en revisión.",
          },
          { status: 400 }
        );
      }

      const updatedVerification =
        await prisma.specialistverification.update({
          where: {
            specialistId: professional.id,
          },
          data: {
            [check]: true,
          },
        });

      return NextResponse.json({
        success: true,
        message:
          "La comprobación fue marcada como verificada.",
        data: updatedVerification,
      });
    }

    // -----------------------------------------------
    // 8. NOTAS
    // -----------------------------------------------

    const notes =
      typeof body.notes === "string"
        ? body.notes.trim()
        : null;

    // -----------------------------------------------
    // 9. SOLICITAR CORRECCIONES
    // -----------------------------------------------

    if (action === "REQUEST_CHANGES") {
      if (
        verification.verificationStatus !==
        "IN_REVIEW"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "El profesional debe estar en revisión.",
          },
          { status: 400 }
        );
      }

      if (!notes) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Debes indicar qué información debe corregirse.",
          },
          { status: 400 }
        );
      }

      const updatedVerification =
        await prisma.specialistverification.update({
          where: {
            specialistId: professional.id,
          },
          data: {
            verificationStatus:
              "CHANGES_REQUIRED",
            notes,
          },
        });

      return NextResponse.json({
        success: true,
        message:
          "Se solicitaron correcciones al profesional.",
        data: updatedVerification,
      });
    }

    if (action === "RETURN_TO_REVIEW") {
      if (
        verification.verificationStatus !==
        "CHANGES_REQUIRED"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "El profesional debe tener correcciones pendientes.",
          },
          { status: 400 }
        );
      }

      const updatedVerification =
        await prisma.specialistverification.update({
          where: {
            specialistId: professional.id,
          },
          data: {
            verificationStatus: "IN_REVIEW",
          },
        });

      return NextResponse.json({
        success: true,
        message:
          "La solicitud volvió a estado de revisión.",
        data: updatedVerification,
      });
    }

    // -----------------------------------------------
    // 10. RECHAZAR
    // -----------------------------------------------

    if (action === "REJECT") {
      if (
        verification.verificationStatus !==
        "IN_REVIEW"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "El profesional debe estar en revisión.",
          },
          { status: 400 }
        );
      }

      if (!notes) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Debes indicar el motivo del rechazo.",
          },
          { status: 400 }
        );
      }

      const result =
        await prisma.$transaction(
          async (tx) => {
            const updatedVerification =
              await tx.specialistverification.update({
                where: {
                  specialistId:
                    professional.id,
                },
                data: {
                  verificationStatus:
                    "REJECTED",
                  notes,
                  verifiedAt: null,
                  verifiedBy: user.email,
                },
              });

            const updatedProfessional =
              await tx.specialist.update({
                where: {
                  id: professional.id,
                },
                data: {
                  status: "INACTIVE",
                },
              });

            return {
              verification:
                updatedVerification,
              professional:
                updatedProfessional,
            };
          }
        );

      return NextResponse.json({
        success: true,
        message:
          "El profesional fue rechazado.",
        data: result,
      });
    }

    // -----------------------------------------------
    // 11. APROBAR
    // -----------------------------------------------

    if (action === "APPROVE") {
      if (
        verification.verificationStatus !==
        "IN_REVIEW"
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              "El profesional debe estar en revisión.",
          },
          { status: 400 }
        );
      }

      const allChecksVerified =
        verification.identityVerified &&
        verification.licenseVerified &&
        verification.specialtyVerified &&
        verification.documentsVerified;

      if (!allChecksVerified) {
        return NextResponse.json(
          {
            success: false,
            error:
              "No se puede aprobar el perfil porque todavía existen comprobaciones pendientes.",
          },
          { status: 400 }
        );
      }

      const result =
        await prisma.$transaction(
          async (tx) => {
            const updatedVerification =
              await tx.specialistverification.update({
                where: {
                  specialistId:
                    professional.id,
                },
                data: {
                  verificationStatus:
                    "VERIFIED",
                  verifiedAt: new Date(),
                  verifiedBy: user.email,
                  notes:
                    notes ??
                    verification.notes,
                },
              });

            const updatedProfessional =
              await tx.specialist.update({
                where: {
                  id: professional.id,
                },
                data: {
                  status: "ACTIVE",
                },
              });

            return {
              verification:
                updatedVerification,
              professional:
                updatedProfessional,
            };
          }
        );

      return NextResponse.json({
        success: true,
        message:
          "El profesional fue verificado correctamente.",
        data: result,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: "Acción no procesada.",
      },
      { status: 400 }
    );
  } catch (error) {
    console.error(
      "Error en la verificación administrativa:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible procesar la verificación.",
      },
      { status: 500 }
    );
  }
}