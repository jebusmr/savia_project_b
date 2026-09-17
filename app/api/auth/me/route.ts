import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "No hay una sesión activa.",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          userId: user.id,
          email: user.email,
          role: user.role,
          status: user.status,

          patient: user.patient
            ? {
                id: user.patient.id,
                firstName: user.patient.firstName,
                lastName: user.patient.lastName,
                email: user.patient.email,
                phone: user.patient.phone,
              }
            : null,

          specialist: user.specialist
            ? {
                id: user.specialist.id,
                firstName: user.specialist.firstName,
                lastName: user.specialist.lastName,
                title: user.specialist.title,
              }
            : null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error obteniendo usuario actual:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener la sesión actual.",
      },
      { status: 500 }
    );
  }
}