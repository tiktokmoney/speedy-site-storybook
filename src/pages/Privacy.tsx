import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jsg-logo.png";
import { SiteFooter } from "@/components/SiteFooter";

const PHONE = "859.743.1546";
const PHONE_TEL = "8597431546";
const EMAIL = "Jonesservicegroup@gmail.com";
const EFFECTIVE = "May 6, 2026";

const Privacy = () => (
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
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </nav>
        <Button asChild size="sm">
          <a href={`tel:${PHONE_TEL}`}><Phone /> {PHONE}</a>
        </Button>
      </div>
    </header>

    <main className="container mx-auto max-w-3xl px-4 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective date: {EFFECTIVE}</p>

      <div className="prose prose-invert mt-10 max-w-none text-foreground">
        <p className="text-muted-foreground">
          Jones Service Group ("we," "us," or "our") respects your privacy. This Privacy Policy
          explains what information we collect, how we use it, and your choices when you visit our
          website or contact us for services.
        </p>

        <h2 className="mt-10 text-2xl font-bold">1. Information We Collect</h2>
        <p className="mt-3 text-muted-foreground">
          When you submit a contact or estimate form, we collect:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Your name</li>
          <li>Email address</li>
          <li>Phone number (optional, but required if you choose to be contacted by text or phone)</li>
          <li>The service(s) you're interested in</li>
          <li>Any details or comments you choose to share</li>
          <li>Your preferred contact method and SMS consent (if applicable)</li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          We may also automatically collect basic technical information (such as browser type,
          device, and pages viewed) through standard website analytics.
        </p>

        <h2 className="mt-8 text-2xl font-bold">2. How We Use Your Information</h2>
        <p className="mt-3 text-muted-foreground">We use the information you provide to:</p>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>Respond to your inquiry and prepare your estimate</li>
          <li>Schedule consultations, estimates, and project work</li>
          <li>Communicate with you about your project, scheduling, or invoicing</li>
          <li>Send transactional text messages if you've consented to SMS</li>
          <li>Improve our website and services</li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          We do <strong>not</strong> sell, rent, or share your personal information with third
          parties for their marketing purposes.
        </p>

        <h2 className="mt-8 text-2xl font-bold">3. SMS / Text Messaging</h2>
        <p className="mt-3 text-muted-foreground">
          If you opt in to text messages, we'll use your phone number to send messages related to
          your inquiry, estimate, or project. Message and data rates may apply. Message frequency
          varies. You can reply <strong>STOP</strong> at any time to opt out, or <strong>HELP</strong> for
          help. Mobile opt-in data and consent are not shared with any third parties or affiliates
          for marketing purposes.
        </p>

        <h2 className="mt-8 text-2xl font-bold">4. How We Share Information</h2>
        <p className="mt-3 text-muted-foreground">
          We may share information only with trusted service providers who help us operate our
          business — for example, our website hosting, database, and email providers. These
          providers are required to safeguard your information and use it only to perform services
          for us. We may also disclose information when required by law, subpoena, or to protect
          our legal rights.
        </p>

        <h2 className="mt-8 text-2xl font-bold">5. Cookies & Analytics</h2>
        <p className="mt-3 text-muted-foreground">
          Our website may use cookies or similar technologies to remember preferences and measure
          site performance. You can disable cookies in your browser settings, though some parts of
          the site may not function as intended.
        </p>

        <h2 className="mt-8 text-2xl font-bold">6. Data Security</h2>
        <p className="mt-3 text-muted-foreground">
          We use reasonable administrative and technical safeguards to protect your information.
          However, no method of transmission over the internet is 100% secure, and we cannot
          guarantee absolute security.
        </p>

        <h2 className="mt-8 text-2xl font-bold">7. Data Retention</h2>
        <p className="mt-3 text-muted-foreground">
          We keep your information only as long as needed to respond to your inquiry, complete your
          project, comply with legal obligations, resolve disputes, and enforce our agreements.
        </p>

        <h2 className="mt-8 text-2xl font-bold">8. Your Choices & Rights</h2>
        <ul className="mt-3 list-disc space-y-1 pl-6 text-muted-foreground">
          <li>You may request access to, correction of, or deletion of your personal information.</li>
          <li>You may opt out of SMS messages at any time by replying STOP.</li>
          <li>You may opt out of marketing emails (if any) by following the unsubscribe link.</li>
        </ul>
        <p className="mt-3 text-muted-foreground">
          To make a request, contact us using the information below.
        </p>

        <h2 className="mt-8 text-2xl font-bold">9. Children's Privacy</h2>
        <p className="mt-3 text-muted-foreground">
          Our website is not directed to children under 13, and we do not knowingly collect
          personal information from children.
        </p>

        <h2 className="mt-8 text-2xl font-bold">10. Changes to This Policy</h2>
        <p className="mt-3 text-muted-foreground">
          We may update this Privacy Policy from time to time. The "Effective date" above will
          reflect the most recent update. Your continued use of the website after changes are
          posted means you accept the updated policy.
        </p>

        <h2 className="mt-8 text-2xl font-bold">11. Contact Us</h2>
        <p className="mt-3 text-muted-foreground">
          Questions or requests about this Privacy Policy?
        </p>
        <ul className="mt-3 space-y-1 text-muted-foreground">
          <li><strong>Jones Service Group</strong></li>
          <li>Phone: <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">{PHONE}</a></li>
          <li>Email: <a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></li>
        </ul>

        <p className="mt-10 text-xs text-muted-foreground">
          This document is provided for general informational purposes and does not constitute
          legal advice. Consult an attorney to ensure this Privacy Policy meets the requirements
          that apply to your business.
        </p>
      </div>
    </main>

    <SiteFooter />
  </div>
);

export default Privacy;