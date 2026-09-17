import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    // --------------------------------------------------
    // 1. Datos de Carlos Mendoza
    // --------------------------------------------------

    const specialistId =
      "cmsp0pnn40000xgoczn99w8ke";

    const email =
      "carlos.mendoza@savia.test";

    const password =
      "Savia1234";

    // --------------------------------------------------
    // 2. Buscar especialista
    // --------------------------------------------------

    const specialist =
      await prisma.specialist.findUnique({
        where: {
          id: specialistId,
        },
      });

    if (!specialist) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No se encontró el especialista Carlos Mendoza.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // 3. Verificar si ya tiene usuario
    // --------------------------------------------------

    if (specialist.userId) {
      return NextResponse.json({
        success: true,
        message:
          "Carlos Mendoza ya tiene un usuario asociado.",
        data: {
          specialistId: specialist.id,
          userId: specialist.userId,
          email: specialist.email,
        },
      });
    }

    // --------------------------------------------------
    // 4. Verificar si ya existe un usuario con ese correo
    // --------------------------------------------------

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Ya existe un usuario con el correo de Carlos Mendoza.",
        },
        { status: 409 }
      );
    }

    // --------------------------------------------------
    // 5. Crear contraseña
    // --------------------------------------------------

    const passwordHash =
      await bcrypt.hash(password, 12);

    // --------------------------------------------------
    // 6. Crear usuario y vincularlo
    // --------------------------------------------------

 const user =
  await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      email,
      passwordHash,
      role: "SPECIALIST",
      status: "ACTIVE",
      updatedAt: new Date(),
      specialist: {
        connect: {
          id: specialistId,
        },
      },
    },
  });

    // --------------------------------------------------
    // 7. Respuesta
    // --------------------------------------------------

    return NextResponse.json({
      success: true,
      message:
        "Cuenta de Carlos Mendoza creada y vinculada correctamente.",
      data: {
        userId: user.id,
        specialistId,
        email: user.email,
        role: user.role,
        password,
      },
    });
  } catch (error) {
    console.error(
      "Error vinculando cuenta de Carlos Mendoza:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible crear y vincular la cuenta.",
      },
      { status: 500 }
    );
  }
}