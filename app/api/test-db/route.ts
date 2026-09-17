import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const specialists = await prisma.specialist.count();
    const patients = await prisma.patient.count();
    const appointments = await prisma.appointment.count();

    return NextResponse.json({
      success: true,
      database: "connected",
      counts: {
        specialists,
        patients,
        appointments,
      },
    });
  } catch (error) {
    console.error("Error conectando con la base de datos:", error);

    return NextResponse.json(
      {
        success: false,
        database: "error",
      },
      { status: 500 }
    );
  }
}