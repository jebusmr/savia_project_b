"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CancelAppointmentButtonProps {
  appointmentId: string;
}

export default function CancelAppointmentButton({
  appointmentId,
}: CancelAppointmentButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "¿Estás seguro de que deseas cancelar esta cita?"
    );

    if (!confirmed) {
      return;
    }

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
            status: "CANCELLED",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible cancelar la cita."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(
        "Error cancelando cita:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "No fue posible cancelar la cita."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCancel}
      disabled={loading}
      className="
        rounded-xl
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
      {loading
        ? "Cancelando..."
        : "Cancelar cita"}
    </button>
  );
}