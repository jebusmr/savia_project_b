import {
  Mail,
  MessageCircle,
  HeartHandshake,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function ContactoPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            SAVIA
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-[#203564] md:text-6xl">
            Estamos para escucharte
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 md:text-xl">
            Si quieres conocer más sobre SAVIA, colaborar con nuestros
            proyectos o tienes alguna pregunta, nos gustaría conocer tu
            mensaje.
          </p>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Correo */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                <Mail className="h-7 w-7 text-emerald-600" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#203564]">
                Correo electrónico
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Escríbenos para recibir información sobre SAVIA, sus proyectos
                y formas de colaboración.
              </p>

              <p className="mt-5 font-semibold text-[#203564]">
                saviacontactosavia@gmail.com
              </p>
            </div>

            {/* WhatsApp */}
            <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                <MessageCircle className="h-7 w-7 text-emerald-600" />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#203564]">
                Atención y comunicación
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Próximamente habilitaremos canales adicionales de comunicación
                para facilitar el contacto con nuestra comunidad.
              </p>

              <span className="mt-5 inline-flex rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-500">
                Próximamente
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Colaboración */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <HeartHandshake className="mx-auto h-11 w-11 text-emerald-600" />

          <h2 className="mt-5 text-3xl font-bold text-[#203564] md:text-4xl">
            También puedes formar parte de SAVIA
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-600">
            SAVIA busca construir redes de colaboración entre personas,
            profesionales, instituciones y organizaciones que compartan el
            compromiso con la salud, el bienestar y el desarrollo humano.
          </p>
        </div>
      </section>

      {/* Ubicación */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <MapPin className="mx-auto h-10 w-10 text-emerald-600" />

          <h2 className="mt-5 text-3xl font-bold text-[#203564] md:text-4xl">
            SAVIA y nuestra comunidad
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            Nuestro trabajo comienza con la visión de desarrollar iniciativas 
            que puedan crecer y generar impacto en otras comunidades.
          </p>
        </div>
      </section>

      {/* Cierre */}
      <section className="bg-[#203564] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Construyamos una comunidad más saludable
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/80">
            Cada vínculo, cada proyecto y cada colaboración puede contribuir a
            mejorar el bienestar de nuestra comunidad.
          </p>

          <div className="mt-8">
            <a
              href="mailto:contacto@savia.org"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-semibold text-[#203564] transition hover:scale-[1.02]"
            >
              Escríbenos
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}