<script setup lang="ts">
import router from '@/router';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();
const isAuthenticated = computed(() => store.state.isLoggedIn);

const switchToAdmin = computed(() => {
  return route.path.includes('/admin/');
});
const logout = async () => {
  await store.dispatch('logout');
  router.push('/auth/signin');
};

const switchAdmin = () => {
  switchToAdmin.value = !switchToAdmin.value;
  console.log(switchAdmin);
};
</script>

<template>
  <BlockViewer header="With Branding" :previewStyle="{ height: '400px' }">
    <div
      class="surface-overlay py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static"
      style="min-height: 80px"
    >
      <img
        src="./../assets/images/Logo.jpg"
        alt="Image"
        height="50"
        class="mr-0 lg:mr-6"
      />
      <a
        v-ripple
        class="cursor-pointer block lg:hidden text-700 mt-1 p-ripple"
        v-styleclass="{
          selector: '@next',
          enterClass: 'hidden',
          leaveToClass: 'hidden',
          hideOnOutsideClick: true,
        }"
      >
        <i class="pi pi-bars text-4xl"></i>
      </a>
      <div
        class="align-items-center flex-grow-1 justify-content-end hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 z-1 shadow-2 lg:shadow-none"
      >
        <ul
          class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row"
        >
          <li>
            <a
              v-ripple
              href="/"
              class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
            >
              <i class="pi pi-home mr-2"></i>
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              v-ripple
              href="/posts"
              class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
            >
              <i class="pi pi-book mr-2"></i>
              <span>Posts</span>
            </a>
          </li>
          <div v-if="isAuthenticated" class="flex">
            <li>
              <a
                v-ripple
                :href="switchToAdmin ? '/user/posts' : '/admin/posts'"
                @click="switchAdmin"
                class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
              >
                <i class="pi pi-user mr-2"></i>
                <span>{{
                  switchToAdmin ? 'Switch to User' : 'Switch to Admin'
                }}</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                @click="logout"
                class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
              >
                <i class="pi pi-sign-out mr-2"></i>
                <span>Logout</span>
              </a>
            </li>
          </div>
          <li v-else>
            <a
              v-ripple
              href="/auth/signin"
              class="flex px-6 p-3 lg:px-3 lg:py-2 align-items-center text-600 hover:text-900 hover:surface-100 font-medium border-round cursor-pointer transition-colors transition-duration-150 p-ripple"
            >
              <i class="pi pi-signin mr-2"></i>
              <span>Login</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </BlockViewer>
</template>
