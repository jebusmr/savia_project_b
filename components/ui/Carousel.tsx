"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface CarouselProps {
  children: ReactNode;
}

export default function Carousel({
  children,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  return (
    <div className="relative">

      {/* Flechas */}

      <button
        onClick={() => emblaApi?.scrollPrev()}
        className="
          absolute
          -left-4
          top-1/2
          z-10
          -translate-y-1/2
          rounded-full
          bg-white
          p-2
          shadow-md
          hover:bg-gray-50
        "
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() => emblaApi?.scrollNext()}
        className="
          absolute
          -right-4
          top-1/2
          z-10
          -translate-y-1/2
          rounded-full
          bg-white
          p-2
          shadow-md
          hover:bg-gray-50
        "
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Carrusel */}

      <div
        ref={emblaRef}
        className="overflow-hidden"
      >
        <div className="flex gap-6">

          {children}

        </div>
      </div>
    </div>
  );
}