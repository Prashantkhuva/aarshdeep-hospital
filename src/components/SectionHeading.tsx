interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "light" | "dark";
  maskTitle?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  maskTitle = false,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <p className="sec-head-item flex items-center gap-3 font-mono text-[0.66rem] font-medium uppercase tracking-[0.28em] text-ink-soft">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-gold" />
        {eyebrow}
      </p>
      <h2
        className={`mt-4 overflow-hidden font-display text-4xl font-semibold tracking-tight md:text-5xl ${
          tone === "dark" ? "text-background" : "text-ink"
        }`}
      >
        <span className="block">
          {maskTitle
            ? title.split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="sec-head-char inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))
            : title}
        </span>
      </h2>
      {description ? (
        <p
          className={`sec-head-item mt-4 max-w-xl text-base leading-relaxed ${
            tone === "dark" ? "text-background/60" : "text-ink-soft"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
