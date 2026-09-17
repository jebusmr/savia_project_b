interface ConditionsSectionProps {
  badge: string;
  title: string;
  subtitle: string;
  conditions: string[];
}

export default function ConditionsSection({
  badge,
  title,
  subtitle,
  conditions,
}: ConditionsSectionProps) {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-5">

        {/* Encabezado */}

        <div className="max-w-3xl mb-8">

          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            {badge}
          </span>

          <h2 className="mt-2 text-4xl font-bold text-[#203564]">
            {title}
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {subtitle}
          </p>

        </div>

        {/* Chips */}

        <div className="flex flex-wrap gap-4">

          {conditions.map((condition) => (

            <div
              key={condition}
              className="
                px-4
                py-2
                rounded-full
                border
                border-emerald-200
                bg-emerald-50
                text-[#203564]
                font-medium
                transition-all
                duration-200
                hover:bg-emerald-600
                hover:text-white
                cursor-default
              "
            >
              {condition}
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}