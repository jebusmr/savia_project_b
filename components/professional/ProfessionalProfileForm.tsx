
"use client";

import { useState } from "react";

interface ProfileData {
  biography: string;
  yearsExperience: number | null;
  certifications: string;
  awards: string;
  languages: string;
  approach: string;
  philosophy: string;
}

interface ProfessionalProfileFormProps {
  specialistId: string;
  firstName: string;
  lastName: string;
  title: string;
  profile: ProfileData | null;
}

export default function ProfessionalProfileForm({
  specialistId,
  firstName,
  lastName,
  title,
  profile,
}: ProfessionalProfileFormProps) {
  const [professionalFirstName, setProfessionalFirstName] =
    useState(firstName ?? "");

  const [professionalLastName, setProfessionalLastName] =
    useState(lastName ?? "");

  const [professionalTitle, setProfessionalTitle] =
    useState(title ?? "");

  const [biography, setBiography] = useState(
    profile?.biography ?? ""
  );

  const [yearsExperience, setYearsExperience] = useState(
    profile?.yearsExperience?.toString() ?? ""
  );

  const [certifications, setCertifications] = useState(
    profile?.certifications ?? ""
  );

  const [awards, setAwards] = useState(
    profile?.awards ?? ""
  );

  const [languages, setLanguages] = useState(
    profile?.languages ?? ""
  );

  const [approach, setApproach] = useState(
    profile?.approach ?? ""
  );

  const [philosophy, setPhilosophy] = useState(
    profile?.philosophy ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    if (
      !professionalFirstName.trim() ||
      !professionalLastName.trim()
    ) {
      setError(
        "El nombre y los apellidos son obligatorios."
      );
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/specialists/${specialistId}/profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: professionalFirstName,
            lastName: professionalLastName,
            title: professionalTitle,
            biography,
            yearsExperience:
              yearsExperience === ""
                ? null
                : Number(yearsExperience),
            certifications,
            awards,
            languages,
            approach,
            philosophy,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible guardar el perfil."
        );
      }

      setMessage(
        "Tu perfil profesional se guardó correctamente."
      );
    } catch (error) {
      console.error(
        "Error guardando perfil:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar el perfil."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Información básica */}

      <section className="mt-8 border-t border-gray-100 pt-8">
        <h2 className="text-xl font-semibold text-[#17365D]">
          Información básica
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Estos datos corresponden a tu información
          profesional principal.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {/* Nombre */}

          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre
            </label>

            <input
              id="firstName"
              type="text"
              value={professionalFirstName}
              onChange={(event) =>
                setProfessionalFirstName(
                  event.target.value
                )
              }
              required
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Apellidos */}

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Apellidos
            </label>

            <input
              id="lastName"
              type="text"
              value={professionalLastName}
              onChange={(event) =>
                setProfessionalLastName(
                  event.target.value
                )
              }
              required
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Título profesional */}

          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Título profesional
            </label>

            <input
              id="title"
              type="text"
              value={professionalTitle}
              onChange={(event) =>
                setProfessionalTitle(
                  event.target.value
                )
              }
              placeholder="Ej. Médico especialista en Cardiología"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Idiomas */}

          <div>
            <label
              htmlFor="languages"
              className="block text-sm font-medium text-gray-700"
            >
              Idiomas
            </label>

            <input
              id="languages"
              type="text"
              value={languages}
              onChange={(event) =>
                setLanguages(event.target.value)
              }
              placeholder="Ej. Español, Inglés"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>
      </section>

      {/* Presentación profesional */}

      <section className="mt-10 border-t border-gray-100 pt-8">
        <h2 className="text-xl font-semibold text-[#17365D]">
          Presentación profesional
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Esta información ayudará a los usuarios a
          conocer tu experiencia y trayectoria.
        </p>

        <div className="mt-6 space-y-5">
          {/* Biografía */}

          <div>
            <label
              htmlFor="biography"
              className="block text-sm font-medium text-gray-700"
            >
              Biografía profesional
            </label>

            <textarea
              id="biography"
              rows={5}
              value={biography}
              onChange={(event) =>
                setBiography(event.target.value)
              }
              placeholder="Cuéntanos brevemente sobre tu trayectoria profesional..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Años de experiencia */}

          <div>
            <label
              htmlFor="yearsExperience"
              className="block text-sm font-medium text-gray-700"
            >
              Años de experiencia
            </label>

            <input
              id="yearsExperience"
              type="number"
              min="0"
              value={yearsExperience}
              onChange={(event) =>
                setYearsExperience(
                  event.target.value
                )
              }
              placeholder="Ej. 10"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Certificaciones */}

          <div>
            <label
              htmlFor="certifications"
              className="block text-sm font-medium text-gray-700"
            >
              Certificaciones
            </label>

            <textarea
              id="certifications"
              rows={3}
              value={certifications}
              onChange={(event) =>
                setCertifications(
                  event.target.value
                )
              }
              placeholder="Certificaciones, diplomados u otras acreditaciones..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Reconocimientos */}

          <div>
            <label
              htmlFor="awards"
              className="block text-sm font-medium text-gray-700"
            >
              Reconocimientos y premios
            </label>

            <textarea
              id="awards"
              rows={3}
              value={awards}
              onChange={(event) =>
                setAwards(event.target.value)
              }
              placeholder="Reconocimientos, premios o distinciones..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Enfoque profesional */}

          <div>
            <label
              htmlFor="approach"
              className="block text-sm font-medium text-gray-700"
            >
              Enfoque profesional
            </label>

            <textarea
              id="approach"
              rows={4}
              value={approach}
              onChange={(event) =>
                setApproach(event.target.value)
              }
              placeholder="Describe tu enfoque de atención..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Filosofía profesional */}

          <div>
            <label
              htmlFor="philosophy"
              className="block text-sm font-medium text-gray-700"
            >
              Filosofía profesional
            </label>

            <textarea
              id="philosophy"
              rows={4}
              value={philosophy}
              onChange={(event) =>
                setPhilosophy(event.target.value)
              }
              placeholder="Comparte tu filosofía o principios de trabajo..."
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>
      </section>

      {/* Mensajes */}

      {message && (
        <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Acciones */}

      <section className="mt-10 flex flex-col gap-3 border-t border-gray-100 pt-8 sm:flex-row">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#17365D] px-6 py-3 font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving
            ? "Guardando..."
            : "Guardar cambios"}
        </button>

        <a
          href="/mi-cuenta"
          className="rounded-xl border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancelar
        </a>
      </section>
    </form>
  );
}