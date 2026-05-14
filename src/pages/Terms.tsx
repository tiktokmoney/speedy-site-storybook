import { Link } from "react-router-dom";
import { ArrowLeft, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/jsg-logo.png";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileNav } from "@/components/MobileNav";
import { Seo } from "@/components/Seo";

const PHONE = "859.743.1546";
const PHONE_TEL = "8597431546";
const EMAIL = "Jonesservicegroup@gmail.com";
const EFFECTIVE = "May 6, 2026";

const Terms = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Seo
      title="Terms of Service — Jones Service Group"
      description="Terms governing use of the Jones Service Group website and services."
      path="/terms"
    />
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

    <main className="container mx-auto max-w-3xl px-4 py-16">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Effective date: {EFFECTIVE}</p>

      <div className="prose prose-invert mt-10 max-w-none text-foreground">
        <p className="text-muted-foreground">
          These Terms of Service ("Terms") govern your access to and use of the website operated by
          Jones Service Group ("Company," "we," "us," or "our") and any related services, including
          requesting estimates, contacting us, and receiving communications. By using our website or
          services, you agree to these Terms.
        </p>

        <h2 className="mt-10 text-2xl font-bold">1. About Us</h2>
        <p className="mt-3 text-muted-foreground">
          Jones Service Group provides hardscaping, landscape design, outdoor living, roofing,
          excavation, and related exterior services in Northern Kentucky and surrounding areas.
        </p>

        <h2 className="mt-8 text-2xl font-bold">2. Use of the Website</h2>
        <p className="mt-3 text-muted-foreground">
          You agree to use the website only for lawful purposes and in a way that does not infringe
          on the rights of others or restrict their use of the site. You will not attempt to gain
          unauthorized access to any part of the website, its servers, or any connected database.
        </p>

        <h2 className="mt-8 text-2xl font-bold">3. Estimates & Quotes</h2>
        <p className="mt-3 text-muted-foreground">
          Submitting a request through our website does not create a contract for services. All
          estimates are free and non-binding until a written agreement is signed by both you and
          Jones Service Group. Final pricing is determined after an on-site consultation.
        </p>

        <h2 className="mt-8 text-2xl font-bold">4. Communications & SMS Consent</h2>
        <p className="mt-3 text-muted-foreground">
          By submitting a contact form and providing your phone number, you authorize Jones Service
          Group to contact you by phone, email, or text message regarding your inquiry. Consent to
          receive SMS messages is not a condition of any purchase.
        </p>

        <h3 className="mt-6 text-xl font-semibold">Jones Service Group SMS Program</h3>
        <p className="mt-3 text-muted-foreground">
          <strong>Program Name:</strong> Jones Service Group (the "Program Name" refers to the
          legal business name operating this SMS messaging program).
        </p>
        <p className="mt-3 text-muted-foreground">
          <strong>Program Description:</strong> Jones Service Group sends SMS messages to customers
          and prospective customers who have opted in by submitting a request through our website
          or by providing their phone number directly to us. Messages may include estimate
          confirmations, appointment scheduling, project updates, follow-up communications, and
          responses to your inquiries.
        </p>
        <ol className="mt-4 list-decimal space-y-3 pl-6 text-muted-foreground">
          <li>
            Jones Service Group sends transactional and informational SMS messages including
            estimate confirmations, scheduling, project updates, and replies to your questions.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can cancel the SMS service at any time. Simply text
            <strong> "STOP"</strong> to the shortcode or number you received messages from. Upon
            sending "STOP," we will confirm your unsubscribe status via SMS. Following this
            confirmation, you will no longer receive SMS messages from us. To rejoin, sign up as
            you did initially, and we will resume sending SMS messages to you.
          </li>
          <li>
            <strong>Help:</strong> If you experience issues with the messaging program, reply with
            the keyword <strong>HELP</strong> for more assistance, or reach out directly to{" "}
            <a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a> or{" "}
            <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">{PHONE}</a>.
          </li>
          <li>
            <strong>Carrier Liability:</strong> Carriers are not liable for delayed or undelivered
            messages.
          </li>
          <li>
            <strong>Message and Data Rates:</strong> As always, message and data rates may apply
            for messages sent to you from us and to us from you. Message frequency varies. For
            questions about your text plan or data plan, contact your wireless provider.
          </li>
          <li>
            <strong>Privacy:</strong> For privacy-related inquiries, please refer to our{" "}
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>. No mobile
            information will be shared with third parties or affiliates for marketing or
            promotional purposes. All categories of information sharing exclude text messaging
            originator opt-in data and consent; this information will not be shared with any third
            parties.
          </li>
          <li>
            <strong>Compliance with Industry Standards:</strong> Our SMS program is operated in
            compliance with the CTIA Messaging Principles and Best Practices and applicable
            carrier guidelines.
          </li>
          <li>
            <strong>Legal Compliance:</strong> Our SMS program complies with the Telephone
            Consumer Protection Act (TCPA), the CAN-SPAM Act, and other applicable federal and
            state laws governing electronic communications.
          </li>
        </ol>

        <h2 className="mt-8 text-2xl font-bold">5. Age Restriction</h2>
        <p className="mt-3 text-muted-foreground">
          You must be at least 18 years old to use this website, submit a request, or opt in to
          our SMS messaging program. By using our services or providing your phone number, you
          represent and warrant that you are 18 years of age or older. We do not knowingly
          collect information from, contact, or send SMS messages to anyone under 18.
        </p>

        <h2 className="mt-8 text-2xl font-bold">6. Intellectual Property</h2>
        <p className="mt-3 text-muted-foreground">
          All content on this website — including text, photos, graphics, logos, and the Jones
          Service Group name — is the property of Jones Service Group or its licensors and is
          protected by copyright and trademark law. You may not reproduce, distribute, or create
          derivative works without our prior written permission.
        </p>

        <h2 className="mt-8 text-2xl font-bold">7. Third-Party Links</h2>
        <p className="mt-3 text-muted-foreground">
          Our website may include links to third-party sites (such as Google or Facebook). We do
          not control and are not responsible for the content, policies, or practices of any
          third-party site.
        </p>

        <h2 className="mt-8 text-2xl font-bold">8. Disclaimer of Warranties</h2>
        <p className="mt-3 text-muted-foreground">
          The website and its content are provided "as is" and "as available" without warranties of
          any kind, express or implied. We do not warrant that the website will be uninterrupted,
          error-free, or free of harmful components. Project-related warranties, if any, are
          provided separately in your signed services agreement.
        </p>

        <h2 className="mt-8 text-2xl font-bold">9. Limitation of Liability</h2>
        <p className="mt-3 text-muted-foreground">
          To the fullest extent permitted by law, Jones Service Group will not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising out of your use
          of or inability to use the website.
        </p>

        <h2 className="mt-8 text-2xl font-bold">10. Indemnification</h2>
        <p className="mt-3 text-muted-foreground">
          You agree to indemnify and hold harmless Jones Service Group, its owners, employees, and
          affiliates from any claims, losses, or expenses (including reasonable attorneys' fees)
          arising from your misuse of the website or violation of these Terms.
        </p>

        <h2 className="mt-8 text-2xl font-bold">11. Governing Law</h2>
        <p className="mt-3 text-muted-foreground">
          These Terms are governed by the laws of the Commonwealth of Kentucky, without regard to
          its conflict-of-laws rules. Any disputes will be resolved in the state or federal courts
          located in Kenton County, Kentucky.
        </p>

        <h2 className="mt-8 text-2xl font-bold">12. Changes to These Terms</h2>
        <p className="mt-3 text-muted-foreground">
          We may update these Terms from time to time. Updates take effect when posted to this
          page. Your continued use of the website after changes are posted means you accept the
          updated Terms.
        </p>

        <h2 className="mt-8 text-2xl font-bold">13. Contact</h2>
        <p className="mt-3 text-muted-foreground">
          Questions about these Terms? Contact us at:
        </p>
        <ul className="mt-3 space-y-1 text-muted-foreground">
          <li><strong>Jones Service Group</strong></li>
          <li>Phone: <a href={`tel:${PHONE_TEL}`} className="hover:text-primary">{PHONE}</a></li>
          <li>Email: <a href={`mailto:${EMAIL}`} className="hover:text-primary">{EMAIL}</a></li>
        </ul>

        <p className="mt-10 text-xs text-muted-foreground">
          This document is provided for general informational purposes and does not constitute
          legal advice. Consult an attorney to ensure these Terms meet your specific needs.
        </p>
      </div>
    </main>

    <SiteFooter />
  </div>
);

export default Terms;