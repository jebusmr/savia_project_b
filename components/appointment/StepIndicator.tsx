import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const stepLabels = [
  "Servicio",
  "Modalidad",
  "Motivo",
  "Fecha",
  "Horario",
  "Datos",
  "Confirmar",
];

export default function StepIndicator({
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="mb-10">

      <div className="flex items-start justify-between">

        {stepLabels.map((label, index) => {

          const step = index + 1;

          const completed = step < currentStep;

          const active = step === currentStep;

          return (

            <div
              key={label}
              className="relative flex flex-1 flex-col items-center"
            >

              {/* Línea */}

              {index !== stepLabels.length - 1 && (
                <div
                  className={`
                    absolute
                    left-1/2
                    top-5
                    h-1
                    w-full
                    ${
                      completed
                        ? "bg-emerald-600"
                        : "bg-gray-200"
                    }
                  `}
                />
              )}

              {/* Círculo */}

              <div
                className={`
                  z-10
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  text-sm
                  font-semibold
                  transition-all

                  ${
                    completed
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : active
                      ? "border-emerald-600 bg-white text-emerald-700"
                      : "border-gray-300 bg-white text-gray-400"
                  }
                `}
              >

                {completed ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step
                )}

              </div>

              {/* Texto */}

              <span
                className={`
                  mt-3
                  text-center
                  text-xs
                  md:text-sm

                  ${
                    active
                      ? "font-semibold text-[#203564]"
                      : "text-gray-500"
                  }
                `}
              >
                {label}
              </span>

            </div>

          );

        })}

      </div>

    </div>
  );
}