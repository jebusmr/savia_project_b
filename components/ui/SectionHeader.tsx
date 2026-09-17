interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div
      className={`mb-8 ${
        centered ? "text-center" : ""
      }`}
    >
      <h2 className="text-2xl font-bold text-[#203564] md:text-3xl">
        {title}
      </h2>

      {description && (
        <p
          className={`mt-2 text-gray-600 ${
            centered
              ? "mx-auto max-w-3xl"
              : "max-w-3xl"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}