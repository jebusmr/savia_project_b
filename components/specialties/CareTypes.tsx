import {
  Building2,
  Laptop,
  HeartHandshake,
  Users,
  Baby,
  User,
} from "lucide-react";

interface CareType {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface CareTypesSectionProps {
  badge: string;
  title: string;
  subtitle: string;
  items: CareType[];
}

export default function CareTypesSection({
  badge,
  title,
  subtitle,
  items,
}: CareTypesSectionProps) {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* Encabezado */}

        <div className="max-w-3xl mb-10">

          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            {badge}
          </span>

          <h2 className="mt-3 text-4xl font-bold text-[#203564]">
            {title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {subtitle}
          </p>

        </div>

        {/* Tarjetas */}

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">

          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <Icon size={28} />
                </div>

                <h3 className="mb-2 text-xl font-semibold text-[#203564]">
                  {item.title}
                </h3>

                <p className="leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}