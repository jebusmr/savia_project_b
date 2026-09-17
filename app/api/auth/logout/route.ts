import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth/session";

export async function POST() {
  try {
    await destroySession();

    return NextResponse.json({
      success: true,
      message: "Sesión cerrada correctamente.",
    });
  } catch (error) {
    console.error("Error cerrando sesión:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible cerrar la sesión.",
      },
      { status: 500 }
    );
  }
}