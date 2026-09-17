import { CheckCircle2 } from "lucide-react";

interface AboutSectionProps {
  badge: string;
  title: string;
  description: string;
  benefits: string[];
  image?: React.ReactNode;
}

export default function AboutSection({
  badge,
  title,
  description,
  benefits,
  image,
}: AboutSectionProps) {
  return (
    <section id="about" className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl mb-14">

          <span className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
            {badge}
          </span>

          <h2 className="mt-3 text-4xl font-bold text-[#203564]">
            {title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            {description}
          </p>

        </div>

        <div className="grid lg:grid-cols-[45%_55%] gap-12 items-center">

          {/* Imagen */}

          <div>

            <div className="h-[350px] rounded-3xl border bg-slate-50 shadow-sm flex items-center justify-center">

              {image ? (

                image

              ) : (

                <div className="text-center px-8">

                  <div className="text-7xl mb-6">
                    🧠
                  </div>

                  <h3 className="text-2xl font-bold text-[#203564]">
                    Imagen o ilustración
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Aquí podremos mostrar una ilustración o fotografía.
                  </p>

                </div>

              )}

            </div>

          </div>

          {/* Beneficios */}

          <div>

            <h3 className="text-2xl font-semibold text-[#203564] mb-8">
              ¿Cómo puede ayudarte?
            </h3>

            <div className="space-y-6">

              {benefits.map((item) => (

                <div
                  key={item}
                  className="flex gap-4"
                >

                  <CheckCircle2
                    className="text-emerald-600 mt-1"
                    size={24}
                  />

                  <p className="text-lg text-slate-600 leading-7">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}