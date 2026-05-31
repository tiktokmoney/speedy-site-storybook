import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Jones Service Group'
const PHONE = '859.743.1546'
const REPLY_EMAIL = 'Jonesservicegroup@gmail.com'

interface CustomerConfirmationProps {
  name?: string
  services?: string[]
  otherService?: string
  message?: string
  contactMethod?: string
}

const CustomerConfirmationEmail = ({
  name,
  services,
  otherService,
  message,
  contactMethod,
}: CustomerConfirmationProps) => {
  const serviceList =
    services && services.length > 0 ? services.join(', ') : null
  const methodLine =
    contactMethod === 'call'
      ? "We'll give you a call at the number you provided."
      : "We'll be in touch by email shortly."
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {name ? `Thanks, ${name}!` : 'Thanks for reaching out!'}
          </Heading>
          <Text style={subtitle}>
            We received your estimate request and a member of our team will get
            back to you within 24 hours. {methodLine}
          </Text>

          <Section style={card}>
            <Text style={label}>Your request</Text>
            {serviceList ? (
              <>
                <Text style={value}>
                  <strong>Services:</strong> {serviceList}
                </Text>
              </>
            ) : null}
            {otherService ? (
              <Text style={value}>
                <strong>Details:</strong> {otherService}
              </Text>
            ) : null}
            {message ? (
              <>
                <Hr style={divider} />
                <Text style={label}>Your message</Text>
                <Text style={value}>{message}</Text>
              </>
            ) : null}
          </Section>

          <Text style={paragraph}>
            Need to reach us sooner? Call <strong>{PHONE}</strong> or reply to
            this email at <strong>{REPLY_EMAIL}</strong>.
          </Text>

          <Hr style={divider} />
          <Text style={footer}>
            {SITE_NAME} · Northern Kentucky's trusted outdoor living &
            hardscape team
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: CustomerConfirmationEmail,
  subject: `We received your request — ${SITE_NAME}`,
  displayName: 'Customer: estimate request confirmation',
  previewData: {
    name: 'Jane',
    services: ['Patios & Retaining Walls', 'Outdoor Lighting'],
    message: 'Looking for a quote on a paver patio in Fort Mitchell.',
    contactMethod: 'email',
  },
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
}
const container = { padding: '24px', maxWidth: '600px', margin: '0 auto' }
const h1 = {
  fontSize: '24px',
  fontWeight: 700,
  color: '#0a0a0a',
  margin: '0 0 8px',
}
const subtitle = {
  fontSize: '15px',
  color: '#404040',
  lineHeight: '1.55',
  margin: '0 0 24px',
}
const paragraph = {
  fontSize: '14px',
  color: '#404040',
  lineHeight: '1.55',
  margin: '20px 0 0',
}
const card = {
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  padding: '20px 24px',
  backgroundColor: '#fafafa',
}
const label = {
  fontSize: '12px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: '#737373',
  margin: '0 0 8px',
}
const value = {
  fontSize: '15px',
  color: '#171717',
  margin: '0 0 6px',
  whiteSpace: 'pre-wrap' as const,
}
const divider = { borderColor: '#e5e5e5', margin: '20px 0' }
const footer = {
  fontSize: '12px',
  color: '#a3a3a3',
  marginTop: '12px',
  textAlign: 'center' as const,
}