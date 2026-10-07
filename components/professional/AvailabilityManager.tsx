
"use client";

import { useEffect, useState } from "react";

type Availability = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  modality: string;
  status: string;
};

type Props = {
  specialistId: string;
};

const daysOfWeek = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
];

export default function AvailabilityManager({
  specialistId,
}: Props) {
  const [availability, setAvailability] = useState<
    Availability[]
  >([]);

  const [dayOfWeek, setDayOfWeek] = useState("1");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("14:00");
  const [modality, setModality] = useState("");

  const [editingId, setEditingId] = useState<string | null>(
    null
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const apiUrl = `/api/specialists/${specialistId}/availability`;

  async function loadAvailability() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(apiUrl);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "No se pudo cargar la disponibilidad."
        );
      }

      setAvailability(
        Array.isArray(data.data) ? data.data : []
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al cargar la disponibilidad."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAvailability();
  }, [specialistId]);

  function resetForm() {
    setDayOfWeek("1");
    setStartTime("09:00");
    setEndTime("14:00");
    setModality("");
    setEditingId(null);
  }

  function startEditing(item: Availability) {
    setEditingId(item.id);
    setDayOfWeek(String(item.dayOfWeek));
    setStartTime(item.startTime);
    setEndTime(item.endTime);
    setModality(item.modality);
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

    const body = {
      dayOfWeek: Number(dayOfWeek),
      startTime,
      endTime,
      modality: modality.trim(),
    };

    try {
      const response = await fetch(apiUrl, {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editingId
            ? { availabilityId: editingId, ...body }
            : body
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "No se pudo guardar el horario."
        );
      }

      setMessage(
        editingId
          ? "Horario actualizado correctamente."
          : "Horario agregado correctamente."
      );

      resetForm();
      await loadAvailability();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al guardar el horario."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "¿Deseas desactivar este horario?"
    );

    if (!confirmed) return;

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `${apiUrl}?availabilityId=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "No se pudo desactivar el horario."
        );
      }

      setMessage("Horario desactivado correctamente.");
      await loadAvailability();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al desactivar el horario."
      );
    }
  }

  function getDayName(day: number) {
    return (
      daysOfWeek.find((item) => item.value === day)?.label ||
      "Día desconocido"
    );
  }

  return (
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Mi disponibilidad
        </h2>

        <p className="mt-1 text-sm text-slate-600">
          Administra los días y horarios en los que puedes
          atender pacientes.
        </p>
      </div>

      {message && (
        <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-xl bg-slate-50 p-4"
      >
        <h3 className="mb-4 font-medium text-slate-900">
          {editingId ? "Editar horario" : "Agregar horario"}
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Día de la semana
            </label>

            <select
              value={dayOfWeek}
              onChange={(event) =>
                setDayOfWeek(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              required
            >
              {daysOfWeek.map((day) => (
                <option
                  key={day.value}
                  value={day.value}
                >
                  {day.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Modalidad
            </label>

            <input
              type="text"
              value={modality}
              onChange={(event) =>
                setModality(event.target.value)
              }
              placeholder="Ej. PRESENCIAL u ONLINE"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Hora de inicio
            </label>

            <input
              type="time"
              value={startTime}
              onChange={(event) =>
                setStartTime(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Hora de finalización
            </label>

            <input
              type="time"
              value={endTime}
              onChange={(event) =>
                setEndTime(event.target.value)
              }
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
              required
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving
              ? "Guardando..."
              : editingId
                ? "Actualizar horario"
                : "Agregar horario"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div>
        <h3 className="mb-4 font-medium text-slate-900">
          Horarios registrados
        </h3>

        {loading ? (
          <p className="text-sm text-slate-500">
            Cargando horarios...
          </p>
        ) : availability.length === 0 ? (
          <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
            Todavía no tienes horarios registrados.
          </p>
        ) : (
          <div className="space-y-3">
            {availability.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-3 rounded-xl border border-slate-200 p-4 md:flex-row md:items-center"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {getDayName(item.dayOfWeek)}
                  </p>

                  <p className="text-sm text-slate-600">
                    {item.startTime} - {item.endTime}
                  </p>

                  <p className="text-sm text-slate-500">
                    Modalidad: {item.modality}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEditing(item)}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                  >
                    Desactivar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}