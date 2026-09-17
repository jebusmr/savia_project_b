"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        backdrop-blur-sm
        p-4
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-5xl
          rounded-3xl
          bg-white
          shadow-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <div className="flex items-center justify-between border-b p-6">

          <div>

            {title && (
              <h2 className="text-2xl font-bold text-[#203564]">
                {title}
              </h2>
            )}

          </div>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              transition
              hover:bg-gray-100
            "
          >
            <X className="h-6 w-6" />
          </button>

        </div>

        <div className="p-6">

          {children}

        </div>

      </div>
    </div>
  );
}