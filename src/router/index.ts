import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import { useNProgress } from '@vueuse/integrations/useNProgress';
import generatedRoutes from '~pages';
import { useCookies } from '@vueuse/integrations/useCookies';
import type { User } from '@/types/teams.type';
import PostDetails from '@/components/PostDetails.vue';

const cookies = useCookies(['isloggedin', 'user']);

const { start: startProgress, done: stopProgress } = useNProgress();

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

let isLoggedIn: string | boolean = false;
let currentUser: User | null = null;

// const accessiblePortalRoutes = portalRouteNames;

// console.log(accessiblePortalRoutes.value);

router.beforeEach(async (to, from, next) => {
  // Add page loading progress bar
  if (to.path) {
    startProgress();
  }

  isLoggedIn = await cookies.get('isloggedin');
  currentUser = await cookies.get('user');
  next();
});

router.afterEach(() => {
  stopProgress();
});

export default router;

export { isLoggedIn };
