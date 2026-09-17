import Link from "next/link";
import {
  UserRound,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function RegistroPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-lg">
          
          {/* Encabezado */}
          <div className="bg-[#17365D] px-8 py-12 text-center text-white md:px-12">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/images/logo.jpeg"
                alt="SAVIA - Salud y desarrollo"
                className="h-16 w-auto object-contain"
              />
            </Link>

            <h1 className="mt-8 text-3xl font-bold md:text-4xl">
              Crear una cuenta en SAVIA
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-7 text-white/80">
              Elige cómo quieres utilizar SAVIA para comenzar tu registro.
            </p>
          </div>

          {/* Opciones */}
          <div className="px-6 py-10 md:px-12 md:py-14">
            <div className="grid gap-6 md:grid-cols-2">

              {/* Paciente */}
              <Link
                href="/registro/paciente"
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
                  <UserRound className="h-7 w-7 text-emerald-600" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#203564]">
                  Soy paciente
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Crea tu cuenta para encontrar profesionales de confianza,
                  consultar servicios y gestionar tus citas.
                </p>

                <div className="mt-7 inline-flex items-center gap-2 font-semibold text-[#203564]">
                  Crear cuenta de paciente
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              {/* Profesional */}
              <Link
                href="/registro/profesional"
                className="group rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#C7A76C] hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50">
                  <Stethoscope className="h-7 w-7 text-[#C7A76C]" />
                </div>

                <h2 className="mt-6 text-2xl font-bold text-[#203564]">
                  Soy profesional de la salud
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  Regístrate para formar parte de la red SAVIA, crear tu
                  perfil profesional y ofrecer tus servicios.
                </p>

                <div className="mt-7 inline-flex items-center gap-2 font-semibold text-[#203564]">
                  Registro profesional
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

            </div>

            {/* Verificación */}
            <div className="mx-auto mt-10 flex max-w-3xl items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />

              <div>
                <h3 className="font-semibold text-[#203564]">
                  Profesionales verificados por SAVIA
                </h3>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  La información de los profesionales será revisada antes de
                  que su perfil forme parte del directorio público de SAVIA.
                </p>
              </div>
            </div>

            {/* Iniciar sesión */}
            <div className="mt-10 text-center text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/login"
                className="font-semibold text-[#17365D] hover:text-[#102A49]"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}