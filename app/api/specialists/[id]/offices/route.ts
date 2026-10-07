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

    const specialist = await prisma.specialist.findUnique({
      where: {
        id,
      },
      include: {
        specialistoffice: {
          include: {
            office: {
              include: {
                address: true,
              },
            },
          },
        },
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

    return NextResponse.json(
      {
        success: true,
        data: {
          specialistoffice: specialist.specialistoffice,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error obteniendo consultorios:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible obtener los consultorios.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const {
      officeId,
      name,
      phone,
      email,
      website,
      hasParking = false,
      issuesInvoice = false,
      acceptsCash = true,
      acceptsCard = false,
      acceptsTransfer = false,
      street,
      exteriorNumber,
      interiorNumber,
      neighborhood,
      postalCode,
      city,
      municipality,
      state,
      country = "México",
      latitude,
      longitude,
      references,
    } = body;

    if (!officeId) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El identificador del consultorio es obligatorio.",
        },
        { status: 400 }
      );
    }

    const existingOffice =
      await prisma.office.findUnique({
        where: {
          id: officeId,
        },
        include: {
          address: true,
          specialistoffice: true,
        },
      });

    if (!existingOffice) {
      return NextResponse.json(
        {
          success: false,
          error: "Consultorio no encontrado.",
        },
        { status: 404 }
      );
    }

    const belongsToSpecialist =
      existingOffice.specialistoffice.some(
        (relation) => relation.specialistId === id
      );

    if (!belongsToSpecialist) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El consultorio no pertenece a este profesional.",
        },
        { status: 403 }
      );
    }

    const result = await prisma.$transaction(
      async (tx) => {
        const address = await tx.address.update({
          where: {
            id: existingOffice.addressId,
          },
          data: {
            street,
            exteriorNumber:
              exteriorNumber || null,
            interiorNumber:
              interiorNumber || null,
            neighborhood:
              neighborhood || null,
            postalCode,
            city,
            municipality:
              municipality || null,
            state,
            country,
            latitude:
              latitude !== undefined &&
              latitude !== null
                ? Number(latitude)
                : null,
            longitude:
              longitude !== undefined &&
              longitude !== null
                ? Number(longitude)
                : null,
            references:
              references || null,
          },
        });

        const office = await tx.office.update({
          where: {
            id: officeId,
          },
          data: {
            name,
            phone: phone || null,
            email: email || null,
            website: website || null,
            hasParking: Boolean(hasParking),
            issuesInvoice: Boolean(issuesInvoice),
            acceptsCash: Boolean(acceptsCash),
            acceptsCard: Boolean(acceptsCard),
            acceptsTransfer: Boolean(acceptsTransfer),
          },
        });

        return {
          office,
          address,
        };
      }
    );

    return NextResponse.json(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "Error actualizando consultorio:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible actualizar el consultorio.",
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
      officeId,
      isPrimary = false,
      name,
      phone,
      email,
      website,
      hasParking = false,
      issuesInvoice = false,
      acceptsCash = true,
      acceptsCard = false,
      acceptsTransfer = false,
      street,
      exteriorNumber,
      interiorNumber,
      neighborhood,
      postalCode,
      city,
      municipality,
      state,
      country = "México",
      latitude,
      longitude,
      references,
    } = body;

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

    /*
     * CASO 1:
     * Se proporciona officeId.
     *
     * Conservamos la funcionalidad anterior:
     * relacionar un consultorio existente con el profesional.
     */

    if (officeId) {
      const office = await prisma.office.findUnique({
        where: {
          id: officeId,
        },
      });

      if (!office) {
        return NextResponse.json(
          {
            success: false,
            error: "Consultorio no encontrado.",
          },
          { status: 404 }
        );
      }

      if (isPrimary) {
        await prisma.specialistoffice.updateMany({
          where: {
            specialistId: id,
          },
          data: {
            isPrimary: false,
          },
        });
      }

      const specialistOffice =
        await prisma.specialistoffice.upsert({
          where: {
            specialistId_officeId: {
              specialistId: id,
              officeId,
            },
          },
          update: {
            isPrimary,
          },
          create: {
            specialistId: id,
            officeId,
            isPrimary,
          },
        });

      const updatedSpecialist =
        await prisma.specialist.findUnique({
          where: {
            id,
          },
          include: {
            specialistoffice: {
              include: {
                office: {
                  include: {
                    address: true,
                  },
                },
              },
            },
          },
        });

      return NextResponse.json(
        {
          success: true,
          data: {
            relationship: specialistOffice,
            specialist: updatedSpecialist,
          },
        },
        { status: 200 }
      );
    }

    /*
     * CASO 2:
     * No se proporciona officeId.
     *
     * En este caso creamos:
     * 1. address
     * 2. office
     * 3. specialistoffice
     */

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El nombre del consultorio es obligatorio.",
        },
        { status: 400 }
      );
    }

    if (!street || !postalCode || !city || !state) {
      return NextResponse.json(
        {
          success: false,
          error:
            "La calle, código postal, ciudad y estado son obligatorios.",
        },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(
      async (tx) => {
        if (isPrimary) {
          await tx.specialistoffice.updateMany({
            where: {
              specialistId: id,
            },
            data: {
              isPrimary: false,
            },
          });
        }

        const address = await tx.address.create({
          data: {
            street,
            exteriorNumber:
              exteriorNumber || null,
            interiorNumber:
              interiorNumber || null,
            neighborhood:
              neighborhood || null,
            postalCode,
            city,
            municipality:
              municipality || null,
            state,
            country,
            latitude:
              latitude !== undefined &&
              latitude !== null
                ? Number(latitude)
                : null,
            longitude:
              longitude !== undefined &&
              longitude !== null
                ? Number(longitude)
                : null,
            references:
              references || null,
          },
        });

        const office = await tx.office.create({
          data: {
            name,
            phone: phone || null,
            email: email || null,
            website: website || null,
            hasParking: Boolean(hasParking),
            issuesInvoice: Boolean(issuesInvoice),
            acceptsCash: Boolean(acceptsCash),
            acceptsCard: Boolean(acceptsCard),
            acceptsTransfer: Boolean(acceptsTransfer),
            addressId: address.id,
          },
        });

        const specialistOffice =
          await tx.specialistoffice.create({
            data: {
              specialistId: id,
              officeId: office.id,
              isPrimary,
            },
          });

        return {
          address,
          office,
          specialistOffice,
        };
      }
    );

    const updatedSpecialist =
      await prisma.specialist.findUnique({
        where: {
          id,
        },
        include: {
          specialistoffice: {
            include: {
              office: {
                include: {
                  address: true,
                },
              },
            },
          },
        },
      });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...result,
          specialist: updatedSpecialist,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "Error creando o relacionando consultorio:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "No fue posible crear o relacionar el consultorio.",
      },
      { status: 500 }
    );
  }
}