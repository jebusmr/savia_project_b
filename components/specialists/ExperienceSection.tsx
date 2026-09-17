import { BriefcaseBusiness } from "lucide-react";

import Timeline from "@/components/ui/Timeline";
import SectionHeader from "@/components/ui/SectionHeader";
import { Specialist } from "@/types/specialist";

interface ExperienceSectionProps {
  specialist: Specialist;
}

export default function ExperienceSection({
  specialist,
}: ExperienceSectionProps) {
  const items = specialist.experience.map((exp) => ({
    title: exp.position,
    subtitle: exp.institution,
    period: exp.current
      ? `${exp.startYear} – Actualidad`
      : `${exp.startYear} – ${exp.endYear ?? ""}`,
    description: "",
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          title="Experiencia profesional"
          description="Trayectoria clínica y profesional que respalda la práctica del especialista."
        />

        <Timeline
          icon={<BriefcaseBusiness className="h-4 w-4" />}
          items={items}
        />
      </div>
    </section>
  );
}