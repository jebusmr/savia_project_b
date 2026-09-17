import { GraduationCap } from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import Timeline from "@/components/ui/Timeline";
import { Specialist } from "@/types/specialist";

interface EducationSectionProps {
  specialist: Specialist;
}

export default function EducationSection({
  specialist,
}: EducationSectionProps) {
  const items = specialist.education.map((education) => ({
    title: education.degree,
    subtitle: education.institution,
    period: education.year,
    description: education.description,
  }));

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">

        <SectionHeader
          title="Formación académica"
          description="Estudios universitarios y de posgrado que respaldan la preparación profesional del especialista."
        />

        <Timeline
          icon={<GraduationCap className="h-4 w-4" />}
          items={items}
        />

      </div>
    </section>
  );
}