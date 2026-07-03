import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarCheck, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[+\d\s-]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(120),
  date: z.string().min(1, "Select a date"),
  department: z.string().min(1, "Choose a department"),
  message: z.string().trim().max(500).optional(),
});

const departments = ["Dental Care", "General Medicine", "Diagnostics", "Preventive Care"];

export const Appointment = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const result = schema.safeParse(data);
    if (!result.success) {
      const fieldErrs: Record<string, string> = {};
      result.error.issues.forEach((i) => { fieldErrs[i.path[0] as string] = i.message; });
      setErrors(fieldErrs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      const { data: res, error } = await supabase.functions.invoke("book-appointment", {
        body: result.data,
      });
      if (error || !res?.success) {
        throw new Error(error?.message || res?.error || "Failed to submit");
      }
      setSubmitted(true);
      toast({ title: "Appointment requested", description: "Our team will call you shortly to confirm." });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Submission failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="appointment" className="py-20 md:py-28 bg-background">
      <div className="container grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Book a Visit</div>
          <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight">
            Schedule your <span className="text-gradient">appointment</span> today
          </h2>
          <p className="mt-5 text-muted-foreground text-lg max-w-md">
            Reserve a slot with our specialists. We'll confirm by phone within a few hours.
          </p>
          <ul className="mt-8 space-y-3">
            {["No long waits — same-day slots available", "Friendly, multilingual support staff", "Insurance & cashless options"].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-3xl border border-border shadow-card p-6 md:p-10">
          {submitted ? (
            <div className="text-center py-10 animate-fade-in">
              <div className="mx-auto h-16 w-16 rounded-full bg-success/10 grid place-items-center mb-5">
                <CheckCircle2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="font-display font-bold text-2xl">Request received!</h3>
              <p className="text-muted-foreground mt-2">Our team will contact you shortly to confirm your appointment.</p>
              <Button variant="soft" className="mt-6" onClick={() => setSubmitted(false)}>Book another</Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Full Name" name="name" placeholder="Your name" error={errors.name} />
                <Field label="Phone Number" name="phone" type="tel" placeholder="+91 ..." error={errors.phone} />
              </div>
              <Field label="Email" name="email" type="email" placeholder="you@example.com" error={errors.email} />
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Preferred Date" name="date" type="date" error={errors.date} />
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <select
                    id="department"
                    name="department"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    defaultValue=""
                  >
                    <option value="" disabled>Select department</option>
                    {departments.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.department && <p className="text-xs text-destructive">{errors.department}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message (optional)</Label>
                <Textarea id="message" name="message" rows={4} placeholder="Tell us briefly about your concern..." />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
                {submitting ? "Submitting..." : "Request Appointment"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Field = ({ label, name, type = "text", placeholder, error }: { label: string; name: string; type?: string; placeholder?: string; error?: string }) => (
  <div className="space-y-2">
    <Label htmlFor={name}>{label}</Label>
    <Input id={name} name={name} type={type} placeholder={placeholder} />
    {error && <p className="text-xs text-destructive">{error}</p>}
  </div>
);
