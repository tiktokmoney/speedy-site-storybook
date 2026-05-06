import { useState } from "react";
import { Phone, Mail, Facebook, Star, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/jsg-logo.png";
import hero from "@/assets/hero-hardscape.jpg";

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

const Index = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill out all required fields" });
      return;
    }
    const subject = encodeURIComponent(`New inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    toast({ title: "Opening your email app...", description: "We'll be in touch shortly." });
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
            <Link to="/services" className="hover:text-primary">Services</Link>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#contact" className="hover:text-primary">Contact</a>
          </nav>
          <Button asChild size="sm">
            <a href={`tel:${PHONE_TEL}`}><Phone /> {PHONE}</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="container relative mx-auto grid gap-10 px-4 py-20 lg:grid-cols-2 lg:py-32">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Star className="h-3 w-3 fill-primary" /> VOTED NKY's BEST · 35+ YEARS
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Premier Hardscaping &<br />
              <span className="text-primary">Outdoor Living</span> in Northern Kentucky
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Patios, retaining walls, fire features, outdoor kitchens and more — built on quality,
              driven by experience, trusted for over 35 years.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#contact">Get a Free Quote</a>
              </Button>
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
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Project Details *</Label>
                  <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} required />
                </div>
                <Button type="submit" className="w-full" size="lg">Send Message</Button>
              </form>
            </CardContent>
          </Card>
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

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Jones Service Group. All rights reserved.</p>
          <p className="text-center">Built on quality. Driven by experience. Trusted for over 35 years.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
