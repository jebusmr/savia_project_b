"use client";

import { useEffect, useState } from "react";
import {
  Stethoscope,
  Plus,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string | null;
  price: string | null;
  durationMinutes: number | null;
}

interface SpecialistService {
  id: string;
  price: string | null;
  durationMinutes: number | null;
  status: string;
  service: Service;
}

interface CatalogService {
  id: string;
  name: string;
  description: string | null;
  durationMinutes: number | null;
}

interface ServiceManagerProps {
  specialistId: string;
}

export default function ServiceManager({
  specialistId,
}: ServiceManagerProps) {
  const [services, setServices] = useState<
    SpecialistService[]
  >([]);

  const [catalog, setCatalog] = useState<
    CatalogService[]
  >([]);

  const [serviceId, setServiceId] = useState("");
  const [price, setPrice] = useState("");
  const [durationMinutes, setDurationMinutes] =
    useState("");

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [loadingCatalog, setLoadingCatalog] =
    useState(true);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function loadServices() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/specialists/${specialistId}/services`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible obtener los servicios."
        );
      }

      setServices(result.data ?? []);
    } catch (error) {
      console.error(
        "Error obteniendo servicios:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible obtener los servicios."
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadCatalog() {
    try {
      setLoadingCatalog(true);

      /*
       * Por ahora consultamos el catálogo general
       * mediante esta ruta.
       *
       * Si tu proyecto ya tiene una ruta de servicios
       * generales, aquí la utilizaremos.
       */
      const response = await fetch(
        "/api/services"
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible obtener el catálogo de servicios."
        );
      }

      setCatalog(result.data ?? []);
    } catch (error) {
      console.error(
        "Error obteniendo catálogo:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible obtener el catálogo de servicios."
      );
    } finally {
      setLoadingCatalog(false);
    }
  }

  useEffect(() => {
    loadServices();
    loadCatalog();
  }, [specialistId]);

  function startEditing(item: SpecialistService) {
    setEditingId(item.id);

    setServiceId(item.service.id);
    setPrice(item.price ?? "");
    setDurationMinutes(
      item.durationMinutes?.toString() ?? ""
    );

    setMessage("");
    setError("");

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  }

  function cancelEditing() {
    setEditingId(null);

    setServiceId("");
    setPrice("");
    setDurationMinutes("");

    setMessage("");
    setError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!serviceId) {
      setError("Selecciona un servicio.");
      return;
    }

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const isEditing = editingId !== null;

      const response = await fetch(
        `/api/specialists/${specialistId}/services`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isEditing
              ? {
                  specialistServiceId: editingId,
                  price: price || null,
                  durationMinutes:
                    durationMinutes
                      ? Number(durationMinutes)
                      : null,
                }
              : {
                  serviceId,
                  price: price || null,
                  durationMinutes:
                    durationMinutes
                      ? Number(durationMinutes)
                      : null,
                }
          ),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible guardar el servicio."
        );
      }

      if (isEditing) {
        setServices((current) =>
          current.map((item) =>
            item.id === editingId
              ? result.data
              : item
          )
        );

        setMessage(
          "El servicio se actualizó correctamente."
        );
      } else {
        setServices((current) => [
          ...current,
          result.data,
        ]);

        setMessage(
          "El servicio se agregó correctamente."
        );
      }

      setEditingId(null);
      setServiceId("");
      setPrice("");
      setDurationMinutes("");
    } catch (error) {
      console.error(
        "Error guardando servicio:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible guardar el servicio."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    item: SpecialistService
  ) {
    const confirmed = window.confirm(
      `¿Estás seguro de que deseas retirar "${item.service.name}" de tu perfil?`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(item.id);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/specialists/${specialistId}/services`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            specialistServiceId: item.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible retirar el servicio."
        );
      }

      setServices((current) =>
        current.filter(
          (service) => service.id !== item.id
        )
      );

      if (editingId === item.id) {
        cancelEditing();
      }

      setMessage(
        "El servicio se retiró correctamente del perfil."
      );
    } catch (error) {
      console.error(
        "Error retirando servicio:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible retirar el servicio."
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
          <Stethoscope className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-[#17365D]">
            Servicios profesionales
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Selecciona los servicios que ofreces y define
            el precio y duración de cada uno.
          </p>
        </div>

      </div>

      {/* Servicios existentes */}

      <div className="mt-6 space-y-4">

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p className="text-sm text-gray-600">
              Consultando servicios...
            </p>
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6 text-center">

            <p className="font-medium text-[#17365D]">
              Aún no has agregado servicios.
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Selecciona los servicios que deseas ofrecer
              en tu perfil profesional.
            </p>

          </div>
        ) : (
          services.map((item) => (
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
                    {item.service.name}
                  </h3>

                  {item.service.description && (
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {item.service.description}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-3 text-sm">

                    {item.price && (
                      <span className="font-semibold text-emerald-700">
                        ${item.price} MXN
                      </span>
                    )}

                    {item.durationMinutes && (
                      <span className="text-gray-500">
                        {item.durationMinutes} minutos
                      </span>
                    )}

                  </div>

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
                      ? "Retirando..."
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
                ? "Editar servicio"
                : "Agregar servicio"}
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

        <div className="mt-5 grid gap-5 md:grid-cols-3">

          {/* Servicio */}

          <div className="md:col-span-3">

            <label
              htmlFor="serviceId"
              className="block text-sm font-medium text-gray-700"
            >
              Servicio SAVIA
            </label>

            <select
              id="serviceId"
              value={serviceId}
              onChange={(event) =>
                setServiceId(event.target.value)
              }
              disabled={
                editingId !== null ||
                loadingCatalog
              }
              required
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
            >
              <option value="">
                {loadingCatalog
                  ? "Cargando servicios..."
                  : "Selecciona un servicio"}
              </option>

              {catalog.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                >
                  {service.name}
                </option>
              ))}
            </select>

            {!loadingCatalog &&
              catalog.length === 0 && (
                <p className="mt-2 text-sm text-amber-700">
                  No hay servicios disponibles en el
                  catálogo SAVIA.
                </p>
              )}

          </div>

          {/* Precio */}

          <div>

            <label
              htmlFor="servicePrice"
              className="block text-sm font-medium text-gray-700"
            >
              Precio
            </label>

            <div className="relative mt-2">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                $
              </span>

              <input
                id="servicePrice"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(event) =>
                  setPrice(event.target.value)
                }
                placeholder="600.00"
                className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-8 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

            </div>

            <p className="mt-1 text-xs text-gray-500">
              Precio que cobrará este especialista.
            </p>

          </div>

          {/* Duración */}

          <div>

            <label
              htmlFor="serviceDuration"
              className="block text-sm font-medium text-gray-700"
            >
              Duración
            </label>

            <div className="relative mt-2">

              <input
                id="serviceDuration"
                type="number"
                min="1"
                value={durationMinutes}
                onChange={(event) =>
                  setDurationMinutes(
                    event.target.value
                  )
                }
                placeholder="45"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-20 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                minutos
              </span>

            </div>

            <p className="mt-1 text-xs text-gray-500">
              Duración de la consulta o servicio.
            </p>

          </div>

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
            disabled={saving || loadingCatalog}
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
                : "Agregar servicio"}
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