import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FAQ } from "@/components/FAQ";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about painless root canals, dental implants, tooth removal, children's dentistry, hygiene and booking at Aarshdeep Dental Clinic, Rajkot.",
};

export default function FaqPage() {
  return (
    <main>
      <PageHero
        eyebrow="Good to know"
        title="Questions, answered"
        description="Straight answers to the questions patients ask us most — about pain, implants, children's care and how to book."
      />

      <FAQ />

      <CTABand />
    </main>
  );
}
