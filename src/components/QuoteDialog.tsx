import { useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  name: z.string().trim().min(1, "Name is required").max(100),
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
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [service, setService] = useState<string>(defaultService ?? "");
  const [otherService, setOtherService] = useState("");
  const [contactMethod, setContactMethod] = useState<"email" | "text" | "phone">("email");
  const [transactionalConsent, setTransactionalConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setForm({ name: "", email: "", phone: "", message: "" });
    setService(defaultService ?? "");
    setOtherService("");
    setContactMethod("email");
    setTransactionalConsent(false);
    setMarketingConsent(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast({ title: "Please check the form", description: result.error.issues[0].message });
      return;
    }
    if ((contactMethod === "text" || contactMethod === "phone") && !form.phone.trim()) {
      toast({
        title: "Phone number required",
        description: `Please add a phone number to be contacted by ${contactMethod === "text" ? "text" : "phone call"}.`,
      });
      return;
    }
    if (!transactionalConsent) {
      toast({
        title: "Consent required",
        description: "Please agree to receive transactional messages so we can respond.",
      });
      return;
    }
    setSubmitting(true);
    const submissionId = crypto.randomUUID();
    const messageToStore = form.message.trim() || "(no comment provided)";
    const { error } = await supabase.from("contact_submissions").insert({
      id: submissionId,
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      services: service ? [service] : [],
      other_service: service === "Something else" ? otherService.slice(0, 200) : null,
      message: messageToStore,
      source,
      contact_method: contactMethod,
      sms_consent: transactionalConsent,
    });
    if (!error) {
      const ownerEmails = ["Jonesservicegroup@gmail.com", "info@evercall.us"];
      const templateData = {
        name: form.name,
        email: form.email,
        phone: form.phone || "",
        services: service ? [service] : [],
        otherService: service === "Something else" ? otherService : "",
        message: `${messageToStore}\n\nTransactional consent: ${transactionalConsent ? "Yes" : "No"} · Marketing consent: ${marketingConsent ? "Yes" : "No"}`,
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
              <Label htmlFor="qd-name">Name *</Label>
              <Input id="qd-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} required />
            </div>
            <div>
              <Label htmlFor="qd-phone">Phone</Label>
              <Input id="qd-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
            </div>
          </div>
          <div>
            <Label htmlFor="qd-email">Email *</Label>
            <Input id="qd-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} required />
          </div>

          <div>
            <Label htmlFor="qd-service">Service you're interested in</Label>
            <Select value={service} onValueChange={setService}>
              <SelectTrigger id="qd-service" className="mt-2">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {service === "Something else" && (
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

          <div>
            <Label>How would you like to be contacted? *</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(v) => setContactMethod(v as "email" | "text" | "phone")}
              className="mt-3 grid gap-2 sm:grid-cols-3"
            >
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card p-3 transition-colors hover:border-primary">
                <RadioGroupItem value="email" id="qd-c-email" />
                <span className="text-sm">Email</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card p-3 transition-colors hover:border-primary">
                <RadioGroupItem value="text" id="qd-c-text" />
                <span className="text-sm">Text (SMS)</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card p-3 transition-colors hover:border-primary">
                <RadioGroupItem value="phone" id="qd-c-phone" />
                <span className="text-sm">Phone Call</span>
              </label>
            </RadioGroup>
          </div>

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              checked={transactionalConsent}
              onCheckedChange={(v) => setTransactionalConsent(v === true)}
              className="mt-0.5"
              required
              aria-required="true"
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

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            {submitting ? <><Loader2 className="animate-spin" /> Sending…</> : "Send Request"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
            {" | "}
            <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;