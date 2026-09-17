"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Target,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Specialty {
  id: string;
  name: string;
  slug: string;
}

interface AttentionArea {
  id: string;
  specialtyId: string;
  name: string;
  slug: string;
  description?: string | null;
  specialty?: Specialty;
}

interface SpecialistAttentionArea {
  id: string;
  specialistId: string;
  attentionAreaId: string;
  attentionarea: AttentionArea;
}

interface AttentionAreaManagerProps {
  specialistId: string;
  specialtyId?: string;
}

export default function AttentionAreaManager({
  specialistId,
  specialtyId,
}: AttentionAreaManagerProps) {
  const [areas, setAreas] = useState<AttentionArea[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<
    SpecialistAttentionArea[]
  >([]);

  const [selectedAreaId, setSelectedAreaId] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [loadingAreas, setLoadingAreas] =
    useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    loadSelectedAreas();
  }, [specialistId]);

  useEffect(() => {
    if (specialtyId) {
      loadAvailableAreas();
    }
  }, [specialtyId]);

  async function loadSelectedAreas() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `/api/specialists/${specialistId}/attention-areas`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible cargar las áreas de atención."
        );
      }

      setSelectedAreas(result.data);
    } catch (error) {
      console.error(
        "Error cargando áreas seleccionadas:",
        error
      );

      setError(
        "No fue posible cargar las áreas de atención."
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadAvailableAreas() {
    if (!specialtyId) return;

    try {
      setLoadingAreas(true);

      const response = await fetch(
        `/api/specialties/${specialtyId}/attention-areas`
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible cargar las áreas disponibles."
        );
      }

      setAreas(result.data);
    } catch (error) {
      console.error(
        "Error cargando áreas disponibles:",
        error
      );
    } finally {
      setLoadingAreas(false);
    }
  }

  async function handleAddArea() {
    if (!selectedAreaId) return;

    try {
      setSaving(true);
      setError(null);

      const response = await fetch(
        `/api/specialists/${specialistId}/attention-areas`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            attentionAreaId: selectedAreaId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible agregar el área de atención."
        );
      }

      setSelectedAreaId("");

      await loadSelectedAreas();
    } catch (error) {
      console.error(
        "Error agregando área de atención:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible agregar el área de atención."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteArea(
    attentionAreaId: string
  ) {
    const confirmed = window.confirm(
      "¿Deseas eliminar esta área de atención del perfil?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/specialists/${specialistId}/attention-areas/${attentionAreaId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            "No fue posible eliminar el área de atención."
        );
      }

      await loadSelectedAreas();
    } catch (error) {
      console.error(
        "Error eliminando área de atención:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar el área de atención."
      );
    }
  }

  const availableAreas = areas.filter(
    (area) =>
      !selectedAreas.some(
        (selected) =>
          selected.attentionAreaId === area.id
      )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
            <Target className="h-5 w-5 text-emerald-600" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Áreas de atención
            </h2>

            <p className="text-sm text-gray-500">
              Selecciona los problemas, condiciones o áreas
              en las que brindas atención.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {!specialtyId ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
          Primero es necesario que el profesional tenga
          una especialidad asignada.
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <select
              value={selectedAreaId}
              onChange={(event) =>
                setSelectedAreaId(event.target.value)
              }
              disabled={loadingAreas || saving}
              className="h-11 flex-1 rounded-xl border border-gray-300 bg-white px-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
            >
              <option value="">
                {loadingAreas
                  ? "Cargando áreas disponibles..."
                  : "Selecciona un área de atención"}
              </option>

              {availableAreas.map((area) => (
                <option
                  key={area.id}
                  value={area.id}
                >
                  {area.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleAddArea}
              disabled={
                !selectedAreaId ||
                saving ||
                loadingAreas
              }
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}

              Agregar
            </button>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-700">
              Áreas que atiendes
            </h3>

            {selectedAreas.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
                <Target className="mx-auto mb-3 h-7 w-7 text-gray-400" />

                <p className="text-sm font-medium text-gray-600">
                  Aún no has agregado áreas de atención.
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Selecciona una opción del catálogo para
                  agregarla a tu perfil.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedAreas.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {item.attentionarea.name}
                      </h4>

                      {item.attentionarea.description && (
                        <p className="mt-1 text-sm text-gray-500">
                          {
                            item.attentionarea
                              .description
                          }
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteArea(
                          item.attentionAreaId
                        )
                      }
                      className="ml-4 rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700"
                      title="Eliminar área de atención"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </section>
  );
}