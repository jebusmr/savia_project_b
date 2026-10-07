"use client";

import { useEffect, useState } from "react";

interface OfficeManagerProps {
  specialistId: string;
}

interface Address {
  id: string;
  street: string;
  exteriorNumber: string;
  interiorNumber?: string | null;
  neighborhood: string;
  postalCode: string;
  city: string;
  municipality: string;
  state: string;
  country: string;
  latitude?: number | null;
  longitude?: number | null;
  references?: string | null;
}

interface Office {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  hasParking: boolean;
  issuesInvoice: boolean;
  acceptsCash: boolean;
  acceptsCard: boolean;
  acceptsTransfer: boolean;
  address: Address;
  isPrimary: boolean;
}

export default function OfficeManager({
  specialistId,
}: OfficeManagerProps) {
  const [offices, setOffices] = useState<Office[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingOfficeId, setEditingOfficeId] =
    useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
    hasParking: false,
    issuesInvoice: false,
    acceptsCash: true,
    acceptsCard: false,
    acceptsTransfer: false,
    street: "",
    exteriorNumber: "",
    interiorNumber: "",
    neighborhood: "",
    postalCode: "",
    city: "",
    municipality: "",
    state: "",
    country: "México",
    references: "",
  });

  useEffect(() => {
    loadOffices();
  }, [specialistId]);

  async function loadOffices() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/specialists/${specialistId}/offices`
      );

      if (!response.ok) {
        throw new Error(
          "No fue posible cargar los consultorios."
        );
      }

      const data = await response.json();

      const loadedOffices =
        data?.data?.specialistoffice ??
        data?.specialistoffice ??
        [];

      const mappedOffices = loadedOffices.map(
        (relation: {
          office: Office;
          isPrimary: boolean;
        }) => ({
          ...relation.office,
          isPrimary: relation.isPrimary,
        })
      );

      setOffices(mappedOffices);

      if (mappedOffices.length > 0) {
        const primaryOffice =
          mappedOffices.find(
            (office: Office) => office.isPrimary
          ) ?? mappedOffices[0];

        setEditingOfficeId(primaryOffice.id);

        setForm({
          name: primaryOffice.name ?? "",
          phone: primaryOffice.phone ?? "",
          email: primaryOffice.email ?? "",
          website: primaryOffice.website ?? "",
          hasParking:
            primaryOffice.hasParking ?? false,
          issuesInvoice:
            primaryOffice.issuesInvoice ?? false,
          acceptsCash:
            primaryOffice.acceptsCash ?? true,
          acceptsCard:
            primaryOffice.acceptsCard ?? false,
          acceptsTransfer:
            primaryOffice.acceptsTransfer ?? false,
          street:
            primaryOffice.address.street ?? "",
          exteriorNumber:
            primaryOffice.address.exteriorNumber ?? "",
          interiorNumber:
            primaryOffice.address.interiorNumber ?? "",
          neighborhood:
            primaryOffice.address.neighborhood ?? "",
          postalCode:
            primaryOffice.address.postalCode ?? "",
          city:
            primaryOffice.address.city ?? "",
          municipality:
            primaryOffice.address.municipality ?? "",
          state:
            primaryOffice.address.state ?? "",
          country:
            primaryOffice.address.country ?? "México",
          references:
            primaryOffice.address.references ?? "",
        });
      } else {
        setEditingOfficeId(null);
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "No fue posible cargar los consultorios."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } =
      event.target;

    setForm((current) => ({
      ...current,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const method = editingOfficeId
        ? "PATCH"
        : "POST";

      const response = await fetch(
        `/api/specialists/${specialistId}/offices`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            officeId: editingOfficeId,
            name: form.name,
            phone: form.phone,
            email: form.email,
            website: form.website,
            hasParking: form.hasParking,
            issuesInvoice: form.issuesInvoice,
            acceptsCash: form.acceptsCash,
            acceptsCard: form.acceptsCard,
            acceptsTransfer: form.acceptsTransfer,
            street: form.street,
            exteriorNumber: form.exteriorNumber,
            interiorNumber: form.interiorNumber,
            neighborhood: form.neighborhood,
            postalCode: form.postalCode,
            city: form.city,
            municipality: form.municipality,
            state: form.state,
            country: form.country,
            references: form.references,
            isPrimary: editingOfficeId
              ? true
              : offices.length === 0,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ??
            "No fue posible guardar el consultorio."
        );
      }

      setMessage(
        editingOfficeId
          ? "Consultorio actualizado correctamente."
          : "Consultorio creado correctamente."
      );

      await loadOffices();
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "No fue posible guardar la información."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-emerald-600">
          Consultorio y atención presencial
        </p>

        <h2 className="mt-1 text-2xl font-bold text-[#17365D]">
          Mi consultorio
        </h2>

        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          Registra el lugar donde brindas atención
          presencial. Esta información podrá ser
          consultada por los usuarios de SAVIA.
        </p>
      </div>

      {message && (
        <div className="mb-5 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-500">
          Cargando información...
        </p>
      ) : (
        <>
          {offices.length > 0 && (
            <div className="mb-8 space-y-4">
              {offices.map((office) => (
                <div
                  key={office.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {office.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-600">
                        {office.address.street}{" "}
                        {office.address.exteriorNumber}
                        {office.address.interiorNumber
                          ? `, Int. ${office.address.interiorNumber}`
                          : ""}
                      </p>

                      <p className="text-sm text-gray-600">
                        {office.address.neighborhood},{" "}
                        {office.address.postalCode},{" "}
                        {office.address.city},{" "}
                        {office.address.state}
                      </p>

                      {office.hasParking && (
                        <p className="mt-2 text-sm font-medium text-emerald-700">
                          ✓ Cuenta con estacionamiento
                        </p>
                      )}

                      {office.issuesInvoice && (
                        <p className="mt-1 text-sm font-medium text-emerald-700">
                          ✓ Emite factura
                        </p>
                      )}

                      <div className="mt-2 flex flex-wrap gap-2">
                        {office.acceptsCash && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            Efectivo
                          </span>
                        )}

                        {office.acceptsCard && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            Tarjeta
                          </span>
                        )}

                        {office.acceptsTransfer && (
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                            Transferencia
                          </span>
                        )}
                      </div>
                    </div>

                    {office.isPrimary && (
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                        Principal
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                {editingOfficeId
                  ? "Editar consultorio"
                  : "Datos del consultorio"}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nombre del consultorio
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ej. Consultorio Médico SAVIA"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Correo electrónico
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Sitio web
                  </label>

                  <input
                    type="url"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Ubicación
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Calle
                  </label>

                  <input
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Número exterior
                  </label>

                  <input
                    type="text"
                    name="exteriorNumber"
                    value={form.exteriorNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Número interior
                  </label>

                  <input
                    type="text"
                    name="interiorNumber"
                    value={form.interiorNumber}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Colonia
                  </label>

                  <input
                    type="text"
                    name="neighborhood"
                    value={form.neighborhood}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Código postal
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Ciudad
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Municipio
                  </label>

                  <input
                    type="text"
                    name="municipality"
                    value={form.municipality}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Estado
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Servicios y formas de pago
              </h3>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="hasParking"
                    checked={form.hasParking}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    El consultorio cuenta con estacionamiento
                  </span>
                </label>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="issuesInvoice"
                    checked={form.issuesInvoice}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                  />

                  <span className="text-sm font-medium text-gray-700">
                    Emite factura
                  </span>
                </label>

                <div className="pt-2">
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Formas de pago
                  </p>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="acceptsCash"
                        checked={form.acceptsCash}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                      />

                      <span className="text-sm text-gray-700">
                        Efectivo
                      </span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="acceptsCard"
                        checked={form.acceptsCard}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                      />

                      <span className="text-sm text-gray-700">
                        Tarjeta
                      </span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="acceptsTransfer"
                        checked={form.acceptsTransfer}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600"
                      />

                      <span className="text-sm text-gray-700">
                        Transferencia bancaria
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Referencias para llegar
              </label>

              <textarea
                name="references"
                value={form.references}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    references: event.target.value,
                  }))
                }
                rows={3}
                placeholder="Ej. Frente a la plaza principal..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving
                  ? "Guardando..."
                  : editingOfficeId
                    ? "Actualizar consultorio"
                    : "Guardar consultorio"}
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
}