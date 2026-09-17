"use client";

import {
  CheckCircle2,
  Heart,
  RefreshCw,
  Search,
  Pencil,
} from "lucide-react";

interface ReasonStepProps {
  value: string;
  otherReason: string;
  onChange: (value: string) => void;
  onOtherReasonChange: (value: string) => void;
}

const reasons = [
  {
    id: "first-visit",
    title: "Primera consulta",
    description: "Es tu primera cita con este especialista.",
    icon: Heart,
  },
  {
    id: "follow-up",
    title: "Seguimiento",
    description: "Continuar un tratamiento o revisión.",
    icon: RefreshCw,
  },
  {
    id: "evaluation",
    title: "Valoración",
    description: "Solicitar una opinión profesional.",
    icon: Search,
  },
  {
    id: "other",
    title: "Otro motivo",
    description: "Describe brevemente tu motivo de consulta.",
    icon: Pencil,
  },
];

export default function ReasonStep({
  value,
  otherReason,
  onChange,
  onOtherReasonChange,
}: ReasonStepProps) {
  return (
    <div>

      <h2 className="text-2xl font-bold text-[#203564]">
        ¿En qué podemos ayudarte hoy?
      </h2>

      <p className="mt-2 text-gray-600">
        Esta información ayudará al especialista a preparar mejor tu consulta.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        {reasons.map((item) => {

          const selected = value === item.id;

          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
              className={`
                relative
                rounded-2xl
                border-2
                p-6
                text-left
                transition-all
                duration-300

                ${
                  selected
                    ? "border-emerald-600 bg-emerald-50 shadow-lg"
                    : "border-gray-200 bg-white hover:border-emerald-300 hover:shadow-md"
                }
              `}
            >

              {selected && (
                <CheckCircle2 className="absolute right-4 top-4 h-6 w-6 text-emerald-600" />
              )}

              <div
                className={`
                  mb-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-xl

                  ${
                    selected
                      ? "bg-emerald-100"
                      : "bg-gray-100"
                  }
                `}
              >

                <Icon
                  className={`
                    h-7
                    w-7

                    ${
                      selected
                        ? "text-emerald-700"
                        : "text-gray-600"
                    }
                  `}
                />

              </div>

              <h3 className="text-lg font-semibold text-[#203564]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                {item.description}
              </p>

            </button>
          );
        })}

      </div>

      {value === "other" && (
        <div className="mt-6">

          <label
            htmlFor="other-reason"
            className="block text-sm font-semibold text-[#203564]"
          >
            Especifica el motivo de tu consulta
          </label>

          <p className="mt-1 text-sm text-gray-500">
            Describe brevemente el motivo por el que deseas consultar.
          </p>

          <textarea
            id="other-reason"
            value={otherReason}
            onChange={(event) =>
              onOtherReasonChange(event.target.value)
            }
            placeholder="Ej. Dolor de espalda desde hace dos semanas..."
            rows={4}
            maxLength={500}
            className="
              mt-3
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              px-4
              py-3
              text-gray-900
              outline-none
              transition
              placeholder:text-gray-400
              focus:border-emerald-500
              focus:ring-2
              focus:ring-emerald-100
            "
          />

          <div className="mt-1 text-right text-xs text-gray-400">
            {otherReason.length}/500
          </div>

        </div>
      )}

    </div>
  );
}