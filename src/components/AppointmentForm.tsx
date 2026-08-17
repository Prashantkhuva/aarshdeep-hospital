"use client";

import { useState, useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { stepReveal } from "@/lib/stepReveal";
import { CONTACT, DEPARTMENTS } from "@/data/content";
import { Icon } from "@/components/Icon";

interface FormState {
  name: string;
  phone: string;
  service: string;
  date: string;
}

const INITIAL: FormState = { name: "", phone: "", service: "", date: "" };

function isSunday(dateStr: string): boolean {
  if (!dateStr) return false;
  return new Date(dateStr).getDay() === 0;
}

function getMinDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getNextSunday(): string {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const sunday = new Date(today);
  sunday.setDate(today.getDate() + daysUntilSunday);
  return sunday.toISOString().split("T")[0];
}

export function AppointmentForm() {
  const ref = useScrollReveal<HTMLDivElement>((ctx, el) => {
    stepReveal(el, ".form-field", { y: 24, start: "top 90%", end: "top 72%" });
  });
  const [form, setForm] = useState<FormState>(INITIAL);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const minDate = useMemo(() => getMinDate(), []);

  const update =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
      if (field === "date") {
        setError(
          isSunday(value)
            ? "Sundays are closed — please pick another date."
            : "",
        );
      }
    };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (isSunday(form.date)) {
      setError("Sundays are closed — please pick another date.");
      return;
    }
    setError("");
    const lines = [
      "Hello Aarshdeep Dental Clinic, I'd like to book an appointment.",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service || "General consultation"}`,
      form.date ? `Preferred date: ${form.date}` : null,
    ]
      .filter((line): line is string => line !== null)
      .join("\n");
    window.open(
      `${CONTACT.whatsappHref}?text=${encodeURIComponent(lines)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15";

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-line bg-panel/60 p-6 md:p-8"
    >
      <p className="flex items-center gap-2.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-primary">
        <Icon name="toothCrown" className="h-4 w-4 text-gold" />
        Request an appointment
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink">
        Tell us a little, and we&rsquo;ll do the rest.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        Fill the form and it opens in WhatsApp to the clinic — no waiting on
        hold. We confirm your slot within working hours.
      </p>

      {sent ? (
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary-tint px-5 py-4">
          <p className="font-display text-lg font-medium text-primary">
            Thank you, {form.name || "friend"}!
          </p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            WhatsApp should have opened with your message. If it didn&rsquo;t,
            message us directly on{" "}
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline decoration-gold/40 underline-offset-2"
            >
              WhatsApp
            </a>{" "}
            or call{" "}
            <a
              href={CONTACT.phoneHref}
              className="font-semibold text-primary underline decoration-gold/40 underline-offset-2"
            >
              {CONTACT.phoneDisplay}
            </a>
            .
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="form-field grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                Full name
              </span>
              <input
                type="text"
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                Phone number
              </span>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={update("phone")}
                placeholder="+91 …"
                className={inputClass}
              />
            </label>
          </div>

          <div className="form-field grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                Service
              </span>
              <select
                value={form.service}
                onChange={update("service")}
                className={inputClass}
              >
                <option value="">General consultation</option>
                {DEPARTMENTS.map((department) => (
                  <option key={department.name} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                Preferred date
              </span>
              <input
                type="date"
                value={form.date}
                onChange={update("date")}
                min={minDate}
                className={inputClass}
              />
              <span className="mt-1 block text-xs text-ink-soft">
                Sundays closed
              </span>
            </label>
          </div>

          {error && (
            <p className="form-field rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn-sheen form-field mt-2 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-primary/90"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Send via WhatsApp
          </button>
        </form>
      )}
    </div>
  );
}
