import { useState, type ReactNode } from "react";
import { Loader2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { sendToGhlWebhook } from "@/lib/ghlWebhook";
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

const schema = z.object({
  firstName: z.string().trim().max(50).optional(),
  lastName: z.string().trim().max(50).optional(),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().max(2000).optional(),
});

interface QuoteDialogProps {
  children: ReactNode;
  source?: string;
  defaultService?: string;
}

export const QuoteDialog = ({ children, source = "cta", defaultService }: QuoteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  const [services, setServices] = useState<string[]>(defaultService ? [defaultService] : []);
  const [otherService, setOtherService] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "call" | "text">("email");
  const [callConsent, setCallConsent] = useState(false);
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setServices(defaultService ? [defaultService] : []);
    setOtherService("");
    setContactMethod("email");
    setCallConsent(false);
    setSmsConsent(false);
  };

  const toggleService = (s: string) => {
    setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
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
    const messageToStore = form.message.trim() || "(no comment provided)";
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const { error } = await supabase.from("contact_submissions").insert({
      id: submissionId,
      name: fullName,
      email: form.email,
      phone: form.phone || null,
      services,
      other_service: services.includes("Something else") ? otherService.slice(0, 200) : null,
      message: messageToStore,
      source,
      contact_method: contactMethod,
      sms_consent: contactMethod === "text" ? smsConsent : false,
    });
    if (!error) {
      const ownerEmails = ["Jonesservicegroup@gmail.com", "info@evercall.us"];
      const templateData = {
        name: fullName,
        email: form.email,
        phone: form.phone || "",
        services,
        otherService: services.includes("Something else") ? otherService : "",
        message: messageToStore,
        contactMethod,
        source,
        submittedAt: new Date().toLocaleString(),
      };
      await Promise.all(
        ownerEmails.map((to) =>
          supabase.functions.invoke("send-transactional-email", {
            body: {
              templateName: "owner-form-notification",
              recipientEmail: to,
              idempotencyKey: `quote-owner-${submissionId}-${to}`,
              templateData,
            },
          }),
        ),
      );

      await sendToGhlWebhook({
        submissionId,
        firstName: form.firstName,
        lastName: form.lastName,
        fullName,
        email: form.email,
        phone: form.phone || "",
        contactMethod,
        smsConsent: contactMethod === "text" ? smsConsent : false,
        callConsent: contactMethod === "call" ? callConsent : false,
        services,
        otherService: services.includes("Something else") ? otherService : "",
        message: messageToStore,
        source,
      });
    }
    setSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or call us directly." });
      return;
    }
    toast({ title: "Request sent!", description: "Thanks — we'll get back to you within 24 hours." });
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Request a Free Estimate</DialogTitle>
          <DialogDescription>
            Tell us about your project and we'll get back to you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-2 space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="qd-firstName">First Name</Label>
              <Input id="qd-firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} maxLength={50} />
            </div>
            <div>
              <Label htmlFor="qd-lastName">Last Name</Label>
              <Input id="qd-lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} maxLength={50} />
            </div>
          </div>
          <div>
            <Label htmlFor="qd-email">Email *</Label>
            <Input id="qd-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
          </div>

          <div>
            <Label htmlFor="qd-phone">Phone Number{contactMethod !== "email" && " *"}</Label>
            <Input
              id="qd-phone"
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
                    name="qd-contactMethod"
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
              <Checkbox
                checked={callConsent}
                onCheckedChange={(c) => setCallConsent(c === true)}
                className="mt-0.5"
              />
              <span className="text-xs text-muted-foreground">
                <strong className="text-foreground">Permission to call:</strong> By checking this box, I
                give Jones Service Group express written consent to contact me by phone at the number
                provided, including using automated technology, regarding my project inquiry. Consent is
                not a condition of purchase. Standard call rates may apply.
              </span>
            </label>
          )}

          {contactMethod === "text" && (
            <label className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-card p-4">
              <Checkbox
                checked={smsConsent}
                onCheckedChange={(c) => setSmsConsent(c === true)}
                className="mt-0.5"
              />
              <span className="text-xs text-muted-foreground">
                <strong className="text-foreground">Permission to text:</strong> By checking this box, I
                give Jones Service Group express written consent to send me text messages (SMS) at the
                number provided, including using automated technology, regarding my project inquiry.
                Consent is not a condition of purchase. Msg & data rates may apply. Msg frequency varies.
                Reply STOP to opt out, HELP for help.
              </span>
            </label>
          )}

          <div>
            <Label htmlFor="qd-service">Service you're interested in</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id="qd-service"
                  className="mt-2 flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <span className={services.length === 0 ? "text-muted-foreground" : "truncate text-left"}>
                    {services.length === 0
                      ? "Select services"
                      : services.length === 1
                        ? services[0]
                        : `${services.length} selected`}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-[--radix-popover-trigger-width] max-h-[300px] overflow-y-auto p-1"
              >
                {SERVICE_OPTIONS.map((s) => (
                  <label
                    key={s}
                    className="flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm hover:bg-accent"
                  >
                    <Checkbox
                      checked={services.includes(s)}
                      onCheckedChange={() => toggleService(s)}
                    />
                    <span>{s}</span>
                  </label>
                ))}
              </PopoverContent>
            </Popover>
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
            <Label htmlFor="qd-message">Comment</Label>
            <Textarea
              id="qd-message"
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

          <p className="text-center text-xs text-muted-foreground">
            <a href="https://www.leadconnectorhq.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Privacy Policy</a>
            {" | "}
            <a href="https://www.leadconnectorhq.com/terms2" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">Terms of Service</a>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;