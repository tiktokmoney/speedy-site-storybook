import { Link } from "react-router-dom";
import { Phone, ArrowLeft, CheckCircle2, ImageOff, ClipboardList, PencilRuler, Hammer, Leaf, ShieldCheck, Award, BadgeCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import logo from "@/assets/jsg-logo.png";
import imgOutdoorLiving from "@/assets/service-outdoor-living.jpg";
import imgLandscape from "@/assets/service-landscape.jpg";
import imgPatiosWalls from "@/assets/service-patios-walls.jpg";
import imgKitchensFire from "@/assets/service-kitchens-fire.jpg";
import imgLighting from "@/assets/service-lighting.jpg";
import imgRoofing from "@/assets/service-roofing.jpg";
import imgExcavation from "@/assets/service-excavation.jpg";
import imgMaintenance from "@/assets/service-maintenance.jpg";
import imgPergolas from "@/assets/service-pergolas.jpg";

const PHONE = "859.743.1546";
const PHONE_TEL = "8597431546";

const services = [
  {
    title: "Outdoor Living Spaces",
    desc: "Custom-designed spaces that extend your home into the outdoors — perfect for entertaining and everyday relaxation.",
    image: imgOutdoorLiving,
    features: [
      "Custom paver patios & seating walls",
      "Built-in fire pits and outdoor fireplaces",
      "Integrated lighting and pergolas",
      "Designed for entertaining year-round",
    ],
  },
  {
    title: "Landscape Design & Installation",
    desc: "Thoughtful designs and expert installation to transform your yard into a beautiful, low-maintenance landscape.",
    image: imgLandscape,
    features: [
      "Site analysis & custom planting plans",
      "Trees, shrubs, perennials & sod",
      "Mulch beds, edging and rock work",
      "Low-maintenance, climate-appropriate selections",
    ],
  },
  {
    title: "Patios & Retaining Walls",
    desc: "Durable, hand-built paver patios and retaining walls engineered to last and complement your home's style.",
    image: imgPatiosWalls,
    features: [
      "Engineered base for long-term stability",
      "Premium pavers & natural stone options",
      "Tiered & curved retaining walls",
      "Integrated steps, columns and caps",
    ],
  },
  {
    title: "Outdoor Kitchens & Fire Features",
    desc: "Built-in grills, bars, fire pits and fireplaces designed for memorable gatherings year-round.",
    image: imgKitchensFire,
    features: [
      "Built-in grills, burners & storage",
      "Stone bars and countertops",
      "Wood & gas fire pits and fireplaces",
      "Gas, electric and water rough-in coordination",
    ],
  },
  {
    title: "Pergolas, Gazebos & Pavilions",
    desc: "Custom shade structures crafted to enhance comfort and add a striking focal point to your outdoor space.",
    image: imgPergolas,
    features: [
      "Custom-designed for your space",
      "Cedar, composite and metal options",
      "Optional lighting, fans and screens",
      "Built to local code and engineered loads",
    ],
  },
  {
    title: "Outdoor Lighting",
    desc: "Low-voltage landscape and architectural lighting that adds beauty, safety and curb appeal after dark.",
    image: imgLighting,
    features: [
      "Path, accent and uplighting",
      "Architectural & tree lighting",
      "LED fixtures with smart timers",
      "Designed for safety and curb appeal",
    ],
  },
  {
    title: "Property Maintenance",
    desc: "Seasonal lawn, bed and landscape maintenance to keep your property looking its best all year long.",
    image: imgMaintenance,
    features: [
      "Mowing, edging and trimming",
      "Spring & fall cleanups",
      "Mulch refresh & bed maintenance",
      "Seasonal pruning programs",
    ],
  },
  {
    title: "Roofing, Gutters & Siding",
    desc: "Full exterior services to protect and beautify your home — installations, repairs and replacements.",
    image: imgRoofing,
    features: [
      "Asphalt shingle roof installs & repair",
      "Seamless gutters and guards",
      "Vinyl, fiber-cement and accent siding",
      "Storm & insurance claim support",
    ],
  },
  {
    title: "Excavation & Drainage Solutions",
    desc: "Grading, excavation and drainage work to solve water problems and prepare sites the right way.",
    image: imgExcavation,
    features: [
      "Grading & site preparation",
      "French drains and downspout tie-ins",
      "Trenching for utilities",
      "Erosion control and regrading",
    ],
  },
];

const process = [
  { icon: ClipboardList, title: "Consult", desc: "On-site walkthrough to understand your goals, site and budget." },
  { icon: PencilRuler, title: "Design", desc: "A clear plan and detailed estimate — no surprises." },
  { icon: Hammer, title: "Build", desc: "Our crews build it right with quality materials and craftsmanship." },
  { icon: Leaf, title: "Maintain", desc: "Optional seasonal care to keep your investment looking new." },
];

const trustBadges = [
  { icon: Clock, label: "35+ Years Experience" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "Free Estimates" },
  { icon: Award, label: "Locally Owned" },
];

const faqs = [
  {
    q: "Do you offer free estimates?",
    a: "Yes — every project starts with a free, no-obligation on-site consultation and written estimate.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve homeowners throughout Northern Kentucky and the surrounding region.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Absolutely. Jones Service Group is fully licensed and insured for your protection on every job.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scope. A standard paver patio usually takes 1–2 weeks; larger outdoor living builds can run 3–6 weeks. We'll give you a clear schedule with your estimate.",
  },
  {
    q: "Do you offer warranties?",
    a: "Yes. We stand behind our workmanship, and we pass through manufacturer warranties on pavers, lighting, roofing and other materials.",
  },
  {
    q: "Do you handle design or do I need a separate designer?",
    a: "We handle design in-house for most projects — from concept to material selection — so everything stays coordinated.",
  },
];

const Services = () => {
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
            <Link to="/#about" className="hover:text-primary">About</Link>
            <Link to="/#contact" className="hover:text-primary">Contact</Link>
          </nav>
          <Button asChild size="sm">
            <a href={`tel:${PHONE_TEL}`}><Phone /> {PHONE}</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative border-b border-border bg-cover bg-center"
        style={{ backgroundImage: `url(${imgOutdoorLiving})` }}
      >
        <div className="absolute inset-0 bg-background/80" />
        <div className="container relative mx-auto px-4 py-24 text-center sm:py-32">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            From custom hardscapes to full exterior solutions — everything we do is built on quality
            and over 35 years of experience serving Northern Kentucky.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link to="/#contact">Request a Free Estimate</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={`tel:${PHONE_TEL}`}><Phone /> {PHONE}</a>
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

      {/* Process */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">How We Work</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Our Process</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              A simple, transparent path from first conversation to finished project.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <Card key={step.title} className="border-border/60">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Step {i + 1}
                  </div>
                  <h3 className="mt-1 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">What We Do</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Services</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Click any service to see what's included.
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="flex flex-col overflow-hidden border-border/60 transition-colors hover:border-primary">
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
                      <ImageOff className="h-8 w-8" />
                      <span className="text-xs">Photo coming soon</span>
                    </div>
                  )}
                </div>
                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <h2 className="text-lg font-bold">{s.title}</h2>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
                  <Accordion type="single" collapsible className="mt-3">
                    <AccordionItem value="details" className="border-b-0">
                      <AccordionTrigger className="py-2 text-sm font-semibold text-primary hover:no-underline">
                        What's included
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {s.features.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="outline">
              <Link to="/"><ArrowLeft /> Back to Home</Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/#contact">Request a Free Estimate</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-secondary/30 py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">FAQ</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jones Service Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Services;