type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const baseStyles =
    "rounded-xl px-6 py-3 font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700",
    secondary:
      "border border-emerald-600 text-emerald-700 hover:bg-emerald-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`}>
      {children}
    </button>
  );
}