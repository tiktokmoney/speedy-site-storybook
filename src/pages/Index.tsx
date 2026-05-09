import { useState } from "react";
import { Phone, Mail, Facebook, Star, CheckCircle2, ArrowRight, Quote, Award, Trophy, Loader2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/jsg-logo.png";
import hero from "@/assets/hero-hardscape.jpg";
import { QuoteDialog } from "@/components/QuoteDialog";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileNav } from "@/components/MobileNav";
import galleryFireplace from "@/assets/gallery-fireplace.jpg";
import galleryLighting from "@/assets/gallery-lighting.jpg";
import galleryPatio from "@/assets/gallery-patio.jpg";
import beforeAfter1 from "@/assets/before-after-1.jpg";
import beforeAfter2 from "@/assets/before-after-2.jpg";
import beforeAfter3 from "@/assets/before-after-3.jpg";
import beforeAfter4 from "@/assets/before-after-4.jpg";
import beforeAfter5 from "@/assets/before-after-5.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const PHONE = "859.743.1546";
const PHONE_TEL = "8597431546";
const EMAIL = "Jonesservicegroup@gmail.com";
const FB = "https://www.facebook.com/jonesservicegroup/";

const services = [
  "Outdoor Living Spaces",
  "Landscape Design & Installation",
  "Patios & Retaining Walls",
  "Outdoor Kitchens & Fire Features",
  "Pergolas, Gazebos, Pavilions",
  "Outdoor Lighting",
  "Property Maintenance",
  "Roofing, Gutters & Siding",
  "Excavation & Drainage Solutions",
];

const gallery = [
  {
    src: galleryPatio,
    alt: "Paver patio with fire pit and seating wall",
    title: "Paver Patio & Fire Pit",
    category: "Hardscaping",
    desc: "Custom paver patio with built-in seating wall and stone fire pit — designed for year-round entertaining.",
  },
  {
    src: galleryFireplace,
    alt: "Custom outdoor stone fireplace on paver patio",
    title: "Outdoor Stone Fireplace",
    category: "Outdoor Living",
    desc: "Hand-built stone fireplace anchoring an expansive paver patio with column accents and pavilion.",
  },
  {
    src: galleryLighting,
    alt: "Outdoor landscape lighting on stone wall at night",
    title: "Landscape Lighting",
    category: "Lighting & Walls",
    desc: "Low-voltage column and step lighting on a custom retaining wall — beauty and safety after dark.",
  },
];

const beforeAfterPhotos = [
  { src: beforeAfter1, alt: "Hillside stone steps and retaining wall transformation" },
  { src: beforeAfter2, alt: "Backyard paver patio with fire pit and seating wall transformation" },
  { src: beforeAfter3, alt: "Paver patio with outdoor stone fireplace transformation" },
  { src: beforeAfter4, alt: "Backyard paver patio and outdoor fireplace transformation" },
  { src: beforeAfter5, alt: "Paver patio with seating wall and column lighting transformation" },
];

const testimonials = [
  {
    name: "Mick Bode",
    quote:
      "Recently had Jones Service Group do a fairly large retaining wall, firepit and seat wall project for us. From start to finish, Dennis and his crew were professional, responsive, prompt and respectful of neighbors. The project was completed to our utter satisfaction and quicker than expected. The work site was left pristine at the end of the job. I can't recommend Dennis and Jones Service Group highly enough. Thank me later!",
  },
  {
    name: "Logan Kremer",
    quote:
      "From inception to finish, Jones Service Group was fantastic. They took our outdoor patio vision and helped guide us to make informed decisions about several aspects. They asked us questions throughout the build to make sure things were made to our liking and their care was timely, professional, and finished the patio in nearly half the expected time. Would highly recommend Dennis & Jones Service Group!",
  },
  {
    name: "Lois Bradford",
    quote:
      "Dennis owner of the Jones Service Group did an amazing job for us! They replaced a retaining wall that no one else wanted to tackle! It looks so great! They also built a pavered patio off our porch with fire pit, seat wall and lights. We are so impressed by the professional and work ethic of this company! Thank you so much Dennis and company! Forever grateful!",
  },
];

const awards = [
  "Unilock Authorized Contractor",
  "Allen Block Certified Contractor",
  "Voted NKY's Best 2021, 2022, 2023, 2025",
  "Voted Next Door Neighbor Favorite 2023, 2024",
  "Voted Top 3 in the State of KY",
];

const Index = () => {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [transactionalConsent, setTransactionalConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.phone || !form.email) {
      toast({ title: "Please fill out all required fields" });
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
      services: [],
      message: "(no comment provided)",
      source: "home_hero",
      contact_method: "email",
      sms_consent: transactionalConsent,
    });
    if (error) {
      setSubmitting(false);
      toast({ title: "Something went wrong", description: "Please try again or call us directly." });
      return;
    }
    const ownerEmails = ["Jonesservicegroup@gmail.com", "info@evercall.us"];
    const templateData = {
      name: fullName,
      email: form.email,
      phone: form.phone || "",
      services: [],
      message: `Transactional consent: ${transactionalConsent ? "Yes" : "No"} · Marketing consent: ${marketingConsent ? "Yes" : "No"}`,
      contactMethod: "email",
      source: "home_hero",
      submittedAt: new Date().toLocaleString(),
    };
    await Promise.all(
      ownerEmails.map((to) =>
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "owner-form-notification",
            recipientEmail: to,
          idempotencyKey: `home-owner-${submissionId}-${to}`,
            templateData,
          },
        }),
      ),
    );
    setSubmitting(false);
    toast({ title: "Message sent!", description: "Thanks — we'll get back to you within 24 hours." });
    setForm({ firstName: "", lastName: "", email: "", phone: "" });
    setTransactionalConsent(false);
    setMarketingConsent(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src={logo} alt="Jones Service Group logo" className="h-20 w-20 sm:h-24 sm:w-24 rounded object-cover" />
            <span className="hidden font-bold tracking-wide sm:inline">JONES SERVICE GROUP</span>
          </a>
          <nav className="hidden gap-6 text-sm font-medium md:flex">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/services" className="hover:text-primary">Services</Link>
            <Link to="/about" className="hover:text-primary">About</Link>
            <Link to="/contact" className="hover:text-primary">Contact</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <a href={`tel:${PHONE_TEL}`}><Phone /> {PHONE}</a>
            </Button>
            <Button asChild size="icon" variant="outline" className="sm:hidden" aria-label="Call">
              <a href={`tel:${PHONE_TEL}`}><Phone /></a>
            </Button>
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-background/0" />
        <div className="container relative mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2 lg:py-32">
          <div className="flex flex-col justify-center">
            <img
              src={logo}
              alt="Jones Service Group logo"
              className="mb-6 h-28 w-28 rounded-full object-cover ring-4 ring-primary/70 ring-offset-4 ring-offset-background shadow-2xl shadow-primary/40 sm:h-36 sm:w-36"
            />
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Star className="h-3 w-3 fill-primary" /> VOTED NKY's BEST · 35+ YEARS
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Premier Hardscaping &<br />
              <span className="text-primary">Outdoor Living</span> in Northern Kentucky
            </h1>
            <p className="mt-5 max-w-xl text-lg max-sm:text-foreground sm:text-muted-foreground">
              Patios, retaining walls, fire features, outdoor kitchens and more — built on quality,
              driven by experience, trusted for over 35 years.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <QuoteDialog source="home_hero">
                <Button size="lg">Get a Free Quote</Button>
              </QuoteDialog>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PHONE_TEL}`}><Phone /> Call {PHONE}</a>
              </Button>
            </div>
          </div>

          {/* Contact form on hero */}
          <Card id="contact" className="border-primary/20 shadow-2xl lg:ml-auto lg:max-w-md">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold">Request a Free Estimate</h2>
              <p className="mt-1 text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} maxLength={50} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} maxLength={50} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-phone">Phone *</Label>
                  <Input id="contact-phone" type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} required />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input id="contact-email" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
                </div>

                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={transactionalConsent}
                    onCheckedChange={(v) => setTransactionalConsent(v === true)}
                    className="mt-0.5"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    I consent to receive transactional messages from Jones Service Group at the
                    phone number provided. Message frequency may vary. Message &amp; Data rates may
                    apply. Reply HELP for help or STOP to opt-out.
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3">
                  <Checkbox
                    checked={marketingConsent}
                    onCheckedChange={(v) => setMarketingConsent(v === true)}
                    className="mt-0.5"
                  />
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    I consent to receive marketing and promotional messages from Jones Service
                    Group at the phone number provided. Message frequency may vary. Message &amp;
                    Data rates may apply. Reply HELP for help or STOP to opt-out.
                  </span>
                </label>

                <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                  {submitting ? <><Loader2 className="animate-spin" /> Sending…</> : "Send Message"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
                  {" | "}
                  <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Featured Projects</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Our Recent Work</h2>
            <p className="mt-3 text-muted-foreground">
              A closer look at some of our latest hardscaping and outdoor living transformations
              across Northern Kentucky.
            </p>
          </div>

          <div className="mt-14 space-y-16">
            {gallery.map((item, i) => (
              <div
                key={item.src}
                className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden rounded-lg border border-border shadow-lg">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    style={item.title === "Landscape Lighting" ? { filter: "brightness(1.35) saturate(1.05)" } : undefined}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {item.category}
                  </span>
                  <h3 className="mt-4 text-2xl font-bold sm:text-3xl">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.desc}</p>
                  <QuoteDialog source={`home_gallery_${item.title}`}>
                    <Button variant="outline" className="mt-6">
                      Start Your Project <ArrowRight />
                    </Button>
                  </QuoteDialog>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="border-t border-border bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Our Services</h2>
            <p className="mt-3 text-muted-foreground">
              Full-service hardscaping, landscaping and exterior solutions for your home.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s} className="border-border/60 transition-colors hover:border-primary">
                <CardContent className="flex items-center gap-3 p-5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium">{s}</span>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild size="lg" variant="outline">
              <Link to="/services">Learn More <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Before & After Slider */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Before & After
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Real Transformations</h2>
            <p className="mt-3 text-muted-foreground">
              See the difference our craftsmanship makes.
            </p>
          </div>

          <Carousel
            opts={{ align: "start", loop: true }}
            className="mt-12 mx-auto w-full max-w-6xl px-4 sm:px-12"
          >
            <CarouselContent>
              {beforeAfterPhotos.map((photo) => (
                <CarouselItem key={photo.src} className="md:basis-1/2 lg:basis-1/3">
                  <div className="overflow-hidden rounded-lg border border-border shadow-lg">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </section>

      {/* Awards */}
      <section className="border-t border-border py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Awards & Recognition
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Certified. Awarded. Trusted.</h2>
            <p className="mt-3 text-muted-foreground">
              Recognized by leading manufacturers and voted a community favorite year after year.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {awards.map((a) => (
              <Card key={a} className="border-border/60 transition-colors hover:border-primary">
                <CardContent className="flex items-center gap-3 p-5">
                  <Trophy className="h-5 w-5 shrink-0 text-primary" />
                  <span className="font-medium">{a}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              What Our Clients Say
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Trusted Across Northern Kentucky
            </h2>
            <div className="mt-4 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
              <span className="ml-2 text-sm font-semibold">5-star rated on Google</span>
            </div>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/60 transition-colors hover:border-primary">
                <CardContent className="flex h-full flex-col p-6">
                  <Quote className="h-7 w-7 text-primary" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mt-2 text-sm font-semibold">{t.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Award-Winning. NKY's Best.</h2>
            <p className="mt-4 text-muted-foreground">
              For over 35 years, Jones Service Group has been transforming Northern Kentucky homes
              with expert hardscaping, landscape design and outdoor living spaces. Owner Dennis Jones
              and his team take pride in craftsmanship that lasts.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-extrabold text-primary">35+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-primary">NKY</div>
                <div className="text-sm text-muted-foreground">Voted Best</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-primary">5★</div>
                <div className="text-sm text-muted-foreground">Rated Service</div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-8">
            <h3 className="text-xl font-bold">Get In Touch</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">{PHONE}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${EMAIL}`} className="break-all hover:text-primary">{EMAIL}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=10959+Appaloosa+Dr,+Walton,+KY+41094"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  10959 Appaloosa Dr, Walton, KY 41094
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Facebook className="h-5 w-5 text-primary" />
                <a href={FB} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                  Follow us on Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
