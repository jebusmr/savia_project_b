import { Star } from "lucide-react";

interface RatingSummaryProps {
  rating: number;
  totalReviews: number;
  distribution: {
    stars: number;
    count: number;
  }[];
}

export default function RatingSummary({
  rating,
  totalReviews,
  distribution,
}: RatingSummaryProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">

        {/* Promedio */}

        <div className="text-center lg:w-52">

          <h3 className="text-5xl font-bold text-[#203564]">
            {rating.toFixed(1)}
          </h3>

          <div className="mt-3 flex justify-center gap-1">

            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                className="h-5 w-5 fill-amber-400 text-amber-400"
              />
            ))}

          </div>

          <p className="mt-3 text-sm text-gray-500">
            Basado en{" "}
            <span className="font-semibold text-[#203564]">
              {totalReviews}
            </span>{" "}
            opiniones verificadas
          </p>

        </div>

        {/* Distribución */}

        <div className="flex-1 space-y-4">

          {distribution.map((item) => {

            const percentage =
              totalReviews > 0
                ? (item.count / totalReviews) * 100
                : 0;

            return (

              <div
                key={item.stars}
                className="flex items-center gap-4"
              >

                <span className="w-16 text-sm font-medium text-gray-600">
                  {item.stars} estrellas
                </span>

                <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-200">

                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

                <span className="w-10 text-right text-sm font-semibold text-[#203564]">
                  {item.count}
                </span>

              </div>

            );
          })}

        </div>

      </div>

    </div>
  );
}