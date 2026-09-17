import { ReactNode } from "react";

interface TimelineItem {
  title: string;
  subtitle: string;
  period: string;
  description?: string;
}

interface TimelineProps {
  icon: ReactNode;
  items: TimelineItem[];
}

export default function Timeline({
  icon,
  items,
}: TimelineProps) {
  return (
    <div className="relative border-l-2 border-emerald-200 pl-6 md:pl-8">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative mb-8 last:mb-0"
        >
          {/* Icono */}

          <div
            className="
              absolute
              -left-[39px]
              md:-left-[43px]
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-emerald-100
              text-emerald-700
            "
          >
            {icon}
          </div>

          {/* Tarjeta */}

          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              transition
              duration-300
              hover:shadow-md
            "
          >
            <h3 className="text-lg font-semibold text-[#203564]">
              {item.title}
            </h3>

            <p className="mt-1 font-medium text-emerald-700">
              {item.subtitle}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              {item.period}
            </p>

            {item.description && (
              <p className="mt-4 leading-7 text-gray-700">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}