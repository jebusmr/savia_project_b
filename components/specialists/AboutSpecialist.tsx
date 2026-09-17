import { UserRound, HeartHandshake, MessageCircleHeart } from "lucide-react";

import InfoCard from "@/components/ui/InfoCard";
import { Specialist } from "@/types/specialist";

interface AboutSpecialistProps {
  specialist: Specialist;
}

export default function AboutSpecialist({
  specialist,
}: AboutSpecialistProps) {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">

        {/* Encabezado */}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
            Sobre el especialista
          </h2>

          <p className="mt-2 text-gray-600 max-w-3xl">
            Conoce la trayectoria personal y el enfoque de atención del especialista.
          </p>
        </div>

        {/* Primera fila */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          <div className="lg:col-span-2">
            <InfoCard
              icon={<UserRound className="h-6 w-6" />}
              title="Biografía"
            >
              <p className="leading-7 text-gray-700">
                {specialist.biography.about}
              </p>
            </InfoCard>
          </div>

          <InfoCard
            icon={<HeartHandshake className="h-6 w-6" />}
            title="Filosofía de atención"
          >
            <p className="leading-7 text-gray-700">
              {specialist.biography.philosophy}
            </p>
          </InfoCard>

        </div>

        {/* Segunda fila */}

        <div className="mt-6">

          <InfoCard
            icon={<MessageCircleHeart className="h-6 w-6" />}
            title="Enfoque de atención"
          >
            <p className="leading-7 text-gray-700">
              {specialist.biography.approach}
            </p>
          </InfoCard>

        </div>

      </div>
    </section>
  );
}