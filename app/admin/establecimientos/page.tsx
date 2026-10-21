
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  HeartPulse,
  PawPrint,
  MapPin,
  Phone,
  Globe,
  Mail,
  ImagePlus,
  Save,
  ArrowLeft,
} from "lucide-react";

type Project = "SAVIA" | "HUELLITAS";

const categories: Record<Project, { value: string; label: string }[]> = {
  SAVIA: [
    { value: "laboratorios-estudios", label: "Laboratorios y estudios" },
    { value: "farmacias", label: "Farmacias" },
    { value: "hospitales-clinicas", label: "Hospitales y clínicas" },
    { value: "equipamiento-suministros", label: "Equipamiento y suministros" },
    { value: "medicina-alternativa", label: "Medicina alternativa" },
    { value: "atencion-urgente", label: "Atención urgente" },
  ],
  HUELLITAS: [
    { value: "veterinario", label: "Veterinarios" },
    { value: "laboratorio", label: "Laboratorios veterinarios" },
    { value: "servicio", label: "Servicios para mascotas" },
    { value: "atencion", label: "Atención veterinaria" },
  ],
};

export default function AdminEstablecimientosPage() {
  const [project, setProject] = useState<Project>("SAVIA");
  const [category, setCategory] = useState(categories.SAVIA[0].value);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("La Piedad");
  const [municipality, setMunicipality] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");

  function changeProject(nextProject: Project) {
    setProject(nextProject);
    setCategory(categories[nextProject][0].value);
  }

  async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  try {
    const response = await fetch("/api/admin/establecimientos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project,
        category,
        name,
        description,
        address,
        city,
        municipality,
        phone,
        whatsapp,
        email,
        website,
        image,
        status,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.error || "No fue posible guardar el establecimiento.");
      return;
    }

    alert("Establecimiento guardado correctamente.");

    setName("");
    setDescription("");
    setAddress("");
    setMunicipality("");
    setPhone("");
    setWhatsapp("");
    setEmail("");
    setWebsite("");
    setImage("");
    setStatus("DRAFT");
  } catch (error) {
    console.error("Error guardando establecimiento:", error);
    alert("No fue posible conectar con el servidor.");
  }
}

  const inputClass =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800">
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
          <div className="border-b border-gray-100 pb-6">
            <p className="text-sm font-semibold text-emerald-700">
              SAVIA · Administración
            </p>
            <h1 className="mt-2 text-3xl font-bold text-[#17365D]">
              Establecimientos
            </h1>
            <p className="mt-2 text-gray-600">
              Registra la información de los establecimientos de SAVIA Salud y SAVIA Huellitas.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-8">
            <section>
              <h2 className="mb-4 text-lg font-semibold text-[#17365D]">
                1. Catálogo y categoría
              </h2>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="project" className="text-sm font-medium text-gray-700">
                    Catálogo
                  </label>
                  <div className="mt-1 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => changeProject("SAVIA")}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 font-medium transition ${
                        project === "SAVIA"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <HeartPulse size={18} />
                      Salud
                    </button>
                    <button
                      type="button"
                      onClick={() => changeProject("HUELLITAS")}
                      className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 font-medium transition ${
                        project === "HUELLITAS"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                          : "border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <PawPrint size={18} />
                      Huellitas
                    </button>
                  </div>
                  <input id="project" type="hidden" value={project} readOnly />
                </div>

                <div>
                  <label htmlFor="category" className="text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <select
                    id="category"
                    className={inputClass}
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    required
                  >
                    {categories[project].map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-[#17365D]">
                2. Información general
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Nombre del establecimiento *
                  </label>
                  <input id="name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nombre comercial" />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea id="description" className={inputClass} rows={4} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe brevemente los servicios del establecimiento." />
                </div>

                <div>
                  <label htmlFor="image" className="text-sm font-medium text-gray-700">
                    <ImagePlus size={16} className="mr-1 inline" />
                    Ruta de la imagen
                  </label>
                  <input id="image" className={inputClass} value={image} onChange={(e) => setImage(e.target.value)} placeholder="/images/establecimientos/ejemplo.jpg" />
                </div>

                <div>
                  <label htmlFor="status" className="text-sm font-medium text-gray-700">
                    Estado inicial
                  </label>
                  <select id="status" className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as "DRAFT" | "PUBLISHED")}>
                    <option value="DRAFT">Borrador</option>
                    <option value="PUBLISHED">Publicado</option>
                  </select>
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-[#17365D]">
                3. Ubicación
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">
                    <MapPin size={16} className="mr-1 inline" />
                    Dirección
                  </label>
                  <input id="address" className={inputClass} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Calle, número y colonia" />
                </div>
                <div>
                  <label htmlFor="city" className="text-sm font-medium text-gray-700">
                    Ciudad *
                  </label>
                  <input id="city" className={inputClass} value={city} onChange={(e) => setCity(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="municipality" className="text-sm font-medium text-gray-700">
                    Municipio
                  </label>
                  <input id="municipality" className={inputClass} value={municipality} onChange={(e) => setMunicipality(e.target.value)} placeholder="Municipio" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-lg font-semibold text-[#17365D]">
                4. Datos de contacto
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    <Phone size={16} className="mr-1 inline" />
                    Teléfono
                  </label>
                  <input id="phone" type="tel" className={inputClass} value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                    WhatsApp
                  </label>
                  <input id="whatsapp" type="tel" className={inputClass} value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    <Mail size={16} className="mr-1 inline" />
                    Correo electrónico
                  </label>
                  <input id="email" type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="website" className="text-sm font-medium text-gray-700">
                    <Globe size={16} className="mr-1 inline" />
                    Sitio web
                  </label>
                  <input id="website" type="url" className={inputClass} value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://" />
                </div>
              </div>
            </section>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                <Building2 size={16} className="mr-1 inline" />
                Los establecimientos se guardan en la base de datos de SAVIA.
              </p>
              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#17365D] px-6 py-3 font-semibold text-white transition hover:bg-[#102A49]">
                <Save size={18} />
                Guardar establecimiento
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
