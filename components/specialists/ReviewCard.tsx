import { BadgeCheck, Star } from "lucide-react";

interface ReviewCardProps {
  patient: string;
  date: string;
  rating: number;
  comment: string;
  tags: string[];
}

export default function ReviewCard({
  patient,
  date,
  rating,
  comment,
  tags,
}: ReviewCardProps) {

  const initials = patient
    ? patient
        .split(" ")
        .map((word) => word[0])
        .join("")
    : "?";

  return (
    <div
      className="
        flex
        h-full
        flex-col
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Encabezado */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              font-bold
              text-emerald-700
            "
          >
            {initials}
          </div>

          <div>

            <h3 className="font-semibold text-[#203564]">
              {patient}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-sm text-emerald-700">

              <BadgeCheck className="h-4 w-4" />

              <span>Verificada por SAVIA</span>

            </div>

          </div>

        </div>

        <span className="whitespace-nowrap text-sm text-gray-500">
          {date}
        </span>

      </div>

      {/* Estrellas */}

      <div className="mt-5 flex gap-1">

        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= rating
                ? "fill-amber-400 text-amber-400"
                : "text-gray-300"
            }`}
          />
        ))}

      </div>

      {/* Comentario */}

      <p className="mt-5 line-clamp-4 flex-grow italic leading-7 text-gray-700">
        "{comment}"
      </p>

      <button
        className="
          mt-3
          w-fit
          text-sm
          font-medium
          text-emerald-600
          hover:text-emerald-700
        "
      >
        Leer opinión completa →
      </button>

      {/* Etiquetas */}

      <div className="mt-6 flex flex-wrap gap-2">

        {tags.map((tag) => (

          <span
            key={tag}
            className="
              rounded-full
              bg-emerald-50
              px-3
              py-1
              text-sm
              text-emerald-700
            "
          >
            {tag}
          </span>

        ))}

      </div>

    </div>
  );
}