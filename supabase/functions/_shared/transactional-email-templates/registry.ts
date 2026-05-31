/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as ownerFormNotification } from './owner-form-notification.tsx'
import { template as customerConfirmation } from './customer-confirmation.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'owner-form-notification': ownerFormNotification,
  'customer-confirmation': customerConfirmation,
}