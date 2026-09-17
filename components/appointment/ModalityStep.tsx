"use client";

import {
  Building2,
  CheckCircle2,
  House,
  Laptop,
} from "lucide-react";

interface ModalityStepProps {
  value: string;
  onChange: (value: string) => void;
  modalities: string[];
}

interface ModalityOption {
  id: string;
  title: string;
  description: string;
  icon: typeof Building2;
}

const modalityOptions: ModalityOption[] = [
  {
    id: "PRESENCIAL",
    title: "Consulta presencial",
    description:
      "Atención en el consultorio del especialista.",
    icon: Building2,
  },
  {
    id: "EN_LINEA",
    title: "Consulta en línea",
    description:
      "Videoconsulta desde cualquier lugar.",
    icon: Laptop,
  },
  {
    id: "DOMICILIO",
    title: "Visita a domicilio",
    description:
      "Atención en el domicilio del paciente.",
    icon: House,
  },
];

function normalizeModality(value: string): string {
  return value
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_");
}

export default function ModalityStep({
  value,
  onChange,
  modalities,
}: ModalityStepProps) {
  const availableModalities = modalities
    .map((modality) => {
      const normalized = normalizeModality(modality);

      return modalityOptions.find(
        (option) => option.id === normalized
      );
    })
    .filter(
      (option): option is ModalityOption =>
        Boolean(option)
    );

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#203564]">
        ¿Cómo deseas tu consulta?
      </h2>

      <p className="mt-2 text-gray-600">
        Selecciona la modalidad que mejor se adapte a tus necesidades.
      </p>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {availableModalities.map((item) => {
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

      {availableModalities.length === 0 && (
        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-gray-600">
            Este especialista no tiene modalidades de atención disponibles.
          </p>
        </div>
      )}
    </div>
  );
}