"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function RegistroPacientePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Las contraseñas no coinciden."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible crear la cuenta."
        );
      }

      setSuccess(
        "Tu cuenta fue creada correctamente. Ya puedes iniciar sesión."
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Error en registro:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible crear la cuenta."
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
                  Tu salud,
                  <br />
                  más cerca.
                </h1>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-100">
                  Crea tu cuenta para encontrar
                  profesionales de confianza y
                  gestionar tus citas de manera
                  sencilla.
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

            {/* Logo móvil */}

            <div className="mb-6 flex items-center md:hidden">
              <Link href="/">
                <img
                  src="/images/logo.jpeg"
                  alt="SAVIA - Salud y desarrollo"
                  className="h-14 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                Crear cuenta
              </h2>

              <p className="mt-2 text-gray-600">
                Regístrate como paciente para
                comenzar a utilizar SAVIA.
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

              {/* Nombre y apellidos */}

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nombre
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                    required
                    autoComplete="given-name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#17365D] focus:ring-2 focus:ring-blue-100"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Apellidos
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                    required
                    autoComplete="family-name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#17365D] focus:ring-2 focus:ring-blue-100"
                    placeholder="Tus apellidos"
                  />
                </div>

              </div>

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

              {/* Teléfono */}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Teléfono
                </label>

                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(event) =>
                    setPhone(event.target.value)
                  }
                  required
                  autoComplete="tel"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#17365D] focus:ring-2 focus:ring-blue-100"
                  placeholder="352 123 4567"
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
                    setPassword(event.target.value)
                  }
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#17365D] focus:ring-2 focus:ring-blue-100"
                  placeholder="Mínimo 8 caracteres"
                />
              </div>

              {/* Confirmar contraseña */}

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirmar contraseña
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#17365D] focus:ring-2 focus:ring-blue-100"
                  placeholder="Repite tu contraseña"
                />
              </div>

              {/* Botón */}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#17365D] px-5 py-3.5 font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {loading
                  ? "Creando cuenta..."
                  : "Crear mi cuenta"}
              </button>

            </form>

            {/* Login */}

            <div className="mt-8 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}

              <Link
                href="/login"
                className="font-semibold text-[#17365D] hover:text-[#102A49]"
              >
                Iniciar sesión
              </Link>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/registro"
                className="font-medium text-[#203564] hover:underline"
              >
                ← Volver a elegir tipo de cuenta
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}