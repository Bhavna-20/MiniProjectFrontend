import type { RouteLocationRaw } from 'vue-router';

export interface MenuItem {
  label: string;
  icon?: string;
  to?: RouteLocationRaw;
  items?: MenuItem[];
  separator?: boolean;
  disabled?: boolean;
  style?: string;
  class?: string;
  target?: string;
  badge?: number | string;
  url?: string;
  name?: string;
  visible?: () => void | boolean;
  command?: (value: { originalEvent: Event; item: MenuItem }) => void;
}
