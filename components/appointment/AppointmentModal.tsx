"use client";

import Modal from "@/components/ui/Modal";
import AppointmentStepper from "./AppointmentStepper";
import { Specialist } from "@/types/specialist";

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
  specialist: Specialist;
}

export default function AppointmentModal({
  open,
  onClose,
  specialist,
}: AppointmentModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Agenda tu cita"
    >
      <AppointmentStepper specialist={specialist} />
    </Modal>
  );
}