interface VisitItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface WhenToVisitProps {
  badge: string;
  title: string;
  subtitle: string;
  items: VisitItem[];
}

import { Brain, HeartHandshake, MoonStar, Users, Briefcase, Baby } from "lucide-react";


export default function WhenToVisit({
  badge,
  title,
  subtitle,
  items,
}: WhenToVisitProps) {
  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl mx-auto text-center mb-10">

          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            {badge}
          </span>

          <h2 className="mt-2 text-4xl font-bold text-[#203564]">
            {title}
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            {subtitle}
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {items.map((items) => {

            const Icon = items.icon;

            return (
              <article
                key={items.title}
                className="rounded-3xl bg-white border p-5 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center mb-3">

                  <Icon
                    className="text-emerald-600"
                    size={24}
                  />

                </div>

                <h3 className="text-lg font-semibold text-[#203564] mb-4">
                  {items.title}
                </h3>

                <p className="text-slate-600 leading-6">
                  {items.description}
                </p>

              </article>
            );

          })}

        </div>

      </div>
    </section>
  );
}