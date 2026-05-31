import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'

const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/wZtX3SzZytYTiq6TPaVo/webhook-trigger/5493299d-d961-497a-8893-9cff31013ef0'

const allowedMethods = new Set(['email', 'call', 'text'])

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  let payload: Record<string, unknown>

  try {
    payload = await req.json()
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const contactMethod = String(payload.contactMethod || '')
  const phone = String(payload.phone || '').trim()
  const email = String(payload.email || '').trim()

  if (!allowedMethods.has(contactMethod)) {
    return new Response(JSON.stringify({ error: 'Invalid contactMethod' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  if (contactMethod === 'email' && !email) {
    return new Response(JSON.stringify({ error: 'Email is required for email contact method' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  if ((contactMethod === 'call' || contactMethod === 'text') && !phone) {
    return new Response(JSON.stringify({ error: 'Phone is required for phone or text contact method' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const webhookPayload = {
    ...payload,
    submittedAt: new Date().toISOString(),
  }

  try {
    const response = await fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    })

    const responseText = await response.text()

    console.log('GoHighLevel webhook result', {
      ok: response.ok,
      status: response.status,
      contactMethod,
      submissionId: payload.submissionId,
      responseText: responseText.slice(0, 500),
    })

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: 'Webhook rejected the request', status: response.status, responseText }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      )
    }

    return new Response(JSON.stringify({ success: true, status: response.status }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('GoHighLevel webhook failed', { error, contactMethod, submissionId: payload.submissionId })

    return new Response(JSON.stringify({ error: 'Webhook request failed' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})