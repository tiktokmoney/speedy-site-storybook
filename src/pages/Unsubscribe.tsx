import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, MailX, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@/assets/jsg-logo.png";
import { supabase } from "@/integrations/supabase/client";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State =
  | { status: "loading" }
  | { status: "valid" }
  | { status: "already" }
  | { status: "invalid" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; message: string };

const Unsubscribe = () => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setState({ status: "invalid" });
        return;
      }
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (!res.ok) {
          setState({ status: "invalid" });
          return;
        }
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setState({ status: "already" });
          return;
        }
        if (data.valid === true) {
          setState({ status: "valid" });
          return;
        }
        setState({ status: "invalid" });
      } catch {
        setState({ status: "error", message: "Couldn't reach the server. Please try again." });
      }
    };
    validate();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ status: "submitting" });
    const { data, error } = await supabase.functions.invoke(
      "handle-email-unsubscribe",
      { body: { token } },
    );
    if (error) {
      setState({ status: "error", message: "Something went wrong. Please try again." });
      return;
    }
    if (data?.success || data?.reason === "already_unsubscribed") {
      setState({ status: "success" });
      return;
    }
    setState({ status: "error", message: "We couldn't process your request." });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="border-b border-border">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Jones Service Group logo" className="h-12 w-12 rounded object-cover" />
            <span className="font-bold tracking-wide">JONES SERVICE GROUP</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto flex flex-1 items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md border-border/60 shadow-lg">
          <CardContent className="p-8 text-center">
            {state.status === "loading" && (
              <>
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">Checking your link…</p>
              </>
            )}

            {state.status === "valid" && (
              <>
                <MailX className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-2xl font-bold">Unsubscribe</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Confirm to stop receiving emails from Jones Service Group.
                </p>
                <Button onClick={confirm} size="lg" className="mt-6 w-full">
                  Confirm Unsubscribe
                </Button>
              </>
            )}

            {state.status === "submitting" && (
              <>
                <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-sm text-muted-foreground">Processing…</p>
              </>
            )}

            {state.status === "success" && (
              <>
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-2xl font-bold">You're unsubscribed</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  You won't receive further emails from us. You can still call or text us anytime.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/">Back to Home</Link>
                </Button>
              </>
            )}

            {state.status === "already" && (
              <>
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 text-2xl font-bold">Already unsubscribed</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  This email address is already removed from our list.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/">Back to Home</Link>
                </Button>
              </>
            )}

            {state.status === "invalid" && (
              <>
                <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="mt-4 text-2xl font-bold">Invalid link</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  This unsubscribe link is invalid or has expired.
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <Link to="/">Back to Home</Link>
                </Button>
              </>
            )}

            {state.status === "error" && (
              <>
                <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="mt-4 text-2xl font-bold">Something went wrong</h1>
                <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Unsubscribe;