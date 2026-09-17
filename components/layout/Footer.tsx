import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Globe,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-5 border-t border-[var(--color-border)] bg-[var(--color-surface)]">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-10 md:grid-cols-2 lg:grid-cols-4">

        {/* SAVIA */}
        <div>

          <h2 className="text-3xl font-bold text-[var(--color-primary)]">
            SAVIA
          </h2>

          <p className="mt-2 font-semibold text-[var(--color-secondary)]">
            Agencia Piedadense para la Salud y el Desarrollo A.C.
          </p>

          <p className="mt-6 leading-7 text-[var(--color-text-light)]">
            Conectamos personas con profesionales confiables para construir
            comunidades más saludables, informadas y solidarias.
          </p>

        </div>

        {/* Plataforma */}
        <div>

          <h3 className="mb-5 text-lg font-bold text-[var(--color-text)]">
            Plataforma
          </h3>

          <nav className="space-y-3 text-[var(--color-text-light)]">

            <Link href="/">
              Inicio
            </Link>

            <br />

            <Link href="/especialidades">
              Especialidades
            </Link>

            <br />

            <Link href="/servicios">
              Servicios
            </Link>

            <br />

            <Link href="/areas_salud">
              Salud
            </Link>



          </nav>

        </div>

        {/* Organización */}
        <div>

          <h3 className="mb-5 text-lg font-bold text-[var(--color-text)]">
            Organización
          </h3>

          <nav className="space-y-3 text-[var(--color-text-light)]">

            <Link href="/savia/quienes-somos">
              Nosotros
            </Link>

            <br />

            <Link href="/savia/mision-vision">
              Misión y Visión
            </Link>

            <br />

            <Link href="/savia/asociacion-civil">
              La Asociación Civil
            </Link>

            <br />

            <Link href="/savia/transparencia">
              Transparencia
            </Link>

          </nav>

        </div>

        {/* Contacto */}
        <div>

          <h3 className="mb-5 text-lg font-bold text-[var(--color-text)]">
            Contacto
          </h3>

          <div className="space-y-4 text-[var(--color-text-light)]">

            <div className="flex items-center gap-3">
              <Mail size={18} />
              saviacontactosavia@gmail.com
            </div>

            <div className="flex items-center gap-3">
              <MessageCircle size={18} />
              WhatsApp
            </div>

            <div className="flex items-center gap-3">
              <Globe size={18} />
               Facebook
            </div>

            <div className="flex items-center gap-3">
              <Globe size={18} />
               Instagram
            </div>

          </div>

        </div>

      </div>

      {/* Línea inferior */}

      <div className="border-t border-[var(--color-border)]">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-[var(--color-text-light)] md:flex-row">

          <p>
            © 2026 SAVIA A.C. Todos los derechos reservados.
          </p>

          <p className="font-medium text-[var(--color-primary)]">
            La confianza es el primer paso hacia una mejor salud.
          </p>

        </div>

      </div>

    </footer>
  );
}