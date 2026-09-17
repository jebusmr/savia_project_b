"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/logout",
        {
          method: "POST",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible cerrar la sesión."
        );
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error(
        "Error cerrando sesión:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "No fue posible cerrar la sesión."
      );

      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="
        inline-flex
        rounded-xl
        border
        border-red-200
        px-5
        py-3
        font-semibold
        text-red-700
        transition
        hover:bg-red-50
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {loading
        ? "Cerrando sesión..."
        : "Cerrar sesión"}
    </button>
  );
}