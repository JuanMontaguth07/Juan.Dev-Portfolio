import { useFormatter, useTranslations } from "next-intl";
import { Reveal } from "@/components/reveal";
import { certifications, type Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

// Hand-cut, slightly irregular outlines so the badges read like stickers,
// cycled across the grid so neighbours never share a shape.
const shapes = [
  "polygon(97% 54.2%, 92.7% 73.9%, 69.4% 93.2%, 40.5% 98.1%, 17.8% 86.5%, 2.4% 62.5%, 3.8% 39.1%, 19.7% 11.8%, 38.6% 2.6%, 70.3% 4.7%, 90.6% 27.4%)",
  "polygon(95.7% 67%, 82.9% 85.4%, 58.3% 98.9%, 38.7% 96%, 14% 80.8%, 5.3% 65.2%, 4.3% 38.2%, 19.4% 12.7%, 39.8% 1.5%, 58.3% 3.6%, 84.6% 16.7%, 95.1% 37.5%)",
  "polygon(94% 67.7%, 75.7% 91.3%, 43.5% 97.6%, 25.2% 90.6%, 6.8% 69.6%, 3.4% 41.8%, 15.2% 16.3%, 35.6% 2.5%, 65.8% 3.1%, 89% 21.1%, 97.8% 45.6%)",
];

// Pastel fills stay the same in both themes: the badge is the colour.
const tones: Record<Certification["tone"], { bg: string; icon: string }> = {
  sage: { bg: "bg-[#bcd2cb]", icon: "text-[#4f8a76]" },
  peach: { bg: "bg-[#ecc9b7]", icon: "text-[#d0643c]" },
};

export function CertificationBadges() {
  const t = useTranslations("Journey");
  const format = useFormatter();

  return (
    <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
      {certifications.map((cert, i) => {
        const { icon: Icon } = cert;
        const tone = tones[cert.tone];
        const date = format.dateTime(new Date(`${cert.issued}T00:00:00Z`), {
          dateStyle: "medium",
          timeZone: "UTC",
        });

        return (
          <li key={cert.slug} className="group">
            <Reveal delay={i * 0.05}>
              <div
                className={cn(
                  "flex aspect-square flex-col items-center justify-center px-[14%] text-center text-zinc-900 transition-transform duration-300 group-hover:scale-[1.04]",
                  i % 2 === 0
                    ? "group-hover:-rotate-2"
                    : "group-hover:rotate-2",
                  tone.bg,
                )}
                style={{ clipPath: shapes[i % shapes.length] }}
              >
                <Icon
                  className={cn("h-7 w-7 sm:h-8 sm:w-8", tone.icon)}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <p className="mt-2 font-serif text-base leading-tight sm:text-lg">
                  {cert.name}
                </p>
                <p className="mt-2 text-[9px] font-semibold tracking-widest text-zinc-600 uppercase sm:text-[10px]">
                  {t("certificationIssued", { date })}
                </p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}
