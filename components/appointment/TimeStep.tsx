"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";

interface TimeStepProps {
  value: string;
  onChange: (time: string) => void;

  specialistId: string;
  serviceId: string;
  modality: string;
  date?: Date;
}

export default function TimeStep({
  value,
  onChange,
  specialistId,
  serviceId,
  modality,
  date,
}: TimeStepProps) {
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    if (
      !date ||
      !specialistId ||
      !serviceId ||
      !modality
    ) {
      setAvailableTimes([]);
      return;
    }

    const loadAvailability = async () => {
      try {
        setLoading(true);

        const year = date.getFullYear();

        const month = String(
          date.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
          date.getDate()
        ).padStart(2, "0");

        const dateString =
          `${year}-${month}-${day}`;

        const params = new URLSearchParams({
          date: dateString,
          serviceId,
          modality,
        });

        const response = await fetch(
          `/api/specialists/${specialistId}/availability?${params.toString()}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ||
              "No fue posible obtener los horarios."
          );
        }

        setAvailableTimes(
          result.data.availableTimes ?? []
        );

      } catch (error) {
        console.error(
          "Error obteniendo horarios:",
          error
        );

        setAvailableTimes([]);

      } finally {
        setLoading(false);
      }
    };

    loadAvailability();

  }, [
    date,
    specialistId,
    serviceId,
    modality,
  ]);

  return (
    <div className="mx-auto max-w-3xl">

      {/* Encabezado */}

      <div className="text-center">

        <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
          Selecciona un horario
        </h2>

        <p className="mt-3 text-gray-600">
          Estos son los horarios disponibles para
          la fecha seleccionada.
        </p>

      </div>

      {/* Cargando */}

      {loading && (
        <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
          <p className="text-gray-600">
            Consultando horarios disponibles...
          </p>
        </div>
      )}

      {/* Sin horarios */}

      {!loading &&
        availableTimes.length === 0 && (
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-8 text-center">
            <p className="font-medium text-[#203564]">
              No hay horarios disponibles.
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Selecciona otra fecha para consultar
              disponibilidad.
            </p>
          </div>
        )}

      {/* Horarios */}

      {!loading &&
        availableTimes.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">

            {availableTimes.map((time) => {

              const selected =
                value === time;

              return (
                <button
                  key={time}
                  type="button"
                  onClick={() =>
                    onChange(time)
                  }
                  className={`
                    relative
                    rounded-xl
                    border-2
                    p-4
                    transition-all
                    duration-300

                    ${
                      selected
                        ? "border-emerald-600 bg-emerald-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-sm"
                    }
                  `}
                >

                  {selected && (
                    <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-emerald-600" />
                  )}

                  <div className="flex flex-col items-center">

                    <Clock
                      className={`
                        mb-2
                        h-6
                        w-6

                        ${
                          selected
                            ? "text-emerald-600"
                            : "text-gray-500"
                        }
                      `}
                    />

                    <span
                      className={`
                        text-lg
                        font-semibold

                        ${
                          selected
                            ? "text-emerald-700"
                            : "text-[#203564]"
                        }
                      `}
                    >
                      {time}
                    </span>

                  </div>

                </button>
              );
            })}

          </div>
        )}

      {/* Nota */}

      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-4">

        <p className="text-sm text-gray-700">
          Los horarios mostrados corresponden
          únicamente a la disponibilidad real del
          especialista para la fecha seleccionada.
        </p>

      </div>

    </div>
  );
}