import { Trophy } from "lucide-react";

import SectionHeader from "@/components/ui/SectionHeader";
import Timeline from "@/components/ui/Timeline";
import { Specialist } from "@/types/specialist";

interface AwardsSectionProps {
  specialist: Specialist;
}

export default function AwardsSection({
  specialist,
}: AwardsSectionProps) {
  const items = specialist.awards.map((award) => ({
    title: award.name,
    subtitle: award.organization ?? "",
    period: award.year ?? "",
    description: award.description ?? "",
  }));

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-5xl px-4">

        <SectionHeader
          title="Reconocimientos profesionales"
          description="Distinciones y reconocimientos que forman parte de la trayectoria profesional del especialista."
        />

        <Timeline
          icon={<Trophy className="h-4 w-4" />}
          items={items}
        />

      </div>
    </section>
  );
}