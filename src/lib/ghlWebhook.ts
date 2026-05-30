const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/wZtX3SzZytYTiq6TPaVo/webhook-trigger/540ba383-20d4-4cc6-ace2-4ac805b91d7c";

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
  try {
    await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "no-cors",
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      }),
    });
  } catch (err) {
    console.error("GoHighLevel webhook failed", err);
  }
}