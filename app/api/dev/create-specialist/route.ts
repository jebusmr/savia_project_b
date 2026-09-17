import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // -----------------------------------------------
    // 1. Datos del profesional de prueba
    // -----------------------------------------------

    const email = "profesional@savia.test";
    const password = "Savia1234";

    const firstName = "Carlos";
    const lastName = "Profesional";
    const title = "Dr.";

    // -----------------------------------------------
    // 2. Verificar si ya existe
    // -----------------------------------------------

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
        include: {
        specialist: true,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        success: true,
        message: "El profesional de prueba ya existe.",
        data: {
          userId: existingUser.id,
          specialistId:
            existingUser.specialist?.id ?? null,
          email: existingUser.email,
        },
      });
    }

    // -----------------------------------------------
    // 3. Crear contraseña segura
    // -----------------------------------------------

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    // -----------------------------------------------
    // 4. Crear User + Specialist
    // -----------------------------------------------

    const result = await prisma.$transaction(
      async (tx) => {

        const user = await tx.user.create({
          data: {
            email,
            passwordHash,
            role: "SPECIALIST",
            status: "ACTIVE",
          },
        });

        const specialist =
          await tx.specialist.create({
            data: {
              firstName,
              lastName,
              title,
              email,
              status: "ACTIVE",
              userId: user.id,
            },
          });

        return {
          user,
          specialist,
        };
      }
    );

    // -----------------------------------------------
    // 5. Respuesta
    // -----------------------------------------------

    return NextResponse.json({
      success: true,
      message:
        "Profesional de prueba creado correctamente.",
      data: {
        userId: result.user.id,
        specialistId: result.specialist.id,
        email: result.user.email,
        role: result.user.role,
        password,
      },
    });

  } catch (error) {
    console.error(
      "Error creando profesional de prueba:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible crear el profesional de prueba.",
      },
      {
        status: 500,
      }
    );
  }
}