import type { EntityObj, MetaObj } from '@/types/common.type';
import type { LocationQueryRaw, RouteParamsRaw } from 'vue-router';
import type { InferType } from 'yup';
import type { Attachment } from './attachment.type';
import type { Project } from './project.type';
import type { Role } from './role.type';
import type { User } from './teams.type';
import type { Tag } from './tags.type';
import { object, string, array, number, boolean } from 'yup';
import { emailSchema } from './common.validation.type';

export interface Client {
  id: string;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  businessEntity: EntityObj & { businessType: string };
  name: string;
  engagementLetterStatus: string;
  role: Role;
  relationshipManager: RelationshipManager;
  _count?: {
    clientUsers: number;
    projects: number;
    entities: number;
  };
  isSetupCompleted?: boolean;
  meta?: MetaObj[];
  email?: string;
  regId?: string;
  taxId?: string;
  members?: User[];
  clientUsers?: ClientUser | ClientUser[];
  sin?: string;
  ein?: string;
  businessType?: string;
  mobile?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  state?: string;
  country?: string;
  notes?: string;
  servicesUsedBefore?: string;
  isFiledReturnLastYear?: boolean;
  businessEntityId?: string;
  website?: string;
  clientStates?: ClientState[];
  [key: string]: unknown;
  contracts: Contract[];
  projects: Project[];
  tags?: Tag[];
}

export interface ClientState {
  id: string;
  state: {
    id: string;
    name: string;
    country: string;
  };
}

export interface ClientStatesResponse extends ClientState {
  clientId: string;
  createdAt: string;
  isActive: boolean;
  projects: Project[];
  _count: {
    clientServices: number;
    projects: number;
  };
}

export interface CommonUser {
  email: string;
  firstName: string;
  mobile?: string;
  id?: string;
  lastName?: string;
  isOwner?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  meta?: MetaObj[];
  roleId?: string;
  [key: string]: unknown;
}

export const ClientAuthUserDisableSchema = object({
  clientUserId: string().required().label('User'),
});

export interface CommonClientState {
  state: string | string[];
  id?: string;
  stateId?: string;
  country: string;
  stateOptions?: state[];
  serviceCount?: number;
  name?: string;
  activeProjectCount?: number;
  completedProjectCount?: number;
  createdAt?: string;
  isActive?: boolean;
  stateName?: string;
}
export interface CommonClientService {
  accountingPeriod: AccountingPeriod;
  serviceId: string;
  id?: string;
  projectManagerId: string;
  reminderDays: number;
  dueInDays: number;
  disableService?: boolean;
  stateId?: string;
  isFederal?: boolean;
  disableAll?: boolean;
}

export interface state {
  id: string;
  name: string;
}

export interface ClientUser {
  id: string;
  user: CommonUser;
  isOwner: boolean;
  isActive: boolean;
  email?: string;
  firstName?: string;
  role?: { id: string; name: string };
}

export type RelationshipManager = Pick<
  Client,
  'id' | 'firstName' | 'lastName' | 'email' | 'isActive' | 'isDeleted'
>;

export type CreateClientPayload = Omit<
  Client,
  'id' | 'isVerified' | 'isActive' | 'businessEntity'
> & {
  businessEntityId: string;
};

export type ClientUserPayload = {
  clientUsers?: CommonUser[];
};

export type ClientStatesPayload = {
  stateIds: string[];
};

export type ClientCreatePayload = InferType<typeof ClientCreatePayloadSchema>;
export type ClientUpdatePayload = InferType<typeof ClientInfoPayloadSchema> &
  ClientUserPayload;

export const ClientStatesBulkPayloadSchema = object({
  country: string().required('Country is required'),
  stateIds: array()
    .of(string().required())
    .min(1)
    .required('State is required'),
});

export const ClientUpdatePayloadSchema = object({
  name: string().required().min(3).label('Name'),
  businessEntityId: string().required().label('Business Entity'),
  email: string().required().email().label('Email'),
  relationshipManagerId: string().required().label('Relationship Manager'),
});

export const ClientCreatePayloadSchema = ClientUpdatePayloadSchema.shape({
  country: string().required().label('Country'),
  stateIds: array().of(string()).required().min(1).label('States'),
});

export const ClientInfoPayloadSchema = object({
  name: string().required().min(3).label('Name'),
  businessEntityId: string().required().label('Business Entity'),
  email: string().optional().email().label('Email'),
  ssn: string().optional().label('SSN'),
  ein: string().optional().label('EIN'),
  notes: string().optional().label('Notes'),
  mobile: string().nullable().validatePhone({}).label('Mobile'),
  address: string().optional().label('Address'),
  state: string().optional().label('State'),
  city: string().optional().label('City'),
  country: string().optional().label('Country'),
  zipcode: string().optional().label('Zipcode'),
  isFiledReturnLastYear: string().optional().label('Filed Return Last Year'),
  servicesUsedBefore: string()
    .when('isFiledReturnLastYear', {
      is: 'true',
      then: string().required().label('Services Used Before'),
    })

    .label('Services Used Before'),
  website: string().optional().label('Website'),
});

export const ClientStatesSchema = object({
  state: array().of(string()).required().label('State'),
  country: string().required().label('Country'),
});
export const ClientServiceSchema = object({
  services: array().of(string()).required().label('Services'),
});

export const CreateUserPayloadSchema = object().shape({
  users: array().of(
    object().shape({
      email: emailSchema,
      mobile: string().required().nullable().validatePhone({}).label('Mobile'),
      firstName: string().min(3).label('Team Member').required(),
    })
  ),
});
export const UpdateClientStatesSchema = object().shape({
  states: array().of(
    object().shape({
      country: string().required().label('Country'),
      state: array().of(string()).required().min(1).label('States'),
    })
  ),
});
export const UpdateClientServicesSchema = object().shape({
  services: array().of(
    object().shape({
      accountingPeriod: string().required().label('Frequency'),
      serviceId: string().required().label('service'),
      projectManagerId: string().required().label('Project Manager'),
      dueInDays: number().typeError('').required().label('Due In days'),
      reminderDays: number().typeError('').required().label('Remainder days'),
    })
  ),
});
export const CreateAuthUserPayloadSchema = object().shape({
  authUser: array().of(
    object().shape({
      email: emailSchema,
      mobile: string().required().nullable().validatePhone({}).label('Mobile'),
      firstName: string().min(3).label('Team Member').required(),
    })
  ),
});

export type CreateClientStates = InferType<typeof ClientStatesSchema>;
export type ClientServices = InferType<typeof ClientServiceSchema>;

export interface ClientStateCreatePayload {
  stateId: string;
}

export type AccountingPeriod =
  | 'WEEKLY'
  | 'BIWEEKLY'
  | 'MONTHLY'
  | 'QUARTERLY'
  | 'HALFYEARLY'
  | 'YEARLY';

export interface AccountingPeriodOptions {
  label: string;
  value: AccountingPeriod;
  name: string;
}

export interface ClientServicePayload {
  accountingPeriod: string;
  serviceId: string;
  projectManagerId: string;
  dueInDays: number;
  reminderDays: number;
  isFederal?: boolean;
  stateId?: string;
}
// engagementletter type and schema

export type ContractStatus =
  | 'OPEN'
  | 'SIGNED'
  | 'ATTACHED'
  | 'GENERATED_DOCUMENT'
  | 'GENERATED_LINK';

export const genEngagementLetterSchema = object({
  cpaFirmName: string().required().label('CPA Firm Name'),
  cpaFirmLogo: string().optional().label('CPA Firm Logo'),
  cpaFirmRepresentative: string()
    .required()
    .label('CPA Firm Representative Name'),
  cpaFirmRepresentativeDesignation: string()
    .required()
    .label('CPA Firm Representative Designation'),
  filingYear: string().required().nullable().label('Filing Year'),
  isLastYearFiled: boolean().required().label('Is Last Year Filed'),
  professionalFee: number().required().nullable().label('Professional Fee'),
  percentageDueUponSigning: number()
    .required()
    .nullable()
    .label('Percentage Due Upon Signing'),
  clientName: string().required().label('Client Name'),
  clientRepresentative: string().optional().label('Client Representative'),
  clientRepresentativeTitle: string()
    .optional()
    .label('Client Representative Title'),
  clientStreet: string().optional().label('Client Street'),
  clientZip: number().optional().label('Client Zip'),
  clientState: string().optional().label('Client State'),
  clientCity: string().optional().label('Client City'),
  clientSpouseName: string().optional().label('Client Spouse Name'),
  states: array().of(
    object().shape({
      states: array().of(string().required()).min(1).required().label('State'),
      formNumber: string()
        .trim()
        .required()
        .matches(
          /^[a-zA-Z0-9-]*$/,
          `Form Number should be alphanumeric and '-'`
        )
        .label('Form Number'),
      service: string().required().label('Service'),
    })
  ),
});

export type genEngagementLetterPayload = InferType<
  typeof genEngagementLetterSchema
> & { [key: string]: unknown };

export interface serviceByStatePaylaod {
  state: string;
  service: string;
  formNumber: string;
}

export interface engageMentLetterStatesPayload {
  states: string[];
  formNumber: string;
  service: string;
}

export interface Contract {
  id: string;
  isActive: boolean;
  attachments: {
    id: string;
    name: string;
    path: string;
    updatedAt: string;
  }[];
  name: string;
  client: {
    id: string;
    name: string;
    businessEntity: {
      id: string;
      name: string;
      orgId: string | null;
    };
  };
  org: {
    id: string;
    logo: Attachment;
    name: string;
  };
  status: ContractStatus;
  type: string;
}

export interface CreateContract {
  name?: string;
  type?: string;
  data?: string;
  attachment: string;
}

export const shareContractSchema = object({
  email: string().required().email().label('Email'),
});
export interface ShareContractPayload {
  email: string;
  isDocument?: boolean;
  link?: string;
}

// dashboard types
interface UnscheduleProjectsData {
  unscheduleProjects: number;
  clients: number;
}
interface ScheduleProjectsData {
  scheduleProjects: number;
  clients: number;
}
interface TopActiveProjectsData {
  id: string;
  name: string;
  entities: {
    id: string;
  };
  _count: {
    entities: number;
  };
  dueDate: Date;
}

interface TodaysTaskData {
  id: string;
  client: {
    id: string;
    name: string;
  };
  meta: MetaObj[];
  dueDate: Date;
}

interface AssignedTeamData {
  id: string;
  firstName: string;
  lastName: string;
  picture: {
    path: string;
  };
  email: string;
  isActive: boolean;
}

interface UpcomingProjectData {
  upcomingProjectsIn7Days: number;
  upcomingProjectsIn14Days: number;
  upcomingProjectsIn21Days: number;
  upcomingProjectsIn28Days: number;
  clients: number;
}
interface TodaysTaskData {
  id: string;
  client: {
    id: string;
    name: string;
  };
  meta: MetaObj[];
  dueDate: Date;
}

export interface DashboardClient {
  unscheduleProjects: UnscheduleProjectsData;
  scheduleProjects: ScheduleProjectsData;
  activeProjects: ScheduleProjectsData;
  completedProjects: ScheduleProjectsData;
  upcomingProjects: UpcomingProjectData;
  assignedTeam: AssignedTeamData;
  todaysTasks: TodaysTaskData;
  totalBillAmount: string;
}

export interface WorkingTeam {
  name: string;
  actingAs: string;
  designation: string;
  contact: string;
  noOfProjects: number;
}

export interface ImportedClient {
  Id: string;
  DisplayName: string;
  PrimaryEmailAddr?: {
    Address: string;
  };
  Mobile?: { FreeFormNumber: string };
  BillAddr?: {
    Line1: string;
    Line2: string;
    City: string;
    PostalCode: string;
  };
  Balance?: number;
}

export interface CreateBulkClient {
  name: string;
  email?: string;
  mobile?: string;
  address?: string;
  city?: string;
  zipcode?: string;
  state?: string;
  country?: string;
  quickbooksId?: string;
  balance?: string;
  xeroCompanyId?: string;
  xeroId?: string;
}

export interface ImportedClientResponse {
  results: ImportedClient[];
  total: number;
}

export type HandleStepFunc = (
  step: number | string,
  query?: LocationQueryRaw,
  params?: RouteParamsRaw
) => void;
