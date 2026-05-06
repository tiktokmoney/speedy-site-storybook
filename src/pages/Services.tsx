import { Link } from "react-router-dom";
import { Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/jsg-logo.png";

const PHONE = "859.743.1546";
const PHONE_TEL = "8597431546";

const services = [
  {
    title: "Outdoor Living Spaces",
    desc: "Custom-designed spaces that extend your home into the outdoors — perfect for entertaining and everyday relaxation.",
  },
  {
    title: "Landscape Design & Installation",
    desc: "Thoughtful designs and expert installation to transform your yard into a beautiful, low-maintenance landscape.",
  },
  {
    title: "Patios & Retaining Walls",
    desc: "Durable, hand-built paver patios and retaining walls engineered to last and complement your home's style.",
  },
  {
    title: "Outdoor Kitchens & Fire Features",
    desc: "Built-in grills, bars, fire pits and fireplaces designed for memorable gatherings year-round.",
  },
  {
    title: "Pergolas, Gazebos & Pavilions",
    desc: "Custom shade structures crafted to enhance comfort and add a striking focal point to your outdoor space.",
  },
  {
    title: "Outdoor Lighting",
    desc: "Low-voltage landscape and architectural lighting that adds beauty, safety and curb appeal after dark.",
  },
  {
    title: "Property Maintenance",
    desc: "Seasonal lawn, bed and landscape maintenance to keep your property looking its best all year long.",
  },
  {
    title: "Roofing, Gutters & Siding",
    desc: "Full exterior services to protect and beautify your home — installations, repairs and replacements.",
  },
  {
    title: "Excavation & Drainage Solutions",
    desc: "Grading, excavation and drainage work to solve water problems and prepare sites the right way.",
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

      <section className="border-b border-border bg-secondary/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From custom hardscapes to full exterior solutions — everything we do is built on quality
            and over 35 years of experience serving Northern Kentucky.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="border-border/60 transition-colors hover:border-primary">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                    <h2 className="text-lg font-bold">{s.title}</h2>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
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

      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Jones Service Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Services;