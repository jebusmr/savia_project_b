const steps = [
  {
    number: "01",
    title: "Explora SAVIA",
    description:
      "Encuentra profesionales, servicios e información relacionada con la salud y el bienestar.",
  },
  {
    number: "02",
    title: "Elige lo que necesitas",
    description:
      "Conoce las opciones disponibles y encuentra la atención o información que mejor se adapte a tus necesidades.",
  },
  {
    number: "03",
    title: "Conecta y participa",
    description:
      "Agenda una atención, conoce iniciativas de salud o participa en una comunidad más informada y saludable.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F9FB] py-12">
      <div className="mx-auto max-w-7xl px-8">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-[#203564] md:text-4xl">
            ¿Cómo funciona SAVIA?
          </h2>

          <p className="mt-3 text-lg text-gray-600">
            Una plataforma para acercarte a la salud, los servicios y tu comunidad.
          </p>

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="text-4xl font-bold text-[#A7895F]">
                {step.number}
              </div>

              <h3 className="mt-4 text-2xl font-semibold text-[#203564]">
                {step.title}
              </h3>

              <p className="mt-2 leading-6 text-gray-600">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}