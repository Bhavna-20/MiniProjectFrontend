import type { InferType } from 'yup';
import { boolean, object, string } from 'yup';
import type { Attachment } from './attachment.type';

export type MFAProvider = 'EMAIL' | 'TOTP';
export interface Meta {
  metaKey: string & Meta[];
  metaValue: string & Meta[];
}
export interface Org {
  id?: string;
  name: string;
  subdomain?: string;
  domain?: string;
  regId?: string;
  taxId?: string;
  logo?: Attachment;
  regCertificate?: Attachment;
  contact_person_name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
  website?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  signature?: string;
  isOwner?: boolean;
  meta?: Meta[] | null;
  onTrial?: boolean;
  subscriptionEndDate?: string;
  orgSubscriptionResources?: OrgSubscriptionResources[];
  isOnBoardingCompleted?: boolean;
  [key: string]: unknown;
}

/* const inst2 = object().shape({
  location: object().shape(
    {
      state: string().when('county', {
        is: '',
        then: string().required(),
        otherwise: string(),
      }),
      county: string().when('state', {
        is: '',
        then: string().required(),
        otherwise: string(),
      }),
    },
    ['county', 'state']
  ),
}); */

export interface OrgSubscriptionResources {
  id: string;
  orgId: string;
  subscriptionId: string;
  resource: 'TEAM_MEMBER';
  limit: number;
  usage: number;
  createdAt: string;
  updatedAt: string;
}

export const OrgCreatePayloadSchema = object().shape(
  {
    name: string().required().min(3).label('Name'),
    regId: string().optional().nullable().label('Registration ID'),
    registration_certificate_preview: string()
      .optional()
      .nullable()
      .label('Registration ID'),
    contact_person_name: string()
      .optional()
      .nullable()
      .label('Contact Person Name'),
    email: string().optional().nullable().email().label('Email'),
    mobile: string().optional().nullable().validatePhone({}).label('Mobile'),
    address: string().optional().nullable().label('Address'),
    city: string().optional().nullable().label('City'),
    state: string().optional().nullable().label('State'),
    zipcode: string()
      .optional()
      .nullable()
      .when('zipcode', (zipcode, schema) => {
        if (zipcode && zipcode.length) {
          return schema
            .trim()
            .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/, 'Invalid Zipcode')
            .label('Zipcode');
        }
      })
      .label('Zipcode'),
    country: string().optional().nullable().label('Country'),
    website: string().optional().nullable().url().label('Website'),
    linkedIn: string().optional().nullable().url().label('LinkedIn'),
    twitter: string().optional().nullable().url().label('Twitter'),
    instagram: string().optional().nullable().url().label('Instagram'),
    facebook: string().optional().nullable().url().label('Facebook'),
    signature: string().optional().nullable().label('Signature'),
    timezone: string().optional().nullable().label('Time Zone'),

    teamSize: string().min(0).optional().nullable().label('Team Size'),
    noOfClients: string()
      .min(0)
      .optional()
      .nullable()
      .label('Total no. of clients'),
    source: string().optional().nullable().label('Source'),
    needAssistance: string().optional().nullable().label('Nedd Assistance'),
    isMfaEnabled: boolean().optional().nullable(),
    autoLogoutInterval: string().optional().nullable().label('Auto Logout'),
  },
  [['zipcode', 'zipcode']]
);

export type OrgCreatePayload = InferType<typeof OrgCreatePayloadSchema> & {
  logo: string;
  regCertificate: string;
  timezone: string;
};

export const onBoardingPayloadSchema = object().shape({
  name: string().required().min(3).label('Name'),
  mobile: string()
    .required()
    .when('country', (country, schema) => {
      if (country && country === 'INDIA') {
        return schema.validatePhone({ countryCode: 'IN' });
      }
      return schema.validatePhone({ countryCode: 'US' });
    })

    .label('Mobile'),
  country: string().required().label('Country'),
  teamSize: string().required().label('Team Size'),
  noOfClients: string().required().label('Total no. of clients'),
  source: string().required().label('Source'),
  needAssistance: string().required().label('Nedd Assistance'),
  otherSource: string().when('source', (source, schema) => {
    if (source && source === 'other')
      return schema.required().label('Other Source');
  }),
});

export const autoLogoutIntervalSchema = object().shape({
  interval: string().required().label('Interval'),
});

export type AutoLogoutIntervalPayload = InferType<
  typeof autoLogoutIntervalSchema
>;

export interface IntervalOption {
  label: string;
  value: string;
  default?: boolean;
  securitySetting?: boolean;
}

export interface CreateMfaDto {
  email: string;
  TOTP?: string;
  provider: MFAProvider;
}
export interface MFASecret {
  dataUrl?: string;
  message?: string;
}
