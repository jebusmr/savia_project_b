
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  RefreshCw,
  Building2,
} from "lucide-react";

type Establishment = {
  id: string;
  project: string;
  category: string;
  name: string;
  city: string;
  municipality: string | null;
  address: string | null;
  description: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  website: string | null;
  image: string | null;
  status: string;
  createdAt: string;
};

type ApiResponse = {
  success: boolean;
  data?: Establishment[];
  error?: string;
};

export default function AdminEstablecimientosListadoPage() {
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("TODOS");
  const [statusFilter, setStatusFilter] = useState("TODOS");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadEstablishments() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/establecimientos");
      const result: ApiResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "No fue posible consultar los establecimientos."
        );
      }

      setEstablishments(result.data ?? []);
    } catch (err) {
      console.error("Error consultando establecimientos:", err);
      setError(
        err instanceof Error
          ? err.message
          : "No fue posible conectar con el servidor."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEstablishments();
  }, []);

  // Publicar o despublicar un establecimiento
  async function changeStatus(item: Establishment) {
    const newStatus =
      item.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    const action =
      newStatus === "PUBLISHED" ? "publicar" : "despublicar";

    const confirmed = window.confirm(
      `¿Estás seguro de que deseas ${action} "${item.name}"?`
    );

    if (!confirmed) return;

    setUpdatingId(item.id);

    try {
      const response = await fetch("/api/admin/establecimientos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: item.id,
          project: item.project,
          category: item.category,
          name: item.name,
          city: item.city,
          municipality: item.municipality,
          address: item.address,
          description: item.description,
          phone: item.phone,
          whatsapp: item.whatsapp,
          email: item.email,
          website: item.website,
          image: item.image,
          status: newStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error || "No fue posible cambiar el estado."
        );
      }

      await loadEstablishments();

      alert(
        newStatus === "PUBLISHED"
          ? "Establecimiento publicado correctamente."
          : "Establecimiento despublicado correctamente."
      );
    } catch (err) {
      console.error("Error cambiando estado:", err);

      alert(
        err instanceof Error
          ? err.message
          : "No fue posible cambiar el estado del establecimiento."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredEstablishments = useMemo(() => {
    return establishments.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase()) ||
        (item.municipality ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesProject =
        projectFilter === "TODOS" || item.project === projectFilter;

      const matchesStatus =
        statusFilter === "TODOS" || item.status === statusFilter;

      return matchesSearch && matchesProject && matchesStatus;
    });
  }, [establishments, search, projectFilter, statusFilter]);

  const totalDrafts = establishments.filter(
    (item) => item.status === "DRAFT"
  ).length;

  const totalPublished = establishments.filter(
    (item) => item.status === "PUBLISHED"
  ).length;

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/admin"
            className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            <ArrowLeft size={18} />
            Volver al panel
          </Link>

          <img
            src="/images/logo.jpeg"
            alt="SAVIA - Salud y desarrollo"
            className="h-12 w-auto object-contain"
          />
        </header>

        <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                SAVIA · Administración
              </p>

              <h1 className="mt-2 text-3xl font-bold text-[#17365D]">
                Establecimientos registrados
              </h1>

              <p className="mt-2 text-gray-600">
                Consulta y administra los establecimientos de Salud y Huellitas.
              </p>
            </div>

            <Link
              href="/admin/establecimientos"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17365D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#102A49]"
            >
              <Building2 size={18} />
              Registrar establecimiento
            </Link>
          </div>

          {/* Resumen */}
          <div className="grid gap-4 py-7 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Total registrados</p>
              <p className="mt-2 text-3xl font-bold text-[#17365D]">
                {establishments.length}
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm text-gray-600">Borradores</p>
              <p className="mt-2 text-3xl font-bold text-amber-700">
                {totalDrafts}
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm text-gray-600">Publicados</p>
              <p className="mt-2 text-3xl font-bold text-emerald-700">
                {totalPublished}
              </p>
            </div>
          </div>

          {/* Filtros */}
          <div className="border-t border-gray-100 pt-7">
            <h2 className="mb-4 text-lg font-semibold text-[#17365D]">
              Buscar establecimientos
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Nombre, ciudad o municipio"
                  className={`${inputClass} pl-10`}
                />
              </div>

              <select
                value={projectFilter}
                onChange={(event) => setProjectFilter(event.target.value)}
                className={inputClass}
              >
                <option value="TODOS">Todos los catálogos</option>
                <option value="SAVIA">SAVIA Salud</option>
                <option value="HUELLITAS">SAVIA Huellitas</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className={inputClass}
              >
                <option value="TODOS">Todos los estados</option>
                <option value="DRAFT">Borradores</option>
                <option value="PUBLISHED">Publicados</option>
              </select>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={loadEstablishments}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw size={16} />
                Actualizar listado
              </button>
            </div>
          </div>

          {/* Resultados */}
          <div className="mt-7 border-t border-gray-100 pt-7">
            <h2 className="mb-4 text-lg font-semibold text-[#17365D]">
              Resultados ({filteredEstablishments.length})
            </h2>

            {loading ? (
              <p className="py-10 text-center text-gray-500">
                Cargando establecimientos...
              </p>
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
                <p className="text-sm text-red-700">{error}</p>
                <button
                  type="button"
                  onClick={loadEstablishments}
                  className="mt-3 font-semibold text-red-700 underline"
                >
                  Intentar nuevamente
                </button>
              </div>
            ) : filteredEstablishments.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-300 py-12 text-center">
                <Building2
                  size={32}
                  className="mx-auto text-gray-400"
                />

                <p className="mt-3 font-medium text-gray-700">
                  No se encontraron establecimientos.
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Prueba modificando los filtros de búsqueda.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] text-left">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500">
                      <th className="px-4 py-3 font-medium">Establecimiento</th>
                      <th className="px-4 py-3 font-medium">Catálogo</th>
                      <th className="px-4 py-3 font-medium">Categoría</th>
                      <th className="px-4 py-3 font-medium">Ubicación</th>
                      <th className="px-4 py-3 font-medium">Estado</th>
                      <th className="px-4 py-3 font-medium">Acciones</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredEstablishments.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-4">
                          <p className="font-semibold text-[#17365D]">
                            {item.name}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600">
                          {item.project === "HUELLITAS"
                            ? "Huellitas"
                            : "Salud"}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600">
                          {item.category}
                        </td>

                        <td className="px-4 py-4 text-sm text-gray-600">
                          {item.city}
                          {item.municipality
                            ? `, ${item.municipality}`
                            : ""}
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                              item.status === "PUBLISHED"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.status === "PUBLISHED"
                              ? "Publicado"
                              : "Borrador"}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/admin/establecimientos?id=${item.id}`}
                              className="inline-flex items-center rounded-lg bg-[#17365D] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#102A49]"
                            >
                              Editar
                            </Link>

                            <button
                              type="button"
                              onClick={() => changeStatus(item)}
                              disabled={updatingId === item.id}
                              className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                item.status === "PUBLISHED"
                                  ? "border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
                                  : "border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                              }`}
                            >
                              {updatingId === item.id
                                ? "Actualizando..."
                                : item.status === "PUBLISHED"
                                  ? "Despublicar"
                                  : "Publicar"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
