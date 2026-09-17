"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email || !password) {
      setError(
        "El correo electrónico y la contraseña son obligatorios."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible iniciar sesión."
        );
      }

      setSuccess(
        "Inicio de sesión correcto."
      );

      console.log(
        "Usuario autenticado:",
        result.data
      );
      setTimeout(() => {
        router.push("/mi-cuenta");
        router.refresh();
      }, 500);
    } catch (error) {
      console.error(
        "Error en inicio de sesión:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible iniciar sesión."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">

          {/* Panel izquierdo */}

          <div className="hidden bg-[#17365D] p-10 text-white md:flex md:flex-col md:justify-between">

            <div>
              <Link
                href="/"
                className="inline-flex items-center"
              >
                <img
                  src="/images/logo.jpeg"
                  alt="SAVIA - Salud y desarrollo"
                  className="h-16 w-auto object-contain"
                />
              </Link>

              <div className="mt-16">
                <h1 className="text-4xl font-bold leading-tight">
                  Bienvenido
                  <br />
                  a SAVIA.
                </h1>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-100">
                  Accede a tu cuenta para consultar
                  tus citas y continuar utilizando
                  los servicios de SAVIA.
                </p>
              </div>
            </div>

            <p className="text-sm text-[#C49A5A]">
              SAVIA · Salud y desarrollo para
              nuestra comunidad.
            </p>
          </div>

          {/* Formulario */}

          <div className="p-8 md:p-10">

            <div className="mb-8">

              <div className="mb-6 flex items-center md:hidden">
                <Link href="/">
                  <img
                    src="/images/logo.jpeg"
                    alt="SAVIA - Salud y desarrollo"
                    className="h-14 w-auto object-contain"
                  />
                </Link>
              </div>

              <h2 className="text-3xl font-bold text-slate-900">
                Iniciar sesión
              </h2>

              <p className="mt-2 text-gray-600">
                Ingresa a tu cuenta de paciente.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Éxito */}

            {success && (
              <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Correo */}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#17365D] focus:ring-2 focus:ring-blue-100"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              {/* Contraseña */}

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#17365D] focus:ring-2 focus:ring-blue-100"
                  placeholder="Tu contraseña"
                />
              </div>

              {/* Recuperar contraseña */}

              <div className="text-right">
                <button
                  type="button"
                  className="text-sm font-medium text-[#17365D] hover:text-[#102A49]"
                  onClick={() => {
                    setError("");
                    setSuccess(
                      "La recuperación de contraseña estará disponible próximamente."
                    );
                  }}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              {/* Botón */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#17365D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {loading
                  ? "Ingresando..."
                  : "Iniciar sesión"}
              </button>

            </form>

            {/* Registro */}

            <div className="mt-8 text-center text-sm text-gray-600">
              ¿Aún no tienes una cuenta?{" "}

              <Link
                href="/registro"
                className="font-semibold text-[#17365D] hover:text-[#102A49]"
              >
                Crear cuenta
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}