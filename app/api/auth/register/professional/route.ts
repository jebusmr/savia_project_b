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
      specialtyId,
      professionalLicense,
      specialtyLicense,
    } = body;

    // --------------------------------------------------
    // 1. Validar datos obligatorios
    // --------------------------------------------------

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !specialtyId ||
      !professionalLicense
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Todos los campos obligatorios deben estar completos.",
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
          error: "La contraseña debe tener al menos 8 caracteres.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 3. Normalizar datos
    // --------------------------------------------------

    const normalizedEmail = email.trim().toLowerCase();

    const cleanFirstName = firstName.trim();
    const cleanLastName = lastName.trim();
    const cleanPhone = phone.trim();
    const cleanProfessionalLicense =
      professionalLicense.trim();

    const cleanSpecialtyLicense =
      specialtyLicense?.trim() || null;

    // --------------------------------------------------
    // 4. Verificar que la especialidad exista
    // --------------------------------------------------

    const specialty = await prisma.specialty.findUnique({
      where: {
        id: specialtyId,
      },
    });

    if (!specialty || specialty.status !== "ACTIVE") {
      return NextResponse.json(
        {
          success: false,
          error: "La especialidad seleccionada no es válida.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // 5. Verificar si el correo ya existe
    // --------------------------------------------------

    const existingUser = await prisma.user.findUnique({
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
    // 6. Verificar si ya existe un profesional con
    //    ese correo
    // --------------------------------------------------

    const existingSpecialist =
      await prisma.specialist.findUnique({
        where: {
          email: normalizedEmail,
        },
      });

    if (existingSpecialist) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Ya existe un profesional registrado con este correo electrónico.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // 7. Crear hash de contraseña
    // --------------------------------------------------

    const passwordHash = await bcrypt.hash(password, 12);

    // --------------------------------------------------
    // 8. Crear User + Specialist + Verification
    // --------------------------------------------------

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: normalizedEmail,
          passwordHash,
          role: "PROFESSIONAL",
          status: "ACTIVE",
        },
      });

      const specialist = await tx.specialist.create({
        data: {
          firstName: cleanFirstName,
          lastName: cleanLastName,
          email: normalizedEmail,
          phone: cleanPhone,
          status: "PENDING",
          userId: user.id,
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
      });

      const verification =
        await tx.specialistverification.create({
          data: {
            specialistId: specialist.id,
            professionalLicense:
              cleanProfessionalLicense,
            specialtyLicense:
              cleanSpecialtyLicense,
            verificationStatus: "PENDING",
          },
        });

      return {
        user,
        specialist,
        verification,
      };
    });

    // --------------------------------------------------
    // 9. Respuesta
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,
        message:
          "Cuenta profesional creada correctamente. Tu información será revisada por SAVIA.",
        data: {
          userId: result.user.id,
          specialistId: result.specialist.id,
          verificationId: result.verification.id,
          email: result.user.email,
          role: result.user.role,
          specialistStatus: result.specialist.status,
          verificationStatus:
            result.verification.verificationStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error registrando profesional:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible crear la cuenta profesional.",
      },
      { status: 500 }
    );
  }
}