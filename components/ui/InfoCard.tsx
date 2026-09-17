import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

export default function InfoCard({
  icon,
  title,
  children,
}: InfoCardProps) {
  return (
    <div
      className="
        flex-1
        rounded-2xl
        border
        border-gray-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:shadow-md
      "
    >
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-emerald-100 p-3 text-emerald-700">
          {icon}
        </div>

        <h3 className="text-lg font-semibold text-[#203564]">
          {title}
        </h3>

      </div>

      <div className="mt-5 space-y-3 text-gray-600">
        {children}
      </div>
    </div>
  );
}