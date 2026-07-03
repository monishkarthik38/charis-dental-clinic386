import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";

const doctors = [
  { name: "Dr. Arjun Ramesh", img: doc1, qual: "BDS, MDS — Endodontics", spec: "Senior Dental Surgeon", years: 14 },
  { name: "Dr. Priya Sundaram", img: doc2, qual: "MBBS, MD — General Medicine", spec: "Consultant Physician", years: 12 },
  { name: "Dr. Karthik Iyer", img: doc3, qual: "BDS, MDS — Orthodontics", spec: "Implants & Braces Specialist", years: 10 },
];

export const Doctors = () => (
  <section id="doctors" className="py-20 md:py-28 bg-secondary/40">
    <div className="container">
      <div className="max-w-2xl mx-auto text-center mb-14">
        <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Meet The Team</div>
        <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
          Doctors who truly listen
        </h2>
        <p className="mt-5 text-muted-foreground text-lg">
          A multidisciplinary team of specialists committed to ethical, evidence-based care.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((d) => (
          <div
            key={d.name}
            className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
          >
            <div className="aspect-[4/5] overflow-hidden bg-primary-soft">
              <img
                src={d.img}
                alt={`${d.name} — ${d.spec} at Charis Dental Clinic Chennai`}
                loading="lazy"
                width={768}
                height={896}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-xl">{d.name}</h3>
              <div className="text-primary text-sm font-medium mt-1">{d.spec}</div>
              <div className="text-sm text-muted-foreground mt-2">{d.qual}</div>
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Experience</span>
                <span className="font-semibold">{d.years}+ years</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
