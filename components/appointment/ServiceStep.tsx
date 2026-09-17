"use client";

import { Stethoscope, Clock3 } from "lucide-react";

import { Service } from "@/types/specialist";

interface ServiceStepProps {
  services: Service[];
  value: string;
  onChange: (value: string) => void;
}

export default function ServiceStep({
  services,
  value,
  onChange,
}: ServiceStepProps) {
  return (
    <div>
      {/* Encabezado */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#203564]">
          Elige el servicio
        </h2>

        <p className="mt-2 text-gray-600">
          Selecciona el servicio que deseas reservar.
        </p>
      </div>

      {/* Lista de servicios */}

      {services.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-gray-600">
            Este especialista aún no tiene servicios disponibles para agendar.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => {
            const selected = value === service.id;

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => onChange(service.id)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selected
                    ? "border-emerald-600 bg-emerald-50 ring-2 ring-emerald-100"
                    : "border-gray-200 bg-white hover:border-emerald-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-4">

                  {/* Icono */}

                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      selected
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <Stethoscope className="h-5 w-5" />
                  </div>

                  {/* Información del servicio */}

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="font-semibold text-[#203564]">
                        {service.name}
                      </h3>

                      {service.price !== undefined &&
                        service.price !== null && (
                          <span className="shrink-0 font-bold text-emerald-700">
                            ${service.price} MXN
                          </span>
                        )}
                    </div>

                    {service.description && (
                      <p className="mt-2 text-sm leading-6 text-gray-600">
                        {service.description}
                      </p>
                    )}

                    {service.durationMinutes !== undefined &&
                      service.durationMinutes !== null && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                          <Clock3 className="h-4 w-4" />

                          <span>
                            {service.durationMinutes} minutos
                          </span>
                        </div>
                      )}

                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}