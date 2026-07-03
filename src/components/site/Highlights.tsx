import { UserRound, Cpu, HeartHandshake, Siren } from "lucide-react";

const items = [
  { icon: UserRound, title: "Experienced Doctors", desc: "Board-certified specialists with decades of clinical expertise." },
  { icon: Cpu, title: "Advanced Equipment", desc: "State-of-the-art diagnostic and surgical technology." },
  { icon: HeartHandshake, title: "Affordable Care", desc: "Transparent pricing with insurance & EMI support." },
  { icon: Siren, title: "Emergency Support", desc: "24/7 ambulance and emergency response team." },
];

export const Highlights = () => (
  <section className="py-16 md:py-20 bg-background">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((it, i) => (
          <div
            key={it.title}
            className="group p-7 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-12 w-12 rounded-xl bg-primary-soft grid place-items-center text-primary mb-5 group-hover:bg-primary-gradient group-hover:text-primary-foreground transition-all">
              <it.icon className="h-6 w-6" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
