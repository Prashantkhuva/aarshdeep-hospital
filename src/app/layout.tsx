import type { Metadata } from "next";
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "Aarshdeep Dental Clinic — Healthy smiles, trusted care | Rajkot",
    template: "%s | Aarshdeep Dental Clinic",
  },
  description:
    "A trusted, family-focused dental clinic on Raiya Road, Rajkot. Dental implants, tooth removal, painless root canals, orthodontics & braces, cosmetic dentistry, pediatric care, periodontics and preventive care — under one roof at Ambika Shopping Center.",
  keywords: [
    "Aarshdeep Dental Clinic",
    "dental clinic Rajkot",
    "Dr. Ashish Makwana",
    "dental implants Rajkot",
    "root canal treatment Rajkot",
    "braces and aligners Rajkot",
    "dentist Raiya Road",
    "tooth removal Rajkot",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable} bg-background font-body text-ink antialiased`}
      >
        <Preloader />
        <SmoothScroll />
        <ScrollProgress />
        <BackToTop />
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <noscript>
          <style>{`.preloader-sheet { display: none; }`}</style>
        </noscript>
      </body>
    </html>
  );
}
