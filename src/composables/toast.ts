import { useToast } from 'primevue/usetoast';

import app from '@/app';

export function showToastSuccess(message: string) {
  app.config.globalProperties.$toast.add({
    severity: 'success',

    summary: 'Info',

    detail: message,

    life: 5000,
  });
}

export function showToastError(message: string) {
  app.config.globalProperties.$toast.add({
    severity: 'error',

    summary: 'Error',

    detail: message,

    life: 5000,
  });
}
