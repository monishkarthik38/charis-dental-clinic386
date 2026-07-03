import { Target, Eye, Heart } from "lucide-react";

export const About = () => (
  <section id="about" className="py-20 md:py-28 bg-secondary/40">
    <div className="container">
      <div className="max-w-2xl">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">About Us</div>
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
          Compassionate care, modern medicine — under one roof.
        </h2>
        <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
          Charis Dental Clinic is a trusted healthcare destination in Chennai, offering comprehensive dental and dental treatments. We blend advanced medical technology with sterile, hygienic facilities and a patient-first philosophy that puts your wellbeing at the center.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-6">
        {[
          { icon: Target, title: "Our Mission", desc: "To deliver accessible, world-class healthcare with empathy, integrity, and clinical excellence — for every patient who walks through our doors." },
          { icon: Eye, title: "Our Vision", desc: "To be Chennai's most trusted dental clinic, known for advanced treatment, ethical practice, and life-changing patient outcomes." },
          { icon: Heart, title: "Our Values", desc: "Patient first. Uncompromising hygiene. Continuous innovation. Honest, transparent care from consultation to recovery." },
        ].map((v) => (
          <div key={v.title} className="bg-card p-8 rounded-2xl border border-border shadow-soft">
            <div className="h-12 w-12 rounded-xl bg-primary-gradient grid place-items-center text-primary-foreground mb-5 shadow-soft">
              <v.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-3">{v.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
