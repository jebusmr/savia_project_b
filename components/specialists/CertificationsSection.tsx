import { BadgeCheck } from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import Timeline from "@/components/ui/Timeline";
import { Specialist } from "@/types/specialist";

interface CertificationsSectionProps {
  specialist: Specialist;
}

export default function CertificationsSection({
  specialist,
}: CertificationsSectionProps) {
  const items = specialist.certifications.map((certification) => ({
    title: certification.name,
    subtitle: certification.organization,
    period: certification.year,
    description: certification.description ?? "",
  }));

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4">

        <SectionHeader
          title="Certificaciones"
          description="Acreditaciones y certificaciones que respaldan la actualización y el desarrollo profesional continuo del especialista."
        />

        <Timeline
          icon={<BadgeCheck className="h-4 w-4" />}
          items={items}
        />

      </div>
    </section>
  );
}