import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  Facebook,
  MapPin,
  Clock,
  ArrowLeft,
  ShieldCheck,
  Award,
  BadgeCheck,
  Star,
  AlertTriangle,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/jsg-logo.png";
import heroImg from "@/assets/contact-hero.jpg";
import nkyImg from "@/assets/northern-kentucky.jpg";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileNav } from "@/components/MobileNav";

const PHONE = "859.743.1546";
const PHONE_TEL = "8597431546";
const EMAIL = "Jonesservicegroup@gmail.com";
const FB = "https://www.facebook.com/jonesservicegroup/";
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Jones+Service+Group+Northern+Kentucky+reviews";

const SERVICE_OPTIONS = [
  "Outdoor Living Spaces",
  "Landscape Design & Installation",
  "Patios & Retaining Walls",
  "Outdoor Kitchens & Fire Features",
  "Pergolas, Gazebos & Pavilions",
  "Outdoor Lighting",
  "Property Maintenance",
  "Roofing, Gutters & Siding",
  "Excavation & Drainage Solutions",
  "Something else",
];

const trustBadges = [
  { icon: Clock, label: "35+ Years Experience" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "Free Estimates" },
  { icon: Award, label: "Locally Owned" },
];

const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().max(50).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Please tell us about your project").max(2000),
});

const Contact = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [services, setServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (s: string) => {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check the form", description: result.error.issues[0].message });
      return;
    }
    setSubmitting(true);
    const submissionId = crypto.randomUUID();
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const { error } = await supabase.from("contact_submissions").insert({
      id: submissionId,
      name: fullName,
      email: form.email,
      phone: form.phone || null,
      services,
      other_service: services.includes("Something else") ? otherService.slice(0, 200) : null,
      message: form.message,
      source: "contact_page",
      contact_method: "email",
      sms_consent: false,
    });
    if (!error) {
      const ownerEmails = ["Jonesservicegroup@gmail.com", "info@evercall.us"];
      const templateData = {
        name: fullName,
        email: form.email,
        phone: form.phone || "",
        services,
        otherService: services.includes("Something else") ? otherService : "",
        message: form.message,
        contactMethod: "email",
        source: "contact_page",
        submittedAt: new Date().toLocaleString(),
      };
      await Promise.all(
        ownerEmails.map((to) =>
          supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "owner-form-notification",
              recipientEmail: to,
              idempotencyKey: `contact-owner-${submissionId}-${to}`,
              templateData,
            },
          }),
        ),
      );
    }
    setSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or call us directly." });
      return;
    }
    toast({
      title: "Message sent!",
      description: "Thanks — we'll get back to you within 24 hours.",
    });
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setServices([]);
    setOtherService("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Jones Service Group logo" className="h-20 w-20 sm:h-24 sm:w-24 rounded object-cover" />
            <span className="hidden font-bold tracking-wide sm:inline">JONES SERVICE GROUP</span>
          </Link>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/services" className="hover:text-primary">Services</Link>
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </nav>
          <Button asChild size="sm">
            <a href={`tel:${PHONE_TEL}`}><Phone /> {PHONE}</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative border-b border-border bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative mx-auto px-4 py-20 text-center sm:py-28">
          <img
            src={logo}
            alt="Jones Service Group logo"
            className="mx-auto mb-6 h-28 w-28 rounded-full object-cover ring-4 ring-primary/70 ring-offset-4 ring-offset-background shadow-2xl shadow-primary/40 sm:h-36 sm:w-36"
          />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Get in Touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Tell us about your project and we'll get back to you within 24 hours with a free, no-obligation estimate.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <a href={`tel:${PHONE_TEL}`}><Phone /> Call {PHONE}</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`sms:${PHONE_TEL}`}><MessageSquare /> Text Us</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-b border-border bg-secondary/30 py-8">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 sm:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center justify-center gap-3 text-center">
              <b.icon className="h-6 w-6 shrink-0 text-primary" />
              <span className="text-sm font-semibold">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Google Reviews badge */}
      <section className="border-b border-border py-8">
        <div className="container mx-auto px-4">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto flex max-w-xl items-center justify-between gap-4 rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-6 w-6 fill-primary text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="mt-1 text-sm font-semibold">Rated 5 stars on Google</p>
                <p className="text-xs text-muted-foreground">Read what our clients are saying</p>
              </div>
            </div>
            <span className="hidden text-sm font-semibold text-primary sm:inline">See Reviews →</span>
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-3">
          {/* Info column */}
          <div className="space-y-6 lg:col-span-1">
            <Card className="border-border/60">
              <CardContent className="space-y-5 p-6">
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Call us</p>
                    <a href={`tel:${PHONE_TEL}`} className="font-semibold hover:text-primary">{PHONE}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Text us</p>
                    <a href={`sms:${PHONE_TEL}`} className="font-semibold hover:text-primary">{PHONE}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href={`mailto:${EMAIL}`} className="break-all font-semibold hover:text-primary">{EMAIL}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Service area</p>
                    <p className="font-semibold">Northern Kentucky & surrounding region</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="font-semibold">Mon–Fri · 8am – 6pm</p>
                    <p className="text-sm text-muted-foreground">Sat by appointment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Facebook className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Follow</p>
                    <a href={FB} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary">
                      Jones Service Group
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency note */}
            <Card className="border-primary/40 bg-primary/5">
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-semibold">Roofing or drainage emergency?</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Please call directly after hours — we'll respond as soon as possible.
                    </p>
                    <Button asChild size="sm" variant="outline" className="mt-3">
                      <a href={`tel:${PHONE_TEL}`}><Phone /> Call Now</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="border-primary/20 shadow-lg lg:col-span-2">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold">Request a Free Estimate</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We'll get back to you within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} maxLength={50} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} maxLength={50} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
                </div>

                <div>
                  <Label>Services you're interested in</Label>
                  <p className="mt-1 text-xs text-muted-foreground">Select all that apply.</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((s) => (
                      <label
                        key={s}
                        className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card p-3 transition-colors hover:border-primary"
                      >
                        <Checkbox
                          checked={services.includes(s)}
                          onCheckedChange={() => toggleService(s)}
                        />
                        <span className="text-sm">{s}</span>
                      </label>
                    ))}
                  </div>
                  {services.includes("Something else") && (
                    <Input
                      className="mt-3"
                      placeholder="Tell us what you have in mind"
                      value={otherService}
                      onChange={(e) => setOtherService(e.target.value)}
                      maxLength={200}
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={2000}
                    placeholder="Briefly describe your project, location, and timeline."
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button type="submit" size="lg" disabled={submitting}>
                    {submitting ? <><Loader2 className="animate-spin" /> Sending…</> : "Send Message"}
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link to="/"><ArrowLeft /> Back to Home</Link>
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground">
                  <a href="https://www.leadconnectorhq.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Privacy Policy</a>
                  {" | "}
                  <a href="https://www.leadconnectorhq.com/terms2" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Terms of Service</a>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Map */}
      <section className="border-t border-border py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Service Area</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Proudly serving Northern Kentucky</h2>
            <p className="mt-3 text-muted-foreground">
              Including Boone, Kenton, Campbell counties and the surrounding region.
            </p>
          </div>
          <div className="mt-10 overflow-hidden rounded-lg border border-border shadow-lg">
            <img
              src={nkyImg}
              alt="Aerial view of Northern Kentucky landscape with the Ohio River and rolling hills"
              width={1600}
              height={896}
              loading="lazy"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Contact;