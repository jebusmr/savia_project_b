"use client";

import { useState } from "react";

interface VerificationChecksProps {
  specialistId: string;
  status: string;
  identityVerified: boolean;
  licenseVerified: boolean;
  specialtyVerified: boolean;
  documentsVerified: boolean;
}

interface CheckItem {
  key:
    | "identityVerified"
    | "licenseVerified"
    | "specialtyVerified"
    | "documentsVerified";
  label: string;
  description: string;
}

const checks: CheckItem[] = [
  {
    key: "identityVerified",
    label: "Identidad",
    description:
      "Comprobar que la identidad del profesional coincide con la documentación presentada.",
  },
  {
    key: "licenseVerified",
    label: "Cédula profesional",
    description:
      "Comprobar la información de la cédula profesional.",
  },
  {
    key: "specialtyVerified",
    label: "Especialidad",
    description:
      "Comprobar la formación o acreditación correspondiente a la especialidad.",
  },
  {
    key: "documentsVerified",
    label: "Documentos",
    description:
      "Comprobar que la documentación requerida fue presentada y revisada.",
  },
];

export default function VerificationChecks({
  specialistId,
  status,
  identityVerified,
  licenseVerified,
  specialtyVerified,
  documentsVerified,
}: VerificationChecksProps) {
  const [values, setValues] = useState({
    identityVerified,
    licenseVerified,
    specialtyVerified,
    documentsVerified,
  });

  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function verifyCheck(
    check:
      | "identityVerified"
      | "licenseVerified"
      | "specialtyVerified"
      | "documentsVerified"
  ) {
    setLoading(check);
    setError("");

    try {
      const response = await fetch(
        `/api/admin/profesionales/${specialistId}/verification`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "VERIFY_CHECK",
            check,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No fue posible verificar esta comprobación."
        );
      }

      setValues((current) => ({
        ...current,
        [check]: true,
      }));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al verificar la comprobación."
      );
    } finally {
      setLoading(null);
    }
  }

  if (status !== "IN_REVIEW") {
    return null;
  }

  return (
    <div className="mt-6">

      <h3 className="text-lg font-semibold text-[#17365D]">
        Comprobaciones de verificación
      </h3>

      <p className="mt-1 text-sm text-gray-600">
        Marca cada comprobación después de revisar la
        documentación correspondiente.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="mt-5 space-y-4">

        {checks.map((check) => {
          const verified = values[check.key];
          const isLoading = loading === check.key;

          return (
            <div
              key={check.key}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {check.label}
                  </h4>

                  <p className="mt-1 text-sm text-gray-600">
                    {check.description}
                  </p>
                </div>

                <div className="shrink-0">

                  {verified ? (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                      ✓ Verificada
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => verifyCheck(check.key)}
                      disabled={isLoading}
                      className="rounded-lg bg-[#17365D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading
                        ? "Guardando..."
                        : "Marcar como verificada"}
                    </button>
                  )}

                </div>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}