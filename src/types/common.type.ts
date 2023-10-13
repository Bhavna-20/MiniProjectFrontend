import type { AxiosRequestConfig } from 'axios';
export interface Tab {
  name: string;
}
export type APIActions =
  | 'Sign in'
  | 'Sign up'
  | 'Logout'
  | 'Create'
  | 'Update'
  | 'Add'
  | 'Delete'
  | 'Remove'
  | 'Reject'
  | 'Cancel'
  | 'Approve'
  | 'Error'
  | 'Enable'
  | 'Disable'
  | 'Activate'
  | 'Deactivate'
  | 'Archive'
  | 'Restore';
export interface PaginatedResponse<T> {
  results: T[];
  newResults?: T[];
  total: number;
}

export type EmptyObj = { [key: string]: unknown };

export type FilterSearch = {
  global?: string | any;
};

export interface UploadFilesPayload {
  xhr?: XMLHttpRequest;
  files: File | File[];
}

export interface FullNameObject {
  id: string;
  firstName: string;
  lastName: string;
}

export interface FileObject {
  files: File | File[];
  name?: string;
}
export interface MetaObj {
  metaKey: string;
  metaValue: string;
}

export interface EntityObj {
  id: string;
  name: string;
  description: string;
}
export type CustomAxiosRequestConfig = AxiosRequestConfig & {
  catchErrors: boolean;
};

export type TimelineSteps = {
  title: string;
  subtitle?: string;
  icon?: string;
  color?: string;
  content?: string;
  hideCta?: boolean;
  ctaText?: string;
  route?: string;
  status?: 0 | 1 | 2;
  isRequired?: boolean;
  hidden: boolean;
};

export interface Step {
  [x: string]: any;
  name: string;
  label: string;
}

export type ContentJSON = {
  content: string;
  delta?: any;
};

export type CommonUserType = 'ORG_USER' | 'CLIENT_USER' | 'API_USER';

export interface CommonLocation {
  lat: string;
  long: string;
}

export interface CountDownCircle {
  circles: any[];
  mainCircleId: string | number;
  containerClasses?: string[];
  circleClasses?: string[];
  interval?: number;
  stopConditions?: any;
  triggerUpdate?: boolean;
  size?: number;
  strokeWidth?: number;
  strokeColor?: string; // css variable name
  underneathStrokeColor?: string; // css variable name
  fillColor?: string; // css variable name
  valueFontSize?: number;
  labelFontSize?: number;
  labelPosition?: 'top' | 'bottom';
  showValue?: boolean;
  value?: number;
  label?: string;
}

export type OmitDynamicKey<T> = Omit<T, keyof { [key: string]: unknown }>;
// export type OmitDynamicKey = 'Test' | 'Dynamic';
