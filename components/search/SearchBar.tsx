export default function SearchBar() {
  return (
    <section className="bg-[var(--color-surface)] py-15">

      <div className="mx-auto max-w-5xl px-6">

        <div className="text-center">

          <span className="rounded-full bg-[var(--color-primary-light)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)]">
            Encuentra atención confiable
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[var(--color-text)]">
            Comienza a cuidar tu salud con confianza
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[var(--color-text-light)]">
            Busca especialistas verificados por especialidad y ubicación para
            encontrar la atención que mejor se adapte a ti y a tu familia.
          </p>

        </div>

        <div className="mt-12 rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-lg">

          <div className="grid gap-5 lg:grid-cols-3">

            {/* Especialidad */}

            <select
              className="rounded-xl border border-[var(--color-border)] px-5 py-4 text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)]"
            >
              <option>Selecciona una especialidad</option>
              <option>Psicología</option>
              <option>Nutrición</option>
              <option>Medicina General</option>
              <option>Fisioterapia</option>
            </select>

            {/* Ubicación */}

            <select
              className="rounded-xl border border-[var(--color-border)] px-5 py-4 text-[var(--color-text)] outline-none transition focus:border-[var(--color-primary)]"
            >
              <option>Selecciona tu ubicación</option>
              <option>La Piedad</option>
              <option>Pénjamo</option>
              <option>Región Ciénega</option>
            </select>

            {/* Botón */}

            <button
              className="rounded-xl bg-[var(--color-primary)] px-8 py-4 font-semibold text-white transition hover:opacity-90"
            >
              Buscar especialista
            </button>

          </div>

          {/* Especialidades populares */}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">

            <span className="text-sm font-medium text-[var(--color-text-light)]">
              Especialidades populares:
            </span>

            {[
              "Psicología",
              "Nutrición",
              "Pediatría",
              "Odontología",
              "Fisioterapia",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              >
                {item}
              </span>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}