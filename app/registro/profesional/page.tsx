"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

interface Specialty {
  id: string;
  name: string;
}

export default function RegistroProfesionalPage() {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [specialtyId, setSpecialtyId] = useState("");
  const [professionalLicense, setProfessionalLicense] =
    useState("");
  const [specialtyLicense, setSpecialtyLicense] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------------------------
  // Cargar especialidades
  // --------------------------------------------------

  useEffect(() => {
    async function loadSpecialties() {
      try {
        const response = await fetch("/api/specialties");
        const result = await response.json();

        if (result.success) {
          setSpecialties(result.data);
        } else {
          setError(
            "No fue posible cargar las especialidades."
          );
        }
      } catch {
        setError(
          "No fue posible cargar las especialidades."
        );
      } finally {
        setLoadingSpecialties(false);
      }
    }

    loadSpecialties();
  }, []);

  // --------------------------------------------------
  // Enviar formulario
  // --------------------------------------------------

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setError(
        "La contraseña debe tener al menos 8 caracteres."
      );
      return;
    }

    if (!specialtyId) {
      setError("Selecciona una especialidad.");
      return;
    }

    if (!professionalLicense.trim()) {
      setError("La cédula profesional es obligatoria.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "/api/auth/register/professional",
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
            specialtyId,
            professionalLicense,
            specialtyLicense,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(
          result.error ||
            "No fue posible crear la cuenta profesional."
        );
        return;
      }

      setSuccess(
        "Tu cuenta profesional fue creada correctamente. Tu información será revisada por SAVIA antes de publicar tu perfil."
      );

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setSpecialtyId("");
      setProfessionalLicense("");
      setSpecialtyLicense("");
    } catch {
      setError(
        "No fue posible conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg">
          {/* Encabezado */}
          <div className="bg-[#17365D] px-8 py-10 text-white md:px-12">
            <Link href="/" className="inline-flex">
              <img
                src="/images/logo.jpeg"
                alt="SAVIA - Salud y desarrollo"
                className="h-14 w-auto object-contain"
              />
            </Link>

            <h1 className="mt-8 text-3xl font-bold md:text-4xl">
              Registro profesional
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-7 text-white/80">
              Forma parte de la red SAVIA. Crea tu cuenta
              profesional y proporciona la información
              necesaria para iniciar nuestro proceso de
              verificación.
            </p>
          </div>

          {/* Formulario */}
          <div className="px-6 py-10 md:px-12 md:py-14">
            <form
              onSubmit={handleSubmit}
              className="space-y-10"
            >
              {/* Datos personales */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#203564]">
                    1. Datos personales
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Utilizaremos estos datos para crear tu
                    cuenta profesional.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                      placeholder="Tus apellidos"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                      placeholder="Número telefónico"
                    />
                  </div>
                </div>
              </section>

              {/* Datos de acceso */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#203564]">
                    2. Datos de acceso
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Estos datos te permitirán ingresar
                    posteriormente a tu cuenta profesional.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-700"
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
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                      placeholder="Mínimo 8 caracteres"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Confirmar contraseña
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(
                          event.target.value
                        )
                      }
                      required
                      minLength={8}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                      placeholder="Repite tu contraseña"
                    />
                  </div>
                </div>
              </section>

              {/* Datos profesionales */}
              <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[#203564]">
                    3. Información profesional
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Esta información será utilizada para
                    iniciar el proceso de verificación de
                    SAVIA.
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="specialty"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Especialidad
                    </label>

                    <select
                      id="specialty"
                      value={specialtyId}
                      onChange={(event) =>
                        setSpecialtyId(event.target.value)
                      }
                      required
                      disabled={loadingSpecialties}
                      className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10 disabled:bg-gray-100"
                    >
                      <option value="">
                        {loadingSpecialties
                          ? "Cargando especialidades..."
                          : "Selecciona una especialidad"}
                      </option>

                      {specialties.map((specialty) => (
                        <option
                          key={specialty.id}
                          value={specialty.id}
                        >
                          {specialty.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label
                        htmlFor="professionalLicense"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Cédula profesional
                      </label>
                      <input
                        id="professionalLicense"
                        type="text"
                        value={professionalLicense}
                        onChange={(event) =>
                          setProfessionalLicense(
                            event.target.value
                          )
                        }
                        required
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                        placeholder="Número de cédula"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="specialtyLicense"
                        className="mb-2 block text-sm font-medium text-gray-700"
                      >
                        Cédula de especialidad
                        <span className="ml-1 font-normal text-gray-400">
                          (opcional)
                        </span>
                      </label>
                      <input
                        id="specialtyLicense"
                        type="text"
                        value={specialtyLicense}
                        onChange={(event) =>
                          setSpecialtyLicense(
                            event.target.value
                          )
                        }
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#203564] focus:ring-2 focus:ring-[#203564]/10"
                        placeholder="Si aplica"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Aviso */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <h3 className="font-semibold text-[#203564]">
                  Verificación SAVIA
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Crear esta cuenta no significa que el
                  perfil se publique inmediatamente. SAVIA
                  revisará la información profesional antes
                  de incorporar el perfil al directorio
                  público.
                </p>
              </div>

              {/* Mensajes */}
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  {success}
                </div>
              )}

              {/* Botón */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/registro"
                  className="text-center font-medium text-[#203564] hover:underline"
                >
                  ← Volver a elegir tipo de cuenta
                </Link>

                <button
                  type="submit"
                  disabled={loading || loadingSpecialties}
                  className="rounded-xl bg-[#203564] px-8 py-4 font-semibold text-white transition hover:bg-[#16294f] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Creando cuenta..."
                    : "Crear cuenta profesional"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}