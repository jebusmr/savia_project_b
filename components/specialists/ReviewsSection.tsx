import SectionHeader from "@/components/ui/SectionHeader";
import Carousel from "@/components/ui/Carousel";

import RatingSummary from "./RatingSummary";
import ReviewCard from "./ReviewCard";

export default function ReviewsSection() {
  // Datos de ejemplo
  const reviews = [
    {
      patient: "María G.",
      date: "Hace 2 semanas",
      rating: 5,
      comment:
        "La doctora explicó con mucha claridad cada parte del tratamiento. Me hizo sentir en confianza desde la primera consulta.",
      tags: ["Puntualidad", "Explicación clara", "Trato humano"],
    },
    {
      patient: "Carlos R.",
      date: "Hace 1 mes",
      rating: 5,
      comment:
        "Excelente atención. El consultorio es muy agradable y resolvió todas mis dudas durante la cita.",
      tags: ["Consultorio", "Profesionalismo", "Empatía"],
    },
    {
      patient: "Laura M.",
      date: "Hace 3 meses",
      rating: 4,
      comment:
        "Muy buena experiencia. Recomiendo ampliamente la atención recibida.",
      tags: ["Recomendado", "Seguimiento"],
    },
    {
      patient: "José A.",
      date: "Hace 4 meses",
      rating: 5,
      comment:
        "Desde la primera sesión me sentí escuchado. La atención fue excelente y muy profesional.",
      tags: ["Empatía", "Seguimiento", "Confianza"],
    },
    {
      patient: "Ana P.",
      date: "Hace 5 meses",
      rating: 5,
      comment:
        "Muy recomendable. Puntual, amable y con explicaciones muy claras durante toda la consulta.",
      tags: ["Puntualidad", "Profesionalismo", "Explicación clara"],
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">

        <SectionHeader
          title="Lo que opinan nuestros pacientes"
          description="Las opiniones mostradas corresponden a pacientes que autorizaron compartir su experiencia. En SAVIA buscamos promover información transparente y útil para quienes buscan atención médica."
        />

        <RatingSummary
          rating={4.9}
          totalReviews={187}
          distribution={[
            { stars: 5, count: 170 },
            { stars: 4, count: 13 },
            { stars: 3, count: 3 },
            { stars: 2, count: 1 },
            { stars: 1, count: 0 },
          ]}
        />

        {/* Carrusel */}

        <div className="mt-12">

          <Carousel>

            {reviews.map((review, index) => (
              <div
                key={index}
                className="
                  min-w-full
                  md:min-w-[48%]
                  lg:min-w-[31%]
                "
              >
                <ReviewCard
                  patient={review.patient}
                  date={review.date}
                  rating={review.rating}
                  comment={review.comment}
                  tags={review.tags}
                />
              </div>
            ))}

          </Carousel>

        </div>

        {/* Botón */}

        <div className="mt-10 flex justify-center">

          <button
            className="
              rounded-xl
              border
              border-emerald-600
              px-6
              py-3
              font-medium
              text-emerald-700
              transition
              hover:bg-emerald-50
            "
          >
            Ver todas las opiniones →
          </button>

        </div>

      </div>
    </section>
  );
}