import { Link } from "react-router-dom";
import { Phone, ArrowLeft, ImageOff, Award, ShieldCheck, BadgeCheck, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/jsg-logo.png";
import ownerDennis from "@/assets/owner-dennis.jpg";
import { QuoteDialog } from "@/components/QuoteDialog";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileNav } from "@/components/MobileNav";

const PHONE = "859.743.1546";
const PHONE_TEL = "8597431546";

const trustBadges = [
  { icon: Clock, label: "35+ Years Experience" },
  { icon: ShieldCheck, label: "Licensed & Insured" },
  { icon: BadgeCheck, label: "Free Estimates" },
  { icon: Award, label: "Locally Owned" },
];

const values = [
  {
    title: "Quality Craftsmanship",
    desc: "Every patio, wall and feature is built to last — with proper base prep, premium materials and an eye for detail.",
  },
  {
    title: "Honest Communication",
    desc: "Clear estimates, realistic timelines and straight answers from first call through final walkthrough.",
  },
  {
    title: "Local & Trusted",
    desc: "Family-owned and proudly serving Northern Kentucky homeowners for more than 35 years.",
  },
];

const PhotoPlaceholder = ({ label }: { label: string }) => (
  <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted text-muted-foreground">
    <ImageOff className="h-8 w-8" />
    <span className="text-xs font-medium">{label}</span>
    <span className="text-[10px] uppercase tracking-widest">Coming Soon</span>
  </div>
);

const About = () => {
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
      <section className="border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4 py-20 text-center sm:py-28">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">About Us</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Built on Quality. Driven by Experience.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
            For over 35 years, Jones Service Group has been transforming Northern Kentucky homes
            with expert hardscaping, landscape design and outdoor living spaces.
          </p>
        </div>
      </section>

      {/* Story + photo */}
      <section className="py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-lg border border-border shadow-lg">
            <img
              src={ownerDennis}
              alt="Owner Dennis Jones with family on a custom paver patio"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              Dennis Jones is a lifelong entrepreneur and proud owner of Jones Service Group,
              bringing over 35 years of business experience and dedication to the Northern Kentucky
              community. Beyond his professional career, Dennis has spent more than 40 years
              volunteering as a coach and mentor, helping shape and inspire generations of young
              athletes and families throughout the community.
            </p>
            <p className="mt-4 text-muted-foreground">
              Family has always been at the center of Dennis's life. He and his wife are proud
              parents of three wonderful children, who have now blessed them with two grandchildren
              and one more on the way. Dennis takes great pride in building not only successful
              projects and businesses, but also strong relationships, lasting friendships, and a
              legacy rooted in hard work, integrity, and community involvement.
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
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">What We Stand For</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Our Values</h2>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {values.map((v) => (
              <Card key={v.title} className="border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Team</span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Meet the Crew</h2>
            <p className="mt-3 text-muted-foreground">
              The skilled craftspeople behind every Jones Service Group project.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <PhotoPlaceholder label="Team Photo 1" />
            <PhotoPlaceholder label="Team Photo 2" />
            <PhotoPlaceholder label="Team Photo 3" />
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-border bg-secondary/30 py-8">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 sm:grid-cols-4">
          {trustBadges.map((b) => (
            <div key={b.label} className="flex items-center justify-center gap-3 text-center">
              <b.icon className="h-6 w-6 shrink-0 text-primary" />
              <span className="text-sm font-semibold">{b.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Get a free, no-obligation estimate from the team Northern Kentucky trusts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <QuoteDialog source="about_cta">
              <Button size="lg">Request a Free Estimate</Button>
            </QuoteDialog>
            <Button asChild size="lg" variant="outline">
              <Link to="/"><ArrowLeft /> Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default About;