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

interface OwnerFormNotificationProps {
  name?: string
  email?: string
  phone?: string
  services?: string[]
  otherService?: string
  message?: string
  contactMethod?: string
  source?: string
  submittedAt?: string
}

const OwnerFormNotificationEmail = ({
  name,
  email,
  phone,
  services,
  otherService,
  message,
  contactMethod,
  source,
  submittedAt,
}: OwnerFormNotificationProps) => {
  const serviceList =
    services && services.length > 0 ? services.join(', ') : 'Not specified'
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>New estimate request from {name || 'a website visitor'}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Estimate Request</Heading>
          <Text style={subtitle}>
            A new lead just came in through {source || 'your website'}.
          </Text>

          <Section style={card}>
            <Text style={label}>Name</Text>
            <Text style={value}>{name || '—'}</Text>

            <Hr style={divider} />

            <Text style={label}>Email</Text>
            <Text style={value}>{email || '—'}</Text>

            <Hr style={divider} />

            <Text style={label}>Phone</Text>
            <Text style={value}>{phone || '—'}</Text>

            <Hr style={divider} />

            <Text style={label}>Preferred contact method</Text>
            <Text style={value}>{contactMethod || '—'}</Text>

            <Hr style={divider} />

            <Text style={label}>Services interested in</Text>
            <Text style={value}>{serviceList}</Text>

            {otherService ? (
              <>
                <Hr style={divider} />
                <Text style={label}>Other / details</Text>
                <Text style={value}>{otherService}</Text>
              </>
            ) : null}

            <Hr style={divider} />

            <Text style={label}>Message</Text>
            <Text style={value}>{message || '—'}</Text>
          </Section>

          {submittedAt ? (
            <Text style={footer}>Submitted {submittedAt}</Text>
          ) : null}
          <Text style={footer}>{SITE_NAME} · website notification</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: OwnerFormNotificationEmail,
  subject: (data: Record<string, any>) =>
    `New estimate request${data?.name ? ` — ${data.name}` : ''}`,
  displayName: 'Owner: new form submission',
  previewData: {
    name: 'Jane Homeowner',
    email: 'jane@example.com',
    phone: '859-555-0123',
    services: ['Patios & Retaining Walls', 'Outdoor Lighting'],
    message: 'Looking for a quote on a paver patio in Fort Mitchell.',
    contactMethod: 'phone',
    source: 'contact_page',
    submittedAt: 'May 7, 2026 2:14 PM',
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
  fontSize: '14px',
  color: '#525252',
  margin: '0 0 24px',
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
  margin: '0 0 4px',
}
const value = {
  fontSize: '15px',
  color: '#171717',
  margin: '0 0 4px',
  whiteSpace: 'pre-wrap' as const,
}
const divider = { borderColor: '#e5e5e5', margin: '14px 0' }
const footer = {
  fontSize: '12px',
  color: '#a3a3a3',
  marginTop: '24px',
  textAlign: 'center' as const,
}