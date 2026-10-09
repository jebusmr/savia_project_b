import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

interface PetBusinessCardProps {
  name: string;
  address: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  website: string;
  image?: string;
}

export default function PetBusinessCard({
  name,
  address,
  phone,
  whatsapp,
  email,
  website,
  image,
}: PetBusinessCardProps) {
  const whatsappNumber = whatsapp?.replace(/\D/g, "");

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
      {/* Imagen / logotipo */}
      <div className="flex h-48 items-center justify-center bg-gray-50">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-center text-sm font-medium text-gray-400">
            Logo o fotografía
          </div>
        )}
      </div>

      {/* Información */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#203564]">{name}</h3>

        <div className="mt-5 space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
            <span>{address}</span>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 shrink-0 text-emerald-700" />
            <span>{phone}</span>
          </div>

          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 shrink-0 text-emerald-700" />
            <span className="truncate">{website}</span>
          </div>
        </div>

        {/* Contacto */}
        <div className="mt-6 flex flex-wrap gap-2">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#203564] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#16284d]"
            >
              <Phone className="h-4 w-4" />
              Llamar
            </a>
          )}

          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
            >
              <Mail className="h-4 w-4" />
              Correo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}