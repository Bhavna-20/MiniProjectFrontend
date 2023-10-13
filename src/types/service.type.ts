import type { InferType } from 'yup';
import { boolean, number, object, string } from 'yup';
import type { MetaObj } from './common.type';
import type { Org } from './myaccount.type';
import type { TaskTemplate } from './task-template.type';

type BillingType = 'NONE' | 'FIXED' | 'HOURLY';

export interface Service {
  id: string;
  name: string;
  isSetupCompleted?: boolean;
  description?: string;
  billingType: BillingType;
  billingRate?: string;
  estimatedTime?: string;
  meta?: MetaObj[];
  org?: Org;
  taskTemplates: TaskTemplate[];
}

export const CreateServiceSchema = object({
  name: string().required().min(3).label('Name'),
  billingType: string().required().label('Billing Type'),
  billingRate: number()
    .nullable()
    .when('billingType', (billingType, schema) => {
      if (billingType && billingType !== 'NONE') {
        return schema.min(1).required().label('Billing Amount');
      }
    })
    .label('Billing Amount'),
  description: string()
    .optional()
    .nullable()
    .when('isBrightAssist', (isBrightAssist, schema) => {
      if (isBrightAssist) {
        return schema.required().label('Description');
      } else {
        return schema.label('Description');
      }
    })
    .label('Description'),
  // description: string().optional().label('Description'),
  // estimatedTime: number().optional().label('Budget Time'),
  isBrightAssist: boolean().optional().nullable().label('Bright Assist'),
});

export type CreateServicePayload = InferType<typeof CreateServiceSchema> & {
  entityTemplates?: TaskTemplate[];
};

export const TemplateSchema = object({
  template: string().required().nullable().label('Template'),
});

export type TemplatePayload = InferType<typeof TemplateSchema>;

export const AddDescriptionSchema = object({
  description: string().required().nullable().label('Description'),
});
