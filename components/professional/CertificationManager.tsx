"use client";

import { useEffect, useState } from "react";
import {
  Award,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

interface Certification {
  id: string;
  name: string;
  organization: string;
  year: string;
  description: string | null;
}

interface CertificationManagerProps {
  specialistId: string;
}

export default function CertificationManager({
  specialistId,
}: CertificationManagerProps) {
  const [certifications, setCertifications] = useState<
    Certification[]
  >([]);

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

  async function loadCertifications() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/specialists/${specialistId}/certifications`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible obtener las certificaciones."
        );
      }

      setCertifications(result.data ?? []);
    } catch (error) {
      console.error(
        "Error obteniendo certificaciones:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible obtener las certificaciones."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCertifications();
  }, [specialistId]);

  function startEditing(item: Certification) {
    setEditingId(item.id);

    setName(item.name);
    setOrganization(item.organization);
    setYear(item.year);
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
        `/api/specialists/${specialistId}/certifications`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEditing
              ? {
                  certificationId: editingId,
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
            "No fue posible guardar la certificación."
        );
      }

      if (isEditing) {
        setCertifications((current) =>
          current.map((item) =>
            item.id === editingId
              ? result.data
              : item
          )
        );

        setMessage(
          "La certificación se actualizó correctamente."
        );
      } else {
        setCertifications((current) => [
          ...current,
          result.data,
        ]);

        setMessage(
          "La certificación se agregó correctamente."
        );
      }

      setEditingId(null);

      setName("");
      setOrganization("");
      setYear("");
      setDescription("");
    } catch (error) {
      console.error(
        "Error guardando certificación:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar la certificación."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: Certification) {
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
        `/api/specialists/${specialistId}/certifications`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            certificationId: item.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible eliminar la certificación."
        );
      }

      setCertifications((current) =>
        current.filter(
          (certification) =>
            certification.id !== item.id
        )
      );

      if (editingId === item.id) {
        cancelEditing();
      }

      setMessage(
        "La certificación se eliminó correctamente."
      );
    } catch (error) {
      console.error(
        "Error eliminando certificación:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar la certificación."
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
          <Award className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#17365D]">
            Certificaciones profesionales
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Agrega certificaciones, acreditaciones y
            cursos que respalden tu preparación profesional.
          </p>
        </div>

      </div>

      {/* Certificaciones existentes */}

      <div className="mt-6 space-y-4">

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-600">
              Consultando certificaciones...
            </p>
          </div>
        ) : certifications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

            <p className="font-medium text-[#17365D]">
              Aún no has agregado certificaciones.
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Agrega las certificaciones que consideres
              relevantes para tu perfil profesional.
            </p>

          </div>
        ) : (
          certifications.map((item) => (
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

                  <p className="mt-1 text-emerald-700">
                    {item.organization}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    {item.year}
                  </p>

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
                ? "Editar certificación"
                : "Agregar certificación"}
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

          <div>
            <label
              htmlFor="certificationName"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de la certificación
            </label>

            <input
              id="certificationName"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Ej. Certificación en Cardiología"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Organización */}

          <div>
            <label
              htmlFor="certificationOrganization"
              className="block text-sm font-medium text-gray-700"
            >
              Organización o institución
            </label>

            <input
              id="certificationOrganization"
              type="text"
              value={organization}
              onChange={(event) =>
                setOrganization(event.target.value)
              }
              placeholder="Ej. Consejo Mexicano de Cardiología"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

          {/* Año */}

          <div>
            <label
              htmlFor="certificationYear"
              className="block text-sm font-medium text-gray-700"
            >
              Año
            </label>

            <input
              id="certificationYear"
              type="text"
              value={year}
              onChange={(event) =>
                setYear(event.target.value)
              }
              placeholder="Ej. 2025"
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>

        </div>

        {/* Descripción */}

        <div className="mt-5">

          <label
            htmlFor="certificationDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>

          <textarea
            id="certificationDescription"
            rows={4}
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
            placeholder="Describe brevemente la certificación o los conocimientos que acredita..."
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
                : "Agregar certificación"}
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