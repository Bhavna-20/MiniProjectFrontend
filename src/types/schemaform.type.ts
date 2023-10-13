import type { MaybeRef } from '@vueuse/core';
import type { Component, ComponentInternalInstance, ComputedRef } from 'vue';
import type { SchemaLike } from 'yup/lib/types';
import type {
  ValidationOptions,
  FormValidationResult,
  FormState,
} from 'vee-validate';
import type { OmitDynamicKey } from './common.type';

export interface SchemaFormRef {
  props: any;
  schemaForm: HTMLElement | HTMLFormElement;
  schemaFormValues: any;
  schemaFormRefs: ComponentInternalInstance;
  setValues: (fields: Record<string, unknown>) => void;
  setFieldValue: (field: string, value: any) => void;
  setErrors: (fields: Partial<Record<string, string | undefined>>) => void;
  setFieldError: (
    field: string,
    message: string | string[] | undefined
  ) => void;
  handleReset: () => void;
  resetForm: (
    state?: Partial<FormState<Record<string, any>>> | undefined
  ) => void;
  validate: (
    opts?: Partial<ValidationOptions> | undefined
  ) => Promise<FormValidationResult<Record<string, any>>>;
  errors?: ComputedRef<Partial<Record<string, string | undefined>>>;
}

export type OptionValueFn = (option: any) => any;
export interface SchemaFormField {
  label?: string;
  helpText?: string;
  name: string;
  hide?: boolean;
  required?: boolean;
  showFeedback?: boolean;
  as?: Component;
  type?: string;
  direction?: string;
  modelValue?: string | undefined;
  options?: Record<string, any>[];
  optionLabel?: string;
  optionValue?: string | OptionValueFn;
  formGridClass?: string;
  isLastField?: boolean;
  isRadioStacked?: boolean;
  softHide?: boolean;
  showSlot?: boolean;
  showLabelSlot?: boolean;
  [key: string]: unknown;
}

export type SchemaFormFieldWithoutDynamicKey = Omit<
  OmitDynamicKey<SchemaFormField>,
  'name'
>;

export interface SchemaForm {
  fields: SchemaFormField[];
  btnText?: string;
  secondaryBtnText?: string;
  validationSchema?: SchemaLike;
  initialValues?: MaybeRef<Record<string, any>> | undefined;
  initialTouched?: Record<string, boolean>;
  validateOnMount?: boolean;
  values?: unknown;
  hideButtons?: boolean;
  hideSecondaryBtn?: boolean;
}
