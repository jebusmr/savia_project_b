import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const offices = await prisma.office.findMany({
      include: {
        address: true,
        specialistoffice: {
          include: {
            specialist: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: offices,
    });
  } catch (error) {
    console.error("Error obteniendo consultorios:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener los consultorios.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      phone,
      email,
      website,
      address,
    } = body;

    if (!name || !address) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre del consultorio y la dirección son obligatorios.",
        },
        { status: 400 }
      );
    }

    const office = await prisma.office.create({
      data: {
        name,
        phone,
        email,
        website,
        address: {
          create: {
            street: address.street,
            exteriorNumber: address.exteriorNumber,
            interiorNumber: address.interiorNumber,
            neighborhood: address.neighborhood,
            postalCode: address.postalCode,
            city: address.city,
            municipality: address.municipality,
            state: address.state,
            country: address.country ?? "México",
            latitude: address.latitude,
            longitude: address.longitude,
            references: address.references,
          },
        },
      },
      include: {
        address: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: office,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creando consultorio:", error);

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible crear el consultorio.",
      },
      { status: 500 }
    );
  }
}