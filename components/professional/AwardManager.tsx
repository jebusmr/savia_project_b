"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

interface Award {
  id: string;
  name: string;
  organization: string | null;
  year: string | null;
  description: string | null;
}

interface AwardManagerProps {
  specialistId: string;
}

export default function AwardManager({
  specialistId,
}: AwardManagerProps) {
  const [awards, setAwards] = useState<Award[]>([]);

  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [year, setYear] = useState("");
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

  async function loadAwards() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/specialists/${specialistId}/awards`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible obtener los reconocimientos."
        );
      }

      setAwards(result.data ?? []);
    } catch (error) {
      console.error(
        "Error obteniendo reconocimientos:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible obtener los reconocimientos."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAwards();
  }, [specialistId]);

  function startEditing(item: Award) {
    setEditingId(item.id);

    setName(item.name);
    setOrganization(item.organization ?? "");
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

    setName("");
    setOrganization("");
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
        `/api/specialists/${specialistId}/awards`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEditing
              ? {
                  awardId: editingId,
                  name,
                  organization,
                  year,
                  description,
                }
              : {
                  name,
                  organization,
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
            "No fue posible guardar el reconocimiento."
        );
      }

      if (isEditing) {
        setAwards((current) =>
          current.map((item) =>
            item.id === editingId
              ? result.data
              : item
          )
        );

        setMessage(
          "El reconocimiento se actualizó correctamente."
        );
      } else {
        setAwards((current) => [
          ...current,
          result.data,
        ]);

        setMessage(
          "El reconocimiento se agregó correctamente."
        );
      }

      setEditingId(null);

      setName("");
      setOrganization("");
      setYear("");
      setDescription("");
    } catch (error) {
      console.error(
        "Error guardando reconocimiento:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar el reconocimiento."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Award) {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas eliminar "${item.name}"?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(item.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/specialists/${specialistId}/awards`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            awardId: item.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible eliminar el reconocimiento."
        );
      }

      setAwards((current) =>
        current.filter(
          (award) => award.id !== item.id
        )
      );

      if (editingId === item.id) {
        cancelEditing();
      }

      setMessage(
        "El reconocimiento se eliminó correctamente."
      );
    } catch (error) {
      console.error(
        "Error eliminando reconocimiento:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar el reconocimiento."
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
          <Trophy className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#17365D]">
            Reconocimientos y premios
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Agrega premios, reconocimientos y distinciones
            que formen parte de tu trayectoria profesional.
          </p>
        </div>

      </div>

      {/* Reconocimientos existentes */}

      <div className="mt-6 space-y-4">

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-600">
              Consultando reconocimientos...
            </p>
          </div>
        ) : awards.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

            <p className="font-medium text-[#17365D]">
              Aún no has agregado reconocimientos.
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Agrega premios, distinciones o reconocimientos
              relevantes para tu trayectoria.
            </p>

          </div>
        ) : (
          awards.map((item) => (
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
                    {item.name}
                  </h3>

                  {item.organization && (
                    <p className="mt-1 text-emerald-700">
                      {item.organization}
                    </p>
                  )}

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
                ? "Editar reconocimiento"
                : "Agregar reconocimiento"}
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

          {/* Nombre */}

          <div className="md:col-span-2">
            <label
              htmlFor="awardName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre del reconocimiento
            </label>

            <input
              id="awardName"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Ej. Premio Estatal a la Trayectoria Profesional"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Organización */}

          <div>
            <label
              htmlFor="awardOrganization"
              className="block text-sm font-medium text-gray-700"
            >
              Organización o institución
            </label>

            <input
              id="awardOrganization"
              type="text"
              value={organization}
              onChange={(event) =>
                setOrganization(event.target.value)
              }
              placeholder="Ej. Gobierno del Estado"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Año */}

          <div>
            <label
              htmlFor="awardYear"
              className="block text-sm font-medium text-gray-700"
            >
              Año
            </label>

            <input
              id="awardYear"
              type="text"
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
              placeholder="Ej. 2025"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

        </div>

        {/* Descripción */}

        <div className="mt-5">

          <label
            htmlFor="awardDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>

          <textarea
            id="awardDescription"
            rows={4}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Describe brevemente el reconocimiento..."
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
                : "Agregar reconocimiento"}
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