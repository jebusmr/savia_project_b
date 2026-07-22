export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-emerald-50 to-white">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-24">

        <div className="max-w-2xl">

          <h1 className="mb-6 text-6xl font-bold text-gray-900">
            Encuentra al especialista ideal para ti.
          </h1>

          <p className="mb-10 text-xl text-gray-600">
            Conecta con profesionales de la salud y el desarrollo humano
            de manera sencilla, confiable y cercana.
          </p>

          <button className="rounded-xl bg-emerald-600 px-8 py-4 text-lg font-semibold text-white hover:bg-emerald-700">
            Buscar especialista
          </button>

        </div>

        <div className="hidden lg:flex">

          <div className="flex h-96 w-96 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 text-xl">

            Imagen principal

          </div>

        </div>

      </div>

    </section>
  );
}