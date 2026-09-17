import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock3,
  Car,
  Accessibility,
  CreditCard,
  ExternalLink,
} from "lucide-react";

import InfoCard from "@/components/ui/InfoCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { Specialist } from "@/types/specialist";

interface LocationSectionProps {
  specialist: Specialist;
}

export default function LocationSection({
  specialist,
}: LocationSectionProps) {
  const { location } = specialist;

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4">

        <SectionHeader
          title="Consultorio y ubicación"
          description="Conoce dónde se encuentra el consultorio, cómo contactarlo y los servicios disponibles para tu visita."
        />

        {/* FOTO DEL CONSULTORIO */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {location.officeImage && (
            <div className="relative h-72 w-full">
              <Image
                src={location.officeImage}
                alt={location.officeName}
                fill
              className="object-cover"
            />
        </div>
        )}

          <div className="p-6">

            <h3 className="text-2xl font-bold text-slate-900">
              {location.officeName}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Consultorio privado • Atención con cita previa
            </p>

            <div className="mt-5 flex items-start gap-3">

              <MapPin className="mt-1 h-5 w-5 text-emerald-600" />

              <div className="text-gray-600">

                <p>{location.address}</p>

                <p>{location.neighborhood}</p>

                <p>
                  {location.city}, {location.state}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* CONTACTO + HORARIO */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <InfoCard
            icon={<Phone className="h-5 w-5" />}
            title="Contacto"
          >
            <p>{location.phone}</p>

            <p className="mt-3">{location.email}</p>
          </InfoCard>

          <InfoCard
            icon={<Clock3 className="h-5 w-5" />}
            title="Horario de atención"
          >
            {location.schedule.map((item) => (
              <p key={item} className="mb-2">
                {item}
              </p>
            ))}
          </InfoCard>

        </div>

        {/* SERVICIOS */}

        {/* SERVICIOS DEL CONSULTORIO */}

{(location.parking ||
  location.wheelchairAccess ||
  location.acceptsCards) && (
  <div className="mt-6">

    <InfoCard
      icon={<MapPin className="h-5 w-5" />}
      title="Servicios del consultorio"
    >
      <div className="flex flex-wrap gap-3">

        {location.parking && (
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            <Car className="h-4 w-4" />
            Estacionamiento
          </span>
        )}

        {location.wheelchairAccess && (
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            <Accessibility className="h-4 w-4" />
            Acceso universal
          </span>
        )}

        {location.acceptsCards && (
          <span className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            <CreditCard className="h-4 w-4" />
            Pago con tarjeta
          </span>
        )}

      </div>
    </InfoCard>

  </div>
)}

               {/* MAPA */}

        {location.mapEmbedUrl && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            <iframe
              src={location.mapEmbedUrl}
              className="h-[320px] w-full"
              loading="lazy"
              allowFullScreen
              title={`Mapa de ${location.officeName}`}
            />

            {location.mapsUrl && (
              <div className="flex justify-center border-t border-gray-200 p-5">

                <a
                  href={location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-emerald-600
                    px-5
                    py-3
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-emerald-700
                  "
                >
                  Abrir en Google Maps

                  <ExternalLink className="h-4 w-4" />
                </a>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}