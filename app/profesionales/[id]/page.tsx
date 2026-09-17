import { notFound } from "next/navigation";
import Link from "next/link";

import SpecialistHero from "@/components/specialists/SpecialistHero";
import TrustCard from "@/components/specialists/TrustCard";
import PracticalInfo from "@/components/specialists/PracticalInfo";
import AboutSpecialist from "@/components/specialists/AboutSpecialist";
import AttentionAreasSection from "@/components/specialists/AttentionAreasSection";
import ExperienceSection from "@/components/specialists/ExperienceSection";
import EducationSection from "@/components/specialists/EducationSection";
import CertificationsSection from "@/components/specialists/CertificationsSection";
import LocationSection from "@/components/specialists/LocationSection";
import ReviewsSection from "@/components/specialists/ReviewsSection";
import AwardsSection from "@/components/specialists/AwardsSection";


import { transformSpecialist } from "@/lib/transformers/specialist";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SpecialistPage({
  params,
}: PageProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/api/specialists/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  const result = await response.json();

  if (!result.success || !result.data) {
    notFound();
  }

  const specialist = transformSpecialist(result.data);

  return (
  <main className="min-h-screen bg-gray-50">
    <div className="mx-auto max-w-7xl px-6 pt-6">
      <Link
        href="/mi-cuenta"
        className="inline-flex items-center text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
      >
        ← Volver a mi panel
      </Link>
    </div>

    <SpecialistHero specialist={specialist} />

      <TrustCard specialist={specialist} />

      <PracticalInfo specialist={specialist} />

      <AboutSpecialist specialist={specialist} />

      <AttentionAreasSection specialist={specialist} />

      <ExperienceSection specialist={specialist} />

      <EducationSection specialist={specialist} />

      <CertificationsSection specialist={specialist} />

      <AwardsSection specialist={specialist} />

      <LocationSection specialist={specialist} />

      <ReviewsSection />
    </main>
  );
}