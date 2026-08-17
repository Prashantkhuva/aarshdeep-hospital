import { Hero } from "@/components/Hero";
import { Departments } from "@/components/Departments";
import { Doctors } from "@/components/Doctors";
import { Facilities } from "@/components/Facilities";
import { Testimonials } from "@/components/Testimonials";
import { CTABand } from "@/components/CTABand";

export default function Home() {
  return (
    <main>
      <Hero />
      <Departments />
      <Doctors />
      <Facilities />
      <Testimonials />
      <CTABand />
    </main>
  );
}
