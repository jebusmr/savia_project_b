import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password } = body;

    // -----------------------------------------------
    // 1. Validar datos obligatorios
    // -----------------------------------------------

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El correo electrónico y la contraseña son obligatorios.",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------------
    // 2. Normalizar correo
    // -----------------------------------------------

    const normalizedEmail = String(email)
      .trim()
      .toLowerCase();

    // -----------------------------------------------
    // 3. Buscar usuario
    // -----------------------------------------------

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      include: {
        patient: true,
        specialist: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El correo o la contraseña son incorrectos.",
        },
        { status: 401 }
      );
    }

    // -----------------------------------------------
    // 4. Verificar estado de la cuenta
    // -----------------------------------------------

    if (user.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Esta cuenta no se encuentra activa.",
        },
        { status: 403 }
      );
    }

    // -----------------------------------------------
    // 5. Comparar contraseña
    // -----------------------------------------------

    const passwordIsValid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordIsValid) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El correo o la contraseña son incorrectos.",
        },
        { status: 401 }
      );
    }

    // -----------------------------------------------
    // 6. Actualizar último acceso
    // -----------------------------------------------

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    // -----------------------------------------------
    // 7. Crear sesión
    // -----------------------------------------------

    await createSession(user.id);

    // -----------------------------------------------
    // 8. Preparar respuesta
    // -----------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Inicio de sesión correcto.",
        data: {
          userId: user.id,
          email: user.email,
          role: user.role,
          patientId: user.patient?.id ?? null,
          specialistId:
            user.specialist?.id ?? null,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error iniciando sesión:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible iniciar sesión.",
      },
      { status: 500 }
    );
  }
}