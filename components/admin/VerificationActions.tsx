"use client";

import { useState } from "react";

interface VerificationActionsProps {
  specialistId: string;
  status: string;
  identityVerified: boolean;
  licenseVerified: boolean;
  specialtyVerified: boolean;
  documentsVerified: boolean;
}

export default function VerificationActions({
  specialistId,
  status,
  identityVerified,
  licenseVerified,
  specialtyVerified,
  documentsVerified,
}: VerificationActionsProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showChangesForm, setShowChangesForm] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [notes, setNotes] = useState("");

  const allChecksVerified =
    identityVerified &&
    licenseVerified &&
    specialtyVerified &&
    documentsVerified;

  async function startReview() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/profesionales/${specialistId}/verification`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "START_REVIEW",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No fue posible iniciar la revisión."
        );
      }

      setMessage(
        "La solicitud pasó a revisión correctamente."
      );

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

  async function approveProfessional() {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/profesionales/${specialistId}/verification`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "APPROVE",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No fue posible aprobar al profesional."
        );
      }

      setMessage(
        "El profesional fue verificado correctamente."
      );

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

  async function requestChanges() {
    if (!notes.trim()) {
      setError(
        "Debes indicar qué información debe corregirse."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/profesionales/${specialistId}/verification`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "REQUEST_CHANGES",
            notes: notes.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No fue posible solicitar las correcciones."
        );
      }

      setMessage(
        "Se solicitaron correcciones al profesional."
      );

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

async function returnToReview() {
  setLoading(true);
  setError("");
  setMessage("");

  try {
    const response = await fetch(
      `/api/admin/profesionales/${specialistId}/verification`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "RETURN_TO_REVIEW",
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          "No fue posible devolver la solicitud a revisión."
      );
    }

    setMessage(
      "La solicitud volvió a estado de revisión."
    );

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

  async function rejectProfessional() {
    if (!notes.trim()) {
      setError(
        "Debes indicar el motivo del rechazo."
      );
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/profesionales/${specialistId}/verification`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "REJECT",
            notes: notes.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "No fue posible rechazar al profesional."
        );
      }

      setMessage(
        "El profesional fue rechazado correctamente."
      );

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

  if (status === "PENDING") {
    return (
      <div className="mt-5">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={startReview}
          disabled={loading}
          className="rounded-lg bg-[#17365D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Iniciando revisión..."
            : "Tomar revisión"}
        </button>
      </div>
    );
  }

  if (status === "IN_REVIEW") {
    return (
      <div className="mt-5">
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
            {message}
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          {allChecksVerified && (
            <button
              type="button"
              onClick={approveProfessional}
              disabled={loading}
              className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Aprobando..."
                : "Aprobar profesional"}
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              setShowChangesForm(
                (current) => !current
              );
              setShowRejectForm(false);
              setError("");
            }}
            disabled={loading}
            className="rounded-lg border border-amber-300 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-800 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showChangesForm
              ? "Cancelar"
              : "Solicitar correcciones"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowRejectForm(
                (current) => !current
              );
              setShowChangesForm(false);
              setError("");
            }}
            disabled={loading}
            className="rounded-lg border border-red-300 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {showRejectForm
              ? "Cancelar"
              : "Rechazar profesional"}
          </button>
        </div>

        {!allChecksVerified && (
          <p className="mt-3 text-sm text-gray-600">
            Completa las cuatro comprobaciones antes de
            aprobar al profesional.
          </p>
        )}

        {showChangesForm && (
          <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5">
            <label
              htmlFor="verification-notes"
              className="block text-sm font-semibold text-gray-900"
            >
              Correcciones solicitadas
            </label>

            <p className="mt-1 text-sm text-gray-600">
              Indica claramente qué información debe
              corregir o complementar el profesional.
            </p>

            <textarea
              id="verification-notes"
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              rows={5}
              placeholder="Ejemplo: La cédula profesional debe coincidir con el documento presentado."
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-[#17365D] focus:ring-1 focus:ring-[#17365D]"
              disabled={loading}
            />

            <div className="mt-4">
              <button
                type="button"
                onClick={requestChanges}
                disabled={loading || !notes.trim()}
                className="rounded-lg bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Guardando..."
                  : "Enviar solicitud de correcciones"}
              </button>
            </div>
          </div>
        )}

        {showRejectForm && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-5">
            <label
              htmlFor="rejection-notes"
              className="block text-sm font-semibold text-gray-900"
            >
              Motivo del rechazo
            </label>

            <p className="mt-1 text-sm text-gray-600">
              Indica claramente el motivo por el que
              la solicitud no puede ser aprobada.
            </p>

            <textarea
              id="rejection-notes"
              value={notes}
              onChange={(event) =>
                setNotes(event.target.value)
              }
              rows={5}
              placeholder="Ejemplo: La documentación presentada no permite acreditar la información profesional registrada."
              className="mt-3 w-full rounded-lg border border-gray-300 bg-white p-3 text-sm text-gray-900 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
              disabled={loading}
            />

            <div className="mt-4">
              <button
                type="button"
                onClick={rejectProfessional}
                disabled={loading || !notes.trim()}
                className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Rechazando..."
                  : "Confirmar rechazo"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (status === "VERIFIED") {
    return (
      <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
        Este profesional ya se encuentra verificado
        por SAVIA.
      </div>
    );
  }

  if (status === "CHANGES_REQUIRED") {
  return (
    <div className="mt-5">

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">
          {message}
        </div>
      )}

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">

        <p className="text-sm text-amber-800">
          Se solicitaron correcciones a este profesional.
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Cuando la información corregida haya sido
          recibida y esté lista para una nueva revisión,
          puedes devolver la solicitud a revisión.
        </p>

        <button
          type="button"
          onClick={returnToReview}
          disabled={loading}
          className="mt-4 rounded-lg bg-[#17365D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Volviendo a revisión..."
            : "Volver a revisión"}
        </button>

      </div>

    </div>
  );
}

  if (status === "REJECTED") {
    return (
      <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        Este profesional fue rechazado.
      </div>
    );
  }

  return null;
}