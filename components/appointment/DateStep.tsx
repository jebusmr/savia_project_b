"use client";

import Calendar from "./Calendar";

interface DateStepProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export default function DateStep({
  value,
  onChange,
}: DateStepProps) {
  return (
    <div className="mx-auto max-w-3xl">

      {/* Encabezado */}

      <div className="text-center">

        <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
          Selecciona la fecha de tu cita
        </h2>

        <p className="mt-3 text-gray-600">
          Elige un día disponible para continuar con el proceso de
          agendamiento.
        </p>

      </div>

      {/* Calendario */}

      <div className="mt-8">

        <Calendar
          selected={value}
          onSelect={onChange}
        />

      </div>

      {/* Leyenda */}

      <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

        <h3 className="font-semibold text-emerald-700">
          Antes de continuar...
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-gray-700">

          <li>
            • Solo se muestran fechas disponibles.
          </li>

          <li>
            • Los horarios aparecerán después de seleccionar un día.
          </li>

          <li>
            • Puedes cambiar la fecha en cualquier momento.
          </li>

        </ul>

      </div>

    </div>
  );
}