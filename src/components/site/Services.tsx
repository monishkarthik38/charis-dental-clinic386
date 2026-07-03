import { Sparkles, Stethoscope, Microscope, ShieldPlus } from "lucide-react";

const services = [
  {
    icon: Sparkles,
    title: "Dental Care",
    desc: "Root Canal, Implants, Braces, Teeth Cleaning & Whitening — complete oral health under expert dental surgeons.",
    tags: ["Root Canal", "Implants", "Braces", "Cleaning", "Whitening"],
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    desc: "Comprehensive consultation, chronic disease management and preventive screenings by experienced physicians.",
  },
  {
    icon: Microscope,
    title: "Diagnostics",
    desc: "Modern in-house lab and imaging — accurate, rapid reports to guide precise treatment decisions.",
  },
  {
    icon: ShieldPlus,
    title: "Preventive Care",
    desc: "Health check-up packages, vaccinations and lifestyle counseling to keep you and your family well.",
  },
];

export const Services = () => (
  <section id="services" className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Our Services</div>
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
          Specialised treatments, <span className="text-gradient">delivered with care</span>
        </h2>
        <p className="mt-5 text-muted-foreground text-lg">
          From routine check-ups to advanced procedures — every service is designed around comfort, safety and outcomes.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s) => (
          <article
            key={s.title}
            className="group relative p-8 rounded-2xl bg-gradient-to-b from-card to-secondary/40 border border-border hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-14 w-14 rounded-2xl bg-primary-soft grid place-items-center text-primary mb-6 group-hover:bg-primary-gradient group-hover:text-primary-foreground transition-all">
              <s.icon className="h-7 w-7" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-3">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
            {s.tags && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {s.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-primary-soft text-primary font-medium">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </section>
);
