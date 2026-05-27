import { useState } from "react";
import { Phone, Mail, Facebook, Star, CheckCircle2, ArrowRight, Quote, Trophy, MapPin, Loader2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/jsg-logo.png";
import hero from "@/assets/hero-hardscape.jpg";
import bestOfNky from "@/assets/best-of-nky-2026.png";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileNav } from "@/components/MobileNav";
import { Seo } from "@/components/Seo";
import { QuoteDialog } from "@/components/QuoteDialog";
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

const homeContactSchema = z.object({
  firstName: z.string().trim().max(50).optional(),
  lastName: z.string().trim().max(50).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().max(2000).optional(),
});

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
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [otherService, setOtherService] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "call" | "text">("email");
  const [callConsent, setCallConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (s: string) => {
    setSelectedServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = homeContactSchema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check the form", description: result.error.issues[0].message });
      return;
    }
    if ((contactMethod === "call" || contactMethod === "text") && !form.phone.trim()) {
      toast({ title: "Phone number required", description: "Please enter a phone number so we can reach you." });
      return;
    }
    if (contactMethod === "call" && !callConsent) {
      toast({ title: "Permission to call required", description: "Please check the box giving us permission to call you." });
      return;
    }
    if (contactMethod === "text" && !smsConsent) {
      toast({ title: "Permission to text required", description: "Please check the box giving us permission to text you." });
      return;
    }
    setSubmitting(true);
    const submissionId = crypto.randomUUID();
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const messageToStore = form.message.trim() || "(no comment provided)";
    const { error } = await supabase.from("contact_submissions").insert({
      id: submissionId,
      name: fullName,
      email: form.email,
      phone: form.phone || null,
      services: selectedServices,
      other_service: selectedServices.includes("Something else") ? otherService.slice(0, 200) : null,
      message: messageToStore,
      source: "home_page",
      contact_method: contactMethod,
      sms_consent: contactMethod === "text" ? smsConsent : false,
    });
    if (!error) {
      const ownerEmails = ["Jonesservicegroup@gmail.com", "info@evercall.us"];
      const templateData = {
        name: fullName,
        email: form.email,
        phone: form.phone || "",
        services: selectedServices,
        otherService: selectedServices.includes("Something else") ? otherService : "",
        message: messageToStore,
        contactMethod,
        source: "home_page",
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
    }
    setSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or call us directly." });
      return;
    }
    toast({ title: "Message sent!", description: "Thanks — we'll get back to you within 24 hours." });
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setSelectedServices([]);
    setOtherService("");
    setContactMethod("email");
    setCallConsent(false);
    setSmsConsent(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Seo
        title="Jones Service Group — Hardscaping & Outdoor Living in NKY"
        description="Award-winning patios, retaining walls, outdoor kitchens & fire features in Northern Kentucky. 35+ years experience. Call 859.743.1546 for a free estimate."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Jones Service Group",
            url: "https://jonesservicegroup.net",
            logo: "https://jonesservicegroup.net/favicon.ico",
            sameAs: [
              "https://www.facebook.com/jonesservicegroup/",
              "https://www.instagram.com/jonesservicegroupllc",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Jones Service Group",
            url: "https://jonesservicegroup.net",
          },
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Jones Service Group",
            telephone: "+1-859-743-1546",
            email: "Jonesservicegroup@gmail.com",
            url: "https://jonesservicegroup.net",
            areaServed: "Northern Kentucky",
            address: {
              "@type": "PostalAddress",
              addressRegion: "KY",
              addressCountry: "US",
            },
            openingHours: "Mo-Fr 08:00-18:00",
            priceRange: "$$",
          },
        ]}
      />
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
        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <img
              src={logo}
              alt="Jones Service Group logo"
              className="mb-6 h-28 w-28 rounded-full object-cover ring-4 ring-primary/70 ring-offset-4 ring-offset-background shadow-2xl shadow-primary/40 animate-logo-pulse sm:h-36 sm:w-36"
            />
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
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
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <QuoteDialog source="home_hero">
                <Button size="lg">Get a Free Quote</Button>
              </QuoteDialog>
              <Button asChild size="lg" variant="outline">
                <a href={`tel:${PHONE_TEL}`}><Phone /> Call {PHONE}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Best of NKY 2026 Announcement */}
      <section className="border-t border-border bg-gradient-to-b from-primary/10 via-background to-background py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border-2 border-primary/40 bg-card shadow-2xl shadow-primary/20">
            <img
              src={bestOfNky}
              alt="Best of NKY 2026 — Jones Service Group voted Best Landscaper"
              loading="lazy"
              className="block w-full bg-white"
            />
            <div className="p-6 sm:p-10">
              <div className="text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                  <Trophy className="h-4 w-4" /> 2026 Best of NKY — Landscaper
                </span>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Thank You, Northern Kentucky!
                </h2>
              </div>
              <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                <p>
                  We are truly humbled and honored to announce that Jones Service Group has been voted the
                  <span className="font-semibold text-foreground"> 2026 Best of NKY Winner for Landscaper</span>.
                </p>
                <p>
                  Awards like this are never earned by one person or one company alone. They are made possible
                  by the incredible customers, friends, family members, and community supporters who trust us
                  to be a part of their homes and outdoor living projects.
                </p>
                <p>
                  For over 35 years, our goal has been simple: treat people right, do quality work, and stand
                  behind what we build. To know that so many of you took the time to vote for us is both
                  gratifying and deeply appreciated.
                </p>
                <p>
                  Every patio, retaining wall, outdoor kitchen, firepit, landscape project, and outdoor living
                  space we create is built with pride, and we never take your trust for granted.
                </p>
                <p>
                  From the bottom of our hearts, thank you for your continued support, referrals, reviews, and
                  friendship. We are blessed to serve Northern Kentucky and look forward to helping families
                  create beautiful outdoor spaces for many years to come.
                </p>
              </div>
              <div className="mt-8 border-t border-border pt-6 text-center">
                <p className="text-sm italic text-muted-foreground">With sincere gratitude,</p>
                <p className="mt-1 font-bold">Dennis Jones &amp; the Jones Service Group Team</p>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold">
                  <span className="inline-flex items-center gap-1.5"><Trophy className="h-4 w-4 text-primary" /> 2026 Best of NKY – Landscaper</span>
                  <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-primary text-primary" /> Over 35 Years of Experience</span>
                </div>
              </div>
            </div>
          </div>
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
                  <QuoteDialog source={`home_gallery_${item.title}`} defaultService={item.category}>
                    <Button variant="outline" className="mt-6">Start Your Project <ArrowRight /></Button>
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
              <Link to="/services">Explore all services <ArrowRight /></Link>
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
            <CarouselPrevious className="left-2 flex h-8 w-8 opacity-80 sm:-left-12 sm:opacity-100" />
            <CarouselNext className="right-2 flex h-8 w-8 opacity-80 sm:-right-12 sm:opacity-100" />
          </Carousel>
          <p className="mt-4 text-center text-xs text-muted-foreground sm:hidden">
            Swipe to browse more photos
          </p>
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
          <Card className="border-primary/20 shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold">Request a Free Estimate</h3>
              <p className="mt-1 text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="home-firstName">First Name</Label>
                    <Input id="home-firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} maxLength={50} />
                  </div>
                  <div>
                    <Label htmlFor="home-lastName">Last Name</Label>
                    <Input id="home-lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} maxLength={50} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="home-email">Email *</Label>
                  <Input id="home-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
                </div>
                <div>
                  <Label htmlFor="home-phone">Phone Number{contactMethod !== "email" && " *"}</Label>
                  <Input
                    id="home-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    maxLength={20}
                    placeholder="(859) 555-1234"
                    required={contactMethod !== "email"}
                  />
                </div>
                <div>
                  <Label>How would you like us to contact you? *</Label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {([
                      { value: "email", label: "Email me" },
                      { value: "call", label: "Call me" },
                      { value: "text", label: "Text me" },
                    ] as const).map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex cursor-pointer items-center gap-2 rounded-md border bg-card p-3 transition-colors ${
                          contactMethod === opt.value ? "border-primary" : "border-border hover:border-primary"
                        }`}
                      >
                        <input
                          type="radio"
                          name="home-contactMethod"
                          value={opt.value}
                          checked={contactMethod === opt.value}
                          onChange={() => setContactMethod(opt.value)}
                          className="h-4 w-4 accent-primary"
                        />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {contactMethod === "call" && (
                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-4">
                    <Checkbox checked={callConsent} onCheckedChange={(c) => setCallConsent(c === true)} className="mt-0.5" />
                    <span className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Permission to call:</strong> By checking this
                      box, I give Jones Service Group express written consent to contact me by phone at
                      the number provided, including using automated technology, regarding my project
                      inquiry. Consent is not a condition of purchase. Standard call rates may apply.
                    </span>
                  </label>
                )}

                {contactMethod === "text" && (
                  <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-4">
                    <Checkbox checked={smsConsent} onCheckedChange={(c) => setSmsConsent(c === true)} className="mt-0.5" />
                    <span className="text-xs text-muted-foreground">
                      <strong className="text-foreground">Permission to text:</strong> By checking this
                      box, I give Jones Service Group express written consent to send me text messages
                      (SMS) at the number provided, including using automated technology, regarding my
                      project inquiry. Consent is not a condition of purchase. Msg & data rates may
                      apply. Msg frequency varies. Reply STOP to opt out, HELP for help.
                    </span>
                  </label>
                )}

                <div>
                  <Label htmlFor="home-service">Service you're interested in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        id="home-service"
                        className="mt-2 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <span className={selectedServices.length === 0 ? "text-muted-foreground" : "truncate text-left"}>
                          {selectedServices.length === 0
                            ? "Select services"
                            : selectedServices.length === 1
                              ? selectedServices[0]
                              : `${selectedServices.length} selected`}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-[--radix-popover-trigger-width] max-h-[300px] overflow-y-auto p-1">
                      {SERVICE_OPTIONS.map((s) => (
                        <label key={s} className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent">
                          <Checkbox checked={selectedServices.includes(s)} onCheckedChange={() => toggleService(s)} />
                          <span>{s}</span>
                        </label>
                      ))}
                    </PopoverContent>
                  </Popover>
                  {selectedServices.includes("Something else") && (
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
                  <Label htmlFor="home-message">Comment</Label>
                  <Textarea
                    id="home-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    maxLength={2000}
                    placeholder="Anything you'd like us to know?"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? <><Loader2 className="animate-spin" /> Sending…</> : "Send Request"}
                </Button>

                <div className="border-t border-border pt-4 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">{PHONE}</a></p>
                  <p className="mt-2 flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> <a href={`mailto:${EMAIL}`} className="break-all hover:text-primary">{EMAIL}</a></p>
                  <p className="mt-2 flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> <a href="https://www.google.com/maps/search/?api=1&query=10959+Appaloosa+Dr,+Walton,+KY+41094" target="_blank" rel="noopener noreferrer" className="hover:text-primary">10959 Appaloosa Dr, Walton, KY 41094</a></p>
                  <p className="mt-2 flex items-center gap-2"><Facebook className="h-4 w-4 text-primary" /> <a href={FB} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Follow us on Facebook</a></p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Index;
