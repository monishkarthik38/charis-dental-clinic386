import { ArrowRight, ShieldCheck } from "lucide-react";
import heroImg from "@/assets/hero-hospital.jpg";

export const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-background pt-28 md:pt-36 pb-20 md:pb-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: "hsl(var(--primary) / 0.06)", filter: "blur(120px)" }}
      />

      <div className="container relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 space-y-10 relative z-10 animate-fade-up">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-border bg-card/60 backdrop-blur-md rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-muted-foreground font-mono">
                Trusted by 10k+ Patients • Chennai
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight leading-[0.95] text-foreground">
                Advanced{" "}
                <span className="italic font-light text-muted-foreground">Dental</span>
                <br />
                Care You Can Trust
              </h1>
              <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed font-light">
                Expert doctors, modern technology, and compassionate care in Chennai —
                delivering medical excellence with a human touch.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#appointment"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-xs font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-all duration-500"
              >
                Book Appointment
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-8 py-4 border border-border text-foreground text-xs font-bold uppercase tracking-[0.2em] hover:bg-card transition-all duration-500"
              >
                Contact Us
              </a>
            </div>

            {/* Stats */}
            <div className="pt-12 grid grid-cols-3 gap-6 sm:gap-8 border-t border-border/60">
              {[
                { value: "15", suffix: "+", label: "Years Experience" },
                { value: "25", suffix: "+", label: "Specialists" },
                { value: "4.9", suffix: "", label: "Patient Rating" },
              ].map((s) => (
                <div key={s.label} className="space-y-1.5">
                  <p className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
                    {s.value}
                    {s.suffix && <span className="text-primary">{s.suffix}</span>}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 font-medium font-mono">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5 relative animate-fade-in">
            <div className="relative aspect-[4/5] overflow-hidden bg-card border border-border">
              <img
                src={heroImg}
                alt="Charis Dental Clinic — premium dental care facility in Chennai"
                width={1200}
                height={1500}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 mix-blend-luminosity"
              />
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 60%)" }}
              />

              {/* NABH Floating Plate */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-background/80 backdrop-blur-xl border border-border shadow-elegant flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 grid place-items-center border border-primary/30 bg-primary/5">
                  <ShieldCheck className="w-5 h-5 text-primary" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                    NABH Certified
                  </p>
                  <p className="text-[9px] text-muted-foreground uppercase tracking-[0.1em] font-mono mt-0.5 truncate">
                    Clinical Excellence Standards
                  </p>
                </div>
              </div>
            </div>

            {/* Tech corner accents */}
            <div aria-hidden className="absolute -top-3 -right-3 w-20 h-20 border-t border-r border-border pointer-events-none" />
            <div aria-hidden className="absolute -bottom-3 -left-3 w-20 h-20 border-b border-l border-border pointer-events-none" />
          </div>
        </div>

        {/* Brand watermark */}
        <div
          aria-hidden
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-[0.04] pointer-events-none whitespace-nowrap hidden lg:block select-none"
        >
          <span className="font-display text-[10rem] xl:text-[14rem] font-black uppercase tracking-[-0.05em] leading-none">
            CHARIS
          </span>
        </div>
      </div>
    </section>
  );
};
