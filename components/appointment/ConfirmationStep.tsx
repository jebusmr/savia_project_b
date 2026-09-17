"use client";

import {
  BadgeCheck,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  User,
} from "lucide-react";

import { Specialist } from "@/types/specialist";

interface ConfirmationStepProps {
  appointment: {
    service: string;
    modality: string;
    reason: string;
    date?: Date;
    time: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };

  specialist: Specialist;
}

export default function ConfirmationStep({
  appointment,
  specialist,
}: ConfirmationStepProps) {

  /*
   * Buscamos el servicio seleccionado
   * utilizando el ID real guardado en appointment.service.
   */

  const selectedService =
    specialist.services.find(
      (service) =>
        service.id === appointment.service
    );

  // Traducción de modalidad

  const modalityLabel = (() => {
    switch (appointment.modality) {
      case "online":
        return "Consulta en línea";

      case "office":
      case "presential":
        return "Consulta presencial";

      case "home":
        return "Visita a domicilio";

      default:
        return appointment.modality;
    }
  })();

  // Traducción del motivo

  const reasonLabel = (() => {
    switch (appointment.reason) {
      case "first-visit":
        return "Primera consulta";

      case "follow-up":
        return "Consulta de seguimiento";

      case "evaluation":
        return "Valoración";

      case "other":
        return "Otro motivo";

      default:
        return appointment.reason;
    }
  })();

  return (
    <div className="mx-auto max-w-3xl">

      {/* Encabezado */}

      <div className="text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">

          <BadgeCheck className="h-10 w-10 text-emerald-600" />

        </div>

        <h2 className="mt-6 text-3xl font-bold text-[#203564]">
          ¡Ya casi terminamos!
        </h2>

        <p className="mt-3 text-gray-600">
          Estás a un paso de enviar tu solicitud de cita.
          Revisa que toda la información sea correcta.
        </p>

      </div>

      {/* Especialista */}

      <div className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">

            <Stethoscope className="h-7 w-7 text-emerald-600" />

          </div>

          <div>

            <p className="text-sm text-gray-500">
              Especialista
            </p>

            <h3 className="font-semibold text-[#203564]">
              {specialist.personalInfo.title}{" "}
              {specialist.personalInfo.firstName}{" "}
              {specialist.personalInfo.lastName}
            </h3>

            <p className="text-sm text-emerald-700">
              {specialist.personalInfo.specialty}
            </p>

          </div>

        </div>

      </div>

      {/* Resumen */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h3 className="mb-6 text-lg font-semibold text-[#203564]">
          Resumen de la cita
        </h3>

        <div className="space-y-6">

          {/* Servicio */}

          <div className="flex items-start gap-3">

            <Stethoscope className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Servicio
              </p>

              <p className="font-medium">
                {selectedService?.name ??
                  "Servicio seleccionado"}
              </p>

              {selectedService?.durationMinutes && (
                <p className="mt-1 text-sm text-gray-500">
                  Duración:{" "}
                  {selectedService.durationMinutes} minutos
                </p>
              )}

              {selectedService?.price && (
                <p className="mt-1 text-sm font-medium text-emerald-700">
                  ${selectedService.price} MXN
                </p>
              )}

            </div>

          </div>

          {/* Modalidad */}

          <div className="flex items-start gap-3">

            <MapPin className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Modalidad
              </p>

              <p className="font-medium">
                {modalityLabel}
              </p>

            </div>

          </div>

          {/* Motivo */}

          <div className="flex items-start gap-3">

            <BadgeCheck className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Motivo
              </p>

              <p className="font-medium">
                {reasonLabel}
              </p>

            </div>

          </div>

          {/* Fecha */}

          <div className="flex items-start gap-3">

            <CalendarDays className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Fecha
              </p>

              <p className="font-medium">

                {appointment.date
                  ? appointment.date.toLocaleDateString(
                      "es-MX",
                      {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "-"}

              </p>

            </div>

          </div>

          {/* Horario */}

          <div className="flex items-start gap-3">

            <Clock className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Horario
              </p>

              <p className="font-medium">
                {appointment.time}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Paciente */}

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        <h3 className="mb-6 text-lg font-semibold text-[#203564]">
          Datos del paciente
        </h3>

        <div className="space-y-6">

          {/* Nombre */}

          <div className="flex items-start gap-3">

            <User className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Nombre
              </p>

              <p className="font-medium">
                {appointment.firstName}{" "}
                {appointment.lastName}
              </p>

            </div>

          </div>

          {/* Correo */}

          <div className="flex items-start gap-3">

            <Mail className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Correo electrónico
              </p>

              <p className="font-medium">
                {appointment.email}
              </p>

            </div>

          </div>

          {/* Teléfono */}

          <div className="flex items-start gap-3">

            <Phone className="mt-1 h-5 w-5 text-emerald-600" />

            <div>

              <p className="text-sm text-gray-500">
                Teléfono
              </p>

              <p className="font-medium">
                {appointment.phone}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Aviso */}

      <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

        <p className="text-sm leading-6 text-gray-700">
          Al confirmar, tu solicitud será enviada al
          especialista para su revisión. Una vez aceptada,
          recibirás una confirmación y, si es necesario,
          el consultorio podrá comunicarse contigo.
        </p>

      </div>

    </div>
  );
}