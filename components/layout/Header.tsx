export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-xl text-white">
            🌿
          </div>

          <div>
            <h1 className="text-2xl font-bold text-emerald-700">
              SAVIA
            </h1>

            <p className="text-xs text-gray-500">
              Salud y Desarrollo
            </p>
          </div>

        </div>

        {/* Navegación */}
        <nav className="hidden items-center gap-8 text-gray-700 lg:flex">

          <a href="#" className="transition hover:text-emerald-600">
            Especialistas
          </a>

          <a href="#" className="transition hover:text-emerald-600">
            Especialidades
          </a>

          <a href="#" className="transition hover:text-emerald-600">
            Programas
          </a>

          <a href="#" className="transition hover:text-emerald-600">
            Comunidad
          </a>

        </nav>

        {/* Botón principal */}
        <button className="rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
          Únete a SAVIA
        </button>

      </div>
    </header>
  );
}