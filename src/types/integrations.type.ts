import { object, string } from 'yup';
import type { InferType } from 'yup';

export interface Integration {
  id: 'QUICKBOOKS' | 'CALENDLY' | 'XERO';
  name: string;
  isActive: boolean;
  picture: string;
  scope: string[];
  description?: string;
  data?: {
    [key: string]: any;
  };
}
export const calendlySchema = object({
  url: string()
    .url()
    .matches(
      /^https:\/\/calendly\.com\/[^\s]*$/,
      'Please enter a valid URL in the format https://calendly.com/user_id'
    )
    .required()
    .label('Calendly URL'),
});

export type CalendlyPayload = InferType<typeof calendlySchema>;
export type CalendlyResponse = CalendlyPayload;
