import { Stethoscope, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export const Footer = () => (
  <footer className="bg-foreground text-background pt-16 pb-8">
    <div className="container">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-xl bg-primary-gradient grid place-items-center">
              <Stethoscope className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-display font-bold">Charis</div>
              <div className="text-[10px] opacity-70 -mt-0.5">Dental Clinic</div>
            </div>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Advanced dental & dental care in Chennai — built around trust, hygiene and clinical excellence.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social link" className="h-9 w-9 rounded-lg bg-background/10 hover:bg-primary grid place-items-center transition-colors">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol title="Quick Links" links={[
          ["Home", "#home"], ["About", "#about"], ["Doctors", "#doctors"], ["Testimonials", "#testimonials"], ["Contact", "#contact"],
        ]} />
        <FooterCol title="Services" links={[
          ["Dental Care", "#services"], ["General Medicine", "#services"], ["Diagnostics", "#services"], ["Preventive Care", "#services"], ["Emergency", "#contact"],
        ]} />

        <div>
          <h4 className="font-display font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>123 Anna Salai, T. Nagar</li>
            <li>Chennai, Tamil Nadu 600017</li>
            <li>+91 98765 43210</li>
            <li>care@charishospital.com</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs opacity-70">
        <div>© {new Date().getFullYear()} Charis Dental Clinic. All rights reserved.</div>
        <div>Best Dental Hospital in Chennai · Dental Care</div>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ title, links }: { title: string; links: [string, string][] }) => (
  <div>
    <h4 className="font-display font-semibold mb-4">{title}</h4>
    <ul className="space-y-2 text-sm">
      {links.map(([l, h]) => (
        <li key={l}><a href={h} className="opacity-80 hover:opacity-100 hover:text-primary-glow transition-colors">{l}</a></li>
      ))}
    </ul>
  </div>
);
