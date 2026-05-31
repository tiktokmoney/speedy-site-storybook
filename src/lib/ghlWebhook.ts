import { supabase } from "@/integrations/supabase/client";

export interface GhlPayload {
  submissionId: string;
  firstName?: string;
  lastName?: string;
  fullName: string;
  email: string;
  phone: string;
  contactMethod: "email" | "call" | "text";
  smsConsent: boolean;
  callConsent: boolean;
  services: string[];
  otherService: string;
  message: string;
  source: string;
}

export async function sendToGhlWebhook(payload: GhlPayload): Promise<void> {
  const { error } = await supabase.functions.invoke("send-ghl-webhook", {
    body: {
      ...payload,
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
    },
  });

  if (error) {
    console.error("GoHighLevel webhook failed", error);
    throw error;
  }
}