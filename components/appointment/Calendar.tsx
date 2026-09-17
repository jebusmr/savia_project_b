"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
}

export default function Calendar({
  selected,
  onSelect,
}: CalendarProps) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
      "
    >
      <DayPicker
        mode="single"
        selected={selected}
        onSelect={onSelect}
        disabled={{ before: new Date() }}
        showOutsideDays
        weekStartsOn={1}
        className="mx-auto"
        modifiersClassNames={{
          selected:
            "bg-emerald-600 text-white rounded-full",
          today:
            "border border-emerald-600 rounded-full font-bold text-emerald-700",
        }}
      />
    </div>
  );
}