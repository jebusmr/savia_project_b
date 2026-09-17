"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AppointmentActionsProps {
  appointmentId: string;
  specialistId: string;
  status: string;
}

export default function AppointmentActions({
  appointmentId,
  specialistId,
  status,
}: AppointmentActionsProps) {
  const router = useRouter();

  const [currentStatus, setCurrentStatus] =
    useState(status);

  const [loading, setLoading] =
    useState(false);

  const updateStatus = async (
    newStatus: "CONFIRMED" | "REJECTED"
  ) => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/appointments",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentId,
            specialistId,
            status: newStatus,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible actualizar la cita."
        );
      }

      setCurrentStatus(newStatus);
      router.refresh();
    } catch (error) {
      console.error(
        "Error actualizando cita:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "No fue posible actualizar la cita."
      );
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus !== "PENDING") {
    return (
      <div className="mt-5 border-t border-gray-100 pt-5">
        <p className="text-sm text-gray-500">
          Estado de la cita
        </p>

        <p className="mt-1 font-medium text-slate-900">
          {currentStatus === "CONFIRMED"
            ? "Cita confirmada"
            : "Cita rechazada"}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 flex gap-3 border-t border-gray-100 pt-5">
      <button
        type="button"
        onClick={() =>
          updateStatus("CONFIRMED")
        }
        disabled={loading}
        className="
          rounded-lg
          bg-emerald-600
          px-5
          py-2.5
          font-medium
          text-white
          transition
          hover:bg-emerald-700
          disabled:cursor-not-allowed
          disabled:bg-gray-300
        "
      >
        {loading
          ? "Procesando..."
          : "Confirmar cita"}
      </button>

      <button
        type="button"
        onClick={() =>
          updateStatus("REJECTED")
        }
        disabled={loading}
        className="
          rounded-lg
          border
          border-red-300
          px-5
          py-2.5
          font-medium
          text-red-700
          transition
          hover:bg-red-50
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        Rechazar cita
      </button>
    </div>
  );
}