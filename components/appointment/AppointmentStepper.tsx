"use client";

import { useState } from "react";

import { Specialist } from "@/types/specialist";

import StepIndicator from "./StepIndicator";
import ServiceStep from "./ServiceStep";
import ModalityStep from "./ModalityStep";
import ReasonStep from "./ReasonStep";
import DateStep from "./DateStep";
import TimeStep from "./TimeStep";
import PatientInfoStep from "./PatientInfoStep";
import ConfirmationStep from "./ConfirmationStep";

interface AppointmentStepperProps {
  specialist: Specialist;
}

export default function AppointmentStepper({
  specialist,
}: AppointmentStepperProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const [appointmentData, setAppointmentData] = useState({
    service: "",
    modality: "",
    reason: "",
    otherReason: "",
    date: undefined as Date | undefined,
    time: "",

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [appointmentResult, setAppointmentResult] =
    useState<any>(null);

  const totalSteps = 7;

  const isCurrentStepValid = () => {
    if (currentStep === 1) {
      return Boolean(appointmentData.service);
    }

    if (currentStep === 2) {
      return Boolean(appointmentData.modality);
    }

    if (currentStep === 3) {
      if (!appointmentData.reason) {
        return false;
      }

      if (
        appointmentData.reason === "other" &&
        appointmentData.otherReason.trim().length < 3
      ) {
        return false;
      }

      return true;
    }

    if (currentStep === 4) {
      return Boolean(appointmentData.date);
    }

    if (currentStep === 5) {
      return Boolean(appointmentData.time);
    }

    if (currentStep === 6) {
      const firstNameValid =
        appointmentData.firstName.trim().length >= 3;

      const lastNameValid =
        appointmentData.lastName.trim().length >= 3;

      const emailValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
          appointmentData.email
        );

      const phoneValid =
        /^\d{10}$/.test(
          appointmentData.phone
        );

      return (
        firstNameValid &&
        lastNameValid &&
        emailValid &&
        phoneValid
      );
    }

    return true;
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (appointmentResult) {
    const appointment = appointmentResult.data;

    const appointmentDate = new Date(
      appointment.date
    ).toLocaleDateString("es-MX", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-3xl text-emerald-600">
                ✓
              </span>
            </div>

            <h2 className="mt-5 text-2xl font-bold text-gray-900">
              ¡Cita registrada correctamente!
            </h2>

            <p className="mt-2 text-gray-600">
              Tu solicitud de cita ha sido registrada y está
              pendiente de confirmación.
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-6">

            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-sm text-gray-500">
                Folio de cita
              </span>

              <span className="font-semibold text-gray-900">
                {appointment.id}
              </span>
            </div>

            <div className="mt-5 space-y-5">

              <div>
                <p className="text-sm text-gray-500">
                  Especialista
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {appointment.specialist.firstName}{" "}
                  {appointment.specialist.lastName}
                </p>

                {appointment.specialist.title && (
                  <p className="text-sm text-gray-500">
                    {appointment.specialist.title}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Servicio
                </p>

                <p className="mt-1 font-semibold text-gray-900">
                  {appointment.service.name}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <p className="text-sm text-gray-500">
                    Fecha
                  </p>

                  <p className="mt-1 font-medium capitalize text-gray-900">
                    {appointmentDate}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Horario
                  </p>

                  <p className="mt-1 font-medium text-gray-900">
                    {appointment.time}
                  </p>
                </div>

              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Modalidad
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {appointment.modality}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Motivo de la consulta
                </p>

                <p className="mt-1 text-gray-900">
                  {appointment.reason}
                </p>
              </div>

            </div>
          </div>

          <div className="mt-6 flex items-center justify-center">
            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
              Estado: Pendiente de confirmación
            </span>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">

      <StepIndicator
        currentStep={currentStep}
        totalSteps={totalSteps}
      />

      <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        {currentStep === 1 && (
          <ServiceStep
            services={specialist.services}
            value={appointmentData.service}
            onChange={(value) =>
              setAppointmentData({
                ...appointmentData,
                service: value,
              })
            }
          />
        )}

        {currentStep === 2 && (
          <ModalityStep
            modalities={specialist.consultation.modalities}
            value={appointmentData.modality}
            onChange={(value) =>
              setAppointmentData({
                ...appointmentData,
                modality: value,
              })
            }
          />
        )}

        {currentStep === 3 && (
          <ReasonStep
            value={appointmentData.reason}
            otherReason={appointmentData.otherReason}
            onChange={(value) =>
              setAppointmentData({
                ...appointmentData,
                reason: value,
              })
            }
            onOtherReasonChange={(value) =>
              setAppointmentData({
                ...appointmentData,
                otherReason: value,
              })
            }
          />
        )}

        {currentStep === 4 && (
          <DateStep
            value={appointmentData.date}
            onChange={(date) =>
              setAppointmentData({
                ...appointmentData,
                date,
              })
            }
          />
        )}

        {currentStep === 5 && (
          <TimeStep
            value={appointmentData.time}
            onChange={(time) =>
              setAppointmentData({
                ...appointmentData,
                time,
              })
            }
            specialistId={specialist.id}
            serviceId={appointmentData.service}
            modality={appointmentData.modality}
            date={appointmentData.date}
          />
        )}

        {currentStep === 6 && (
          <PatientInfoStep
            firstName={appointmentData.firstName}
            lastName={appointmentData.lastName}
            email={appointmentData.email}
            phone={appointmentData.phone}
            onChange={(field, value) =>
              setAppointmentData({
                ...appointmentData,
                [field]: value,
              })
            }
          />
        )}

        {currentStep === 7 && (
          <ConfirmationStep
            appointment={{
              service: appointmentData.service,
              modality: appointmentData.modality,
              reason:
                appointmentData.reason === "other"
                  ? appointmentData.otherReason.trim()
                  : appointmentData.reason,
              date: appointmentData.date,
              time: appointmentData.time,
              firstName: appointmentData.firstName,
              lastName: appointmentData.lastName,
              email: appointmentData.email,
              phone: appointmentData.phone,
            }}
            specialist={specialist}
          />
        )}

      </div>

      <div className="mt-10 flex items-center justify-between">

        {/* Botón Anterior */}

        <button
          onClick={previousStep}
          disabled={currentStep === 1}
          className="
            rounded-lg
            border
            border-gray-300
            px-6
            py-3
            font-medium
            transition

            disabled:cursor-not-allowed
            disabled:opacity-40

            hover:bg-gray-50
          "
        >
          Anterior
        </button>

        {/* Botón Siguiente / Confirmar */}

        <button
          onClick={async () => {
            if (currentStep === totalSteps) {
              try {
                const response = await fetch(
                  "/api/appointments",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      specialistId:
                        specialist.id,

                      serviceId:
                        appointmentData.service,

                      date:
                        appointmentData.date,

                      time:
                        appointmentData.time,

                      modality:
                        appointmentData.modality,

                      reason:
                        appointmentData.reason === "other"
                          ? appointmentData.otherReason.trim()
                          : appointmentData.reason,

                      firstName:
                        appointmentData.firstName,

                      lastName:
                        appointmentData.lastName,

                      email:
                        appointmentData.email,

                      phone:
                        appointmentData.phone,
                    }),
                  }
                );

                const result =
                  await response.json();

                if (
                  !response.ok ||
                  !result.success
                ) {
                  throw new Error(
                    result.error ||
                      "No fue posible registrar la cita."
                  );
                }

                setAppointmentResult(result);

              } catch (error) {
                console.error(
                  "Error registrando cita:",
                  error
                );

                alert(
                  error instanceof Error
                    ? error.message
                    : "No fue posible registrar la cita."
                );
              }

              return;
            }

            nextStep();
          }}
          disabled={!isCurrentStepValid()}
          className="
            rounded-lg
            bg-emerald-600
            px-6
            py-3
            font-medium
            text-white
            transition

            hover:bg-emerald-700

            disabled:cursor-not-allowed
            disabled:bg-gray-300
          "
        >
          {currentStep === totalSteps
            ? "Confirmar cita"
            : "Siguiente"}
        </button>

      </div>

    </div>
  );
}