"use client";

import { User, Mail, Phone } from "lucide-react";

interface PatientInfoStepProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  onChange: (field: string, value: string) => void;
}

export default function PatientInfoStep({
  firstName,
  lastName,
  email,
  phone,
  onChange,
}: PatientInfoStepProps) {

  // Validaciones

  const firstNameIsValid =
    firstName.length === 0 ||
    firstName.trim().length >= 3;

  const lastNameIsValid =
    lastName.length === 0 ||
    lastName.trim().length >= 3;

  const emailIsValid =
    email.length === 0 ||
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const phoneIsValid =
    phone.length === 0 ||
    phone.length === 10;

  return (
    <div className="mx-auto max-w-3xl">

      {/* Encabezado */}

      <div className="text-center">

        <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
          Ya casi terminamos
        </h2>

        <p className="mt-3 text-gray-600">
          Necesitamos algunos datos para que el especialista pueda confirmar
          tu cita y ponerse en contacto contigo si es necesario.
        </p>

      </div>

      {/* Formulario */}

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {/* Nombre */}

        <div>

          <label className="mb-2 block font-medium text-[#203564]">
            Nombre
          </label>

          <div className="relative">

            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={firstName}
              onChange={(e) =>
                onChange("firstName", e.target.value)
              }
              placeholder="Jesús"
              className={`
                w-full
                rounded-xl
                border
                py-3
                pl-12
                pr-4
                outline-none
                transition

                ${
                  firstName.length > 0 && !firstNameIsValid
                    ? "border-red-500"
                    : "border-gray-300 focus:border-emerald-500"
                }
              `}
            />

          </div>

          {firstName.length > 0 && !firstNameIsValid && (
            <p className="mt-2 text-sm text-red-600">
              El nombre debe tener al menos 3 caracteres.
            </p>
          )}

        </div>

        {/* Apellidos */}

        <div>

          <label className="mb-2 block font-medium text-[#203564]">
            Apellidos
          </label>

          <div className="relative">

            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={lastName}
              onChange={(e) =>
                onChange("lastName", e.target.value)
              }
              placeholder="Ramírez Martínez"
              className={`
                w-full
                rounded-xl
                border
                py-3
                pl-12
                pr-4
                outline-none
                transition

                ${
                  lastName.length > 0 && !lastNameIsValid
                    ? "border-red-500"
                    : "border-gray-300 focus:border-emerald-500"
                }
              `}
            />

          </div>

          {lastName.length > 0 && !lastNameIsValid && (
            <p className="mt-2 text-sm text-red-600">
              Los apellidos deben tener al menos 3 caracteres.
            </p>
          )}

        </div>

        {/* Correo */}

        <div>

          <label className="mb-2 block font-medium text-[#203564]">
            Correo electrónico
          </label>

          <div className="relative">

            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                onChange("email", e.target.value)
              }
              placeholder="nombre@correo.com"
              className={`
                w-full
                rounded-xl
                border
                py-3
                pl-12
                pr-4
                outline-none
                transition

                ${
                  email.length > 0 && !emailIsValid
                    ? "border-red-500"
                    : "border-gray-300 focus:border-emerald-500"
                }
              `}
            />

          </div>

          {email.length > 0 && !emailIsValid && (
            <p className="mt-2 text-sm text-red-600">
              Ingresa un correo electrónico válido.
            </p>
          )}

        </div>

        {/* Teléfono */}

        <div>

          <label className="mb-2 block font-medium text-[#203564]">
            Teléfono
          </label>

          <div className="relative">

            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

            <input
              type="tel"
              value={phone}
              onChange={(e) => {

                const numericValue = e.target.value.replace(/\D/g, "");

                if (numericValue.length <= 10) {
                  onChange("phone", numericValue);
                }

              }}
              placeholder="3521234567"
              inputMode="numeric"
              className={`
                w-full
                rounded-xl
                border
                py-3
                pl-12
                pr-4
                outline-none
                transition

                ${
                  phone.length > 0 && !phoneIsValid
                    ? "border-red-500"
                    : "border-gray-300 focus:border-emerald-500"
                }
              `}
            />

          </div>

          {phone.length > 0 && !phoneIsValid && (
            <p className="mt-2 text-sm text-red-600">
              El teléfono debe contener exactamente 10 dígitos.
            </p>
          )}

        </div>

      </div>

      {/* Aviso */}

      <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">

        <p className="text-sm leading-6 text-gray-700">
          Tu información será utilizada únicamente para gestionar tu cita y
          nunca será compartida con terceros sin tu consentimiento.
        </p>

      </div>

    </div>
  );
}