"use client";

import { useEffect, useState } from "react";
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string | null;
  description: string | null;
}

interface EducationManagerProps {
  specialistId: string;
}

export default function EducationManager({
  specialistId,
}: EducationManagerProps) {
  const [education, setEducation] = useState<Education[]>([]);

  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadEducation() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/specialists/${specialistId}/education`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible obtener la formación académica."
        );
      }

      setEducation(result.data ?? []);
    } catch (error) {
      console.error(
        "Error obteniendo formación:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible obtener la formación académica."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEducation();
  }, [specialistId]);

  function startEditing(item: Education) {
    setEditingId(item.id);

    setDegree(item.degree);
    setInstitution(item.institution);
    setYear(item.year ?? "");
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

    setDegree("");
    setInstitution("");
    setYear("");
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
        `/api/specialists/${specialistId}/education`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEditing
              ? {
                  educationId: editingId,
                  degree,
                  institution,
                  year,
                  description,
                }
              : {
                  degree,
                  institution,
                  year,
                  description,
                }
          ),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible guardar la formación académica."
        );
      }

      if (isEditing) {
        setEducation((current) =>
          current.map((item) =>
            item.id === editingId
              ? result.data
              : item
          )
        );

        setMessage(
          "La formación académica se actualizó correctamente."
        );
      } else {
        setEducation((current) => [
          ...current,
          result.data,
        ]);

        setMessage(
          "La formación académica se agregó correctamente."
        );
      }

      setEditingId(null);

      setDegree("");
      setInstitution("");
      setYear("");
      setDescription("");
    } catch (error) {
      console.error(
        "Error guardando formación:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar la formación académica."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    item: Education
  ) {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar "${item.degree}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(item.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/specialists/${specialistId}/education`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            educationId: item.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible eliminar la formación académica."
        );
      }

      setEducation((current) =>
        current.filter(
          (educationItem) =>
            educationItem.id !== item.id
        )
      );

      if (editingId === item.id) {
        cancelEditing();
      }

      setMessage(
        "La formación académica se eliminó correctamente."
      );
    } catch (error) {
      console.error(
        "Error eliminando formación:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar la formación académica."
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <section className="mt-10 border-t border-gray-100 pt-8">

      {/* Encabezado */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

        <div>
          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <GraduationCap className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#17365D]">
                Formación académica
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Agrega tus estudios universitarios y de
                posgrado que respaldan tu preparación profesional.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Formación existente */}

      <div className="mt-6 space-y-4">

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-600">
              Consultando formación académica...
            </p>
          </div>
        ) : education.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="font-medium text-[#17365D]">
              Aún no has agregado formación académica.
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Agrega tu licenciatura, especialidad,
              maestría, doctorado u otros estudios relevantes.
            </p>
          </div>
        ) : (
          education.map((item) => (
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
                    {item.degree}
                  </h3>

                  <p className="mt-1 text-emerald-700">
                    {item.institution}
                  </p>

                  {item.year && (
                    <p className="mt-1 text-sm text-gray-500">
                      {item.year}
                    </p>
                  )}

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
                ? "Editar formación"
                : "Agregar formación"}
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

          {/* Grado */}

          <div>
            <label
              htmlFor="degree"
              className="block text-sm font-medium text-gray-700"
            >
              Grado o estudio
            </label>

            <input
              id="degree"
              type="text"
              value={degree}
              onChange={(event) =>
                setDegree(event.target.value)
              }
              placeholder="Ej. Licenciatura en Medicina"
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
              placeholder="Ej. Universidad de Guadalajara"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Año */}

          <div>
            <label
              htmlFor="educationYear"
              className="block text-sm font-medium text-gray-700"
            >
              Año
            </label>

            <input
              id="educationYear"
              type="text"
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
              placeholder="Ej. 2010"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

        </div>

        {/* Descripción */}

        <div className="mt-5">

          <label
            htmlFor="educationDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>

          <textarea
            id="educationDescription"
            rows={3}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Información adicional sobre estos estudios..."
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
                : "Agregar formación"}
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