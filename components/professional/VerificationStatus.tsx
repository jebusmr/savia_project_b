"use client";

import { useState } from "react";

interface VerificationStatusProps {
  specialistId: string;
  status: string;
  notes: string;
}

export default function VerificationStatus({
  specialistId,
  status,
  notes,
}: VerificationStatusProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestNewReview() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `/api/profesionales/${specialistId}/verification`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "REQUEST_REVIEW",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No fue posible solicitar una nueva revisión."
        );
      }

      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error."
      );
    } finally {
      setLoading(false);
    }
  }

  if (status === "VERIFIED") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
        <p className="text-sm font-medium text-emerald-700">
          Estado de verificación
        </p>

        <p className="mt-1 text-lg font-semibold text-emerald-800">
          Verificado
        </p>

        <p className="mt-3 text-sm text-emerald-800">
          Tu perfil profesional ha sido verificado por
          SAVIA.
        </p>
      </div>
    );
  }

  if (status === "IN_REVIEW") {
    return (
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
        <p className="text-sm font-medium text-blue-700">
          Estado de verificación
        </p>

        <p className="mt-1 text-lg font-semibold text-blue-800">
          En revisión
        </p>

        <p className="mt-3 text-sm text-blue-800">
          SAVIA está revisando la información y
          documentación de tu perfil profesional.
        </p>
      </div>
    );
  }

  if (status === "CHANGES_REQUIRED") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm font-medium text-amber-700">
          Estado de verificación
        </p>

        <p className="mt-1 text-lg font-semibold text-amber-800">
          Requiere correcciones
        </p>

        <p className="mt-3 text-sm text-amber-900">
          SAVIA ha solicitado que corrijas o
          complementes información de tu perfil.
        </p>

        {notes && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-white p-4">
            <p className="text-sm font-semibold text-gray-900">
              Observaciones de SAVIA
            </p>

            <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
              {notes}
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={requestNewReview}
          disabled={loading}
          className="mt-5 rounded-xl bg-[#17365D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Solicitando revisión..."
            : "Solicitar nueva revisión"}
        </button>
      </div>
    );
  }

  if (status === "REJECTED") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-medium text-red-700">
          Estado de verificación
        </p>

        <p className="mt-1 text-lg font-semibold text-red-800">
          Solicitud rechazada
        </p>

        <p className="mt-3 text-sm text-red-900">
          La solicitud de verificación de tu perfil
          profesional fue rechazada por SAVIA.
        </p>

        {notes && (
          <div className="mt-5 rounded-xl border border-red-200 bg-white p-4">
            <p className="text-sm font-semibold text-gray-900">
              Motivo indicado por SAVIA
            </p>

            <p className="mt-2 whitespace-pre-line text-sm text-gray-700">
              {notes}
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
      <p className="text-sm font-medium text-gray-600">
        Estado de verificación
      </p>

      <p className="mt-1 text-lg font-semibold text-gray-800">
        Pendiente
      </p>

      <p className="mt-3 text-sm text-gray-600">
        Tu información se encuentra pendiente de
        revisión por SAVIA.
      </p>
    </div>
  );
}