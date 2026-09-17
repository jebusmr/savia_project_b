"use client";

import { useEffect, useState } from "react";
import {
  BriefcaseBusiness,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

interface Experience {
  id: string;
  position: string;
  institution: string;
  startYear: string;
  endYear: string | null;
  current: boolean;
  description: string | null;
}

interface ExperienceManagerProps {
  specialistId: string;
}

export default function ExperienceManager({
  specialistId,
}: ExperienceManagerProps) {
  const [experience, setExperience] = useState<
    Experience[]
  >([]);

  const [position, setPosition] = useState("");
  const [institution, setInstitution] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadExperience() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/specialists/${specialistId}/experience`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible obtener la experiencia profesional."
        );
      }

      setExperience(result.data ?? []);
    } catch (error) {
      console.error(
        "Error obteniendo experiencia:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible obtener la experiencia profesional."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExperience();
  }, [specialistId]);

  function startEditing(item: Experience) {
    setEditingId(item.id);

    setPosition(item.position);
    setInstitution(item.institution);
    setStartYear(item.startYear);
    setEndYear(item.endYear ?? "");
    setCurrent(item.current);
    setDescription(item.description ?? "");

    setMessage("");
    setError("");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    setEditingId(null);

    setPosition("");
    setInstitution("");
    setStartYear("");
    setEndYear("");
    setCurrent(false);
    setDescription("");

    setMessage("");
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = editingId !== null;

      const response = await fetch(
        `/api/specialists/${specialistId}/experience`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEditing
              ? {
                  experienceId: editingId,
                  position,
                  institution,
                  startYear,
                  endYear: current ? null : endYear,
                  current,
                  description,
                }
              : {
                  position,
                  institution,
                  startYear,
                  endYear: current ? null : endYear,
                  current,
                  description,
                }
          ),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible guardar la experiencia profesional."
        );
      }

      if (isEditing) {
        setExperience((currentExperience) =>
          currentExperience.map((item) =>
            item.id === editingId
              ? result.data
              : item
          )
        );

        setMessage(
          "La experiencia profesional se actualizó correctamente."
        );
      } else {
        setExperience((currentExperience) => [
          ...currentExperience,
          result.data,
        ]);

        setMessage(
          "La experiencia profesional se agregó correctamente."
        );
      }

      setEditingId(null);

      setPosition("");
      setInstitution("");
      setStartYear("");
      setEndYear("");
      setCurrent(false);
      setDescription("");
    } catch (error) {
      console.error(
        "Error guardando experiencia:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar la experiencia profesional."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Experience) {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar "${item.position}" en "${item.institution}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(item.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/specialists/${specialistId}/experience`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experienceId: item.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible eliminar la experiencia profesional."
        );
      }

      setExperience((currentExperience) =>
        currentExperience.filter(
          (experienceItem) =>
            experienceItem.id !== item.id
        )
      );

      if (editingId === item.id) {
        cancelEditing();
      }

      setMessage(
        "La experiencia profesional se eliminó correctamente."
      );
    } catch (error) {
      console.error(
        "Error eliminando experiencia:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar la experiencia profesional."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="mt-10 border-t border-gray-100 pt-8">

      {/* Encabezado */}

      <div className="flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <BriefcaseBusiness className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#17365D]">
            Experiencia profesional
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Agrega los principales puestos, instituciones
            y experiencias que forman parte de tu trayectoria profesional.
          </p>
        </div>

      </div>

      {/* Experiencia existente */}

      <div className="mt-6 space-y-4">

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-600">
              Consultando experiencia profesional...
            </p>
          </div>
        ) : experience.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

            <p className="font-medium text-[#17365D]">
              Aún no has agregado experiencia profesional.
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Agrega tus principales puestos o actividades profesionales.
            </p>

          </div>
        ) : (
          experience.map((item) => (
            <article
              key={item.id}
              className={`rounded-xl border bg-white p-5 ${
                editingId === item.id
                  ? "border-emerald-300 ring-2 ring-emerald-50"
                  : "border-gray-200"
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <h3 className="font-semibold text-[#17365D]">
                    {item.position}
                  </h3>

                  <p className="mt-1 text-emerald-700">
                    {item.institution}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.startYear} –{" "}
                    {item.current
                      ? "Actualmente"
                      : item.endYear ?? ""}
                  </p>

                  {item.description && (
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {item.description}
                    </p>
                  )}

                </div>

                <div className="flex shrink-0 gap-2">

                  {/* Editar */}

                  <button
                    type="button"
                    onClick={() =>
                      startEditing(item)
                    }
                    disabled={
                      deletingId === item.id
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Pencil className="h-4 w-4" />
                    Editar
                  </button>

                  {/* Eliminar */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item)
                    }
                    disabled={
                      deletingId === item.id
                    }
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />

                    {deletingId === item.id
                      ? "Eliminando..."
                      : "Eliminar"}
                  </button>

                </div>

              </div>
            </article>
          ))
        )}

      </div>

      {/* Formulario */}

      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6"
      >

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-2">

            {editingId ? (
              <Pencil className="h-5 w-5 text-emerald-700" />
            ) : (
              <Plus className="h-5 w-5 text-emerald-700" />
            )}

            <h3 className="font-semibold text-[#17365D]">
              {editingId
                ? "Editar experiencia"
                : "Agregar experiencia"}
            </h3>

          </div>

          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
            >
              <X className="h-4 w-4" />
              Cancelar edición
            </button>
          )}

        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">

          {/* Puesto */}

          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              Puesto o cargo
            </label>

            <input
              id="position"
              type="text"
              value={position}
              onChange={(event) =>
                setPosition(event.target.value)
              }
              placeholder="Ej. Médico especialista"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Institución */}

          <div>
            <label
              htmlFor="institution"
              className="block text-sm font-medium text-gray-700"
            >
              Institución
            </label>

            <input
              id="institution"
              type="text"
              value={institution}
              onChange={(event) =>
                setInstitution(event.target.value)
              }
              placeholder="Ej. Hospital Regional"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Año inicio */}

          <div>
            <label
              htmlFor="startYear"
              className="block text-sm font-medium text-gray-700"
            >
              Año de inicio
            </label>

            <input
              id="startYear"
              type="text"
              value={startYear}
              onChange={(event) =>
                setStartYear(event.target.value)
              }
              placeholder="Ej. 2018"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Año término */}

          <div>
            <label
              htmlFor="endYear"
              className="block text-sm font-medium text-gray-700"
            >
              Año de término
            </label>

            <input
              id="endYear"
              type="text"
              value={endYear}
              onChange={(event) =>
                setEndYear(event.target.value)
              }
              placeholder="Ej. 2024"
              disabled={current}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100 disabled:text-gray-400"
            />
          </div>

        </div>

        {/* Actualmente */}

        <div className="mt-5">

          <label className="flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={current}
              onChange={(event) =>
                setCurrent(event.target.checked)
              }
              className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
            />

            <span className="text-sm font-medium text-gray-700">
              Actualmente trabajo en esta institución
            </span>

          </label>

        </div>

        {/* Descripción */}

        <div className="mt-5">

          <label
            htmlFor="experienceDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>

          <textarea
            id="experienceDescription"
            rows={4}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Describe brevemente tus funciones, responsabilidades o experiencia..."
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />

        </div>

        {/* Mensajes */}

        {message && (
          <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* Botones */}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17365D] px-5 py-3 font-semibold text-white transition hover:bg-[#102A49] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {editingId ? (
              <Pencil className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}

            {saving
              ? "Guardando..."
              : editingId
                ? "Guardar cambios"
                : "Agregar experiencia"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={cancelEditing}
              className="rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-white"
            >
              Cancelar
            </button>
          )}

        </div>

      </form>

    </section>
  );
}