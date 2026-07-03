import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const Contact = () => (
  <section id="contact" className="py-20 md:py-28 bg-background">
    <div className="container">
      <div className="max-w-2xl mb-12">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Get In Touch</div>
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
          Visit us in <span className="text-gradient">Chennai</span>
        </h2>
        <p className="mt-5 text-muted-foreground text-lg">We're here to help — by phone, email, or in person.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          {[
            { icon: MapPin, title: "Address", lines: ["123 Anna Salai, T. Nagar,", "Chennai, Tamil Nadu 600017"] },
            { icon: Phone, title: "Phone", lines: ["+91 98765 43210", "Emergency: +91 98765 43211"] },
            { icon: Mail, title: "Email", lines: ["care@charishospital.com", "appointments@charishospital.com"] },
            { icon: Clock, title: "Hours", lines: ["Mon – Sat: 8:00 AM – 9:00 PM", "Sun: 9:00 AM – 2:00 PM (Emergency 24/7)"] },
          ].map((c) => (
            <div key={c.title} className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:shadow-soft transition-all">
              <div className="h-12 w-12 shrink-0 rounded-xl bg-primary-soft grid place-items-center text-primary">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold mb-1">{c.title}</div>
                {c.lines.map((l) => (
                  <div key={l} className="text-sm text-muted-foreground">{l}</div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border border-border shadow-card min-h-[400px]">
          <iframe
            title="Charis Dental Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.6!2d80.2337!3d13.0418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzMwLjUiTiA4MMKwMTQnMDEuNCJF!5e0!3m2!1sen!2sin!4v1700000000000"
            className="w-full h-full min-h-[400px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  </section>
);
