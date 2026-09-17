import crypto from "crypto";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const services = await prisma.specialistservice.findMany({
      where: {
        specialistId: id,
        status: "ACTIVE",
      },
      include: {
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.error(
      "Error obteniendo servicios del especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible obtener los servicios del especialista.",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const {
      serviceId,
      price,
      durationMinutes,
    } = body;

    if (!serviceId) {
      return NextResponse.json(
        {
          success: false,
          error: "El serviceId es obligatorio.",
        },
        { status: 400 }
      );
    }

    const specialist = await prisma.specialist.findUnique({
      where: {
        id,
      },
    });

    if (!specialist) {
      return NextResponse.json(
        {
          success: false,
          error: "Especialista no encontrado.",
        },
        { status: 404 }
      );
    }

    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return NextResponse.json(
        {
          success: false,
          error: "Servicio no encontrado.",
        },
        { status: 404 }
      );
    }

    const specialistService =
      await prisma.specialistservice.upsert({
        where: {
          specialistId_serviceId: {
            specialistId: id,
            serviceId,
          },
        },
        update: {
          price,
          durationMinutes,
          status: "ACTIVE",
        },
        create: {
          id: crypto.randomUUID(),
          specialistId: id,
          serviceId,
          price,
          durationMinutes,
          status: "ACTIVE",
          updatedAt: new Date(),
        },
        include: {
          service: true,
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: specialistService,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error relacionando servicio con especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "No fue posible asignar el servicio al especialista.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const {
      specialistServiceId,
      price,
      durationMinutes,
    } = body;

    if (!specialistServiceId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El specialistServiceId es obligatorio.",
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.specialistservice.findFirst({
        where: {
          id: specialistServiceId,
          specialistId: id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Servicio del especialista no encontrado.",
        },
        { status: 404 }
      );
    }

    const updated =
      await prisma.specialistservice.update({
        where: {
          id: specialistServiceId,
        },
        data: {
          price,
          durationMinutes,
          status: "ACTIVE",
          updatedAt: new Date(),
        },
        include: {
          service: true,
        },
      });

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error(
      "Error actualizando servicio del especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible actualizar el servicio.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const body = await request.json();

    const { specialistServiceId } = body;

    if (!specialistServiceId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El specialistServiceId es obligatorio.",
        },
        { status: 400 }
      );
    }

    const existing =
      await prisma.specialistservice.findFirst({
        where: {
          id: specialistServiceId,
          specialistId: id,
        },
      });

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Servicio del especialista no encontrado.",
        },
        { status: 404 }
      );
    }

    const updated =
      await prisma.specialistservice.update({
        where: {
          id: specialistServiceId,
        },
        data: {
          status: "INACTIVE",
          updatedAt: new Date(),
        },
        include: {
          service: true,
        },
      });

    return NextResponse.json({
      success: true,
      data: updated,
      message:
        "El servicio se retiró correctamente del perfil.",
    });
  } catch (error) {
    console.error(
      "Error eliminando servicio del especialista:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible retirar el servicio del perfil.",
      },
      { status: 500 }
    );
  }
}