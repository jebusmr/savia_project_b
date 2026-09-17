import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    } = body;

    // --------------------------------------------------
    // 1. Validar datos obligatorios
    // --------------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Todos los campos son obligatorios.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 2. Validar contraseña
    // --------------------------------------------------

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 3. Normalizar correo
    // --------------------------------------------------

    const normalizedEmail =
      email.trim().toLowerCase();

    // --------------------------------------------------
    // 4. Verificar si el correo ya existe
    // --------------------------------------------------

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Ya existe una cuenta registrada con este correo electrónico.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // 5. Crear hash de contraseña
    // --------------------------------------------------

    const passwordHash =
      await bcrypt.hash(password, 12);

    // --------------------------------------------------
    // 6. Crear User + Patient
    // --------------------------------------------------

    const result =
      await prisma.$transaction(
        async (tx) => {
          const user =
            await tx.user.create({
              data: {
                email: normalizedEmail,
                passwordHash,
                role: "PATIENT",
                status: "ACTIVE",
              },
            });

          const patient =
            await tx.patient.create({
              data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: normalizedEmail,
                phone: phone.trim(),
                userId: user.id,
                status: "ACTIVE",
              },
            });

          return {
            user,
            patient,
          };
        }
      );

    // --------------------------------------------------
    // 7. Respuesta
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Cuenta de paciente creada correctamente.",
        data: {
          userId: result.user.id,
          patientId: result.patient.id,
          email: result.user.email,
          role: result.user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error registrando paciente:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible crear la cuenta del paciente.",
      },
      { status: 500 }
    );
  }
}