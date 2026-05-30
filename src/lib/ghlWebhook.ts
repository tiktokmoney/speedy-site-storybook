const GHL_WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/wZtX3SzZytYTiq6TPaVo/webhook-trigger/5493299d-d961-497a-8893-9cff31013ef0";

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