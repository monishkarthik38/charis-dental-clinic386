import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Lakshmi R.", role: "Dental Implant Patient", text: "The team made my dental implant procedure painless and reassuring. Spotless facility and incredibly kind staff." },
  { name: "Vignesh K.", role: "General Medicine", text: "Quick diagnosis, honest advice, and no unnecessary tests. Charis is now our family hospital in Chennai." },
  { name: "Anitha S.", role: "Orthodontic Treatment", text: "My braces journey was smooth from start to finish. Dr. Karthik is a true professional. Highly recommend!" },
];

export const Testimonials = () => (
  <section id="testimonials" className="py-20 md:py-28 bg-secondary/40">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Patient Stories</div>
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
          Trusted by families across Chennai
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <figure key={t.name} className="bg-card p-8 rounded-2xl border border-border shadow-soft hover:shadow-card transition-all">
            <Quote className="h-8 w-8 text-primary/30 mb-4" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent text-accent" />
              ))}
            </div>
            <blockquote className="text-foreground/85 leading-relaxed">"{t.text}"</blockquote>
            <figcaption className="mt-6 pt-6 border-t border-border">
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
