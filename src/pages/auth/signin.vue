<script setup lang="ts">
import router from '@/router';
import { useMutation } from 'vue-query';
import { useStore } from 'vuex';
import { signinUser } from '../../composables/auth';

const store = useStore();
const email = ref('');
const password = ref('');

const loginMutation = useMutation(
  (data: object, name) => {
    return signinUser(data);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      if (data) {
        const { access_token: accessToken, userId } = data.data;
        store.dispatch('login', { token: accessToken, userId });
        router.push('/user/posts');
      }
    },
  }
);

const loginUser = () => {
  const loginData = {
    email: email.value,
    password: password.value,
  };
  loginMutation.mutate(loginData, name);
};
</script>

<template>
  <BlockViewer
    header="Simple in Card"
    :free="true"
    containerClass="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center"
  >
    <div
      class="surface-card p-4 shadow-2 border-round w-full lg:w-6 mx-auto mt-8"
    >
      <div class="text-center mb-5">
        <!-- <img src="./../../assets/images/Logo.jpg" alt="Image" height="50" class="mb-3"> -->
        <div class="text-900 text-3xl font-medium mb-3">SignIn</div>
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <InputText
          id="email1"
          v-model="email"
          type="text"
          placeholder="Email address"
          class="w-full mb-3"
        />

        <label for="password1" class="block text-900 font-medium mb-2"
          >Password</label
        >
        <InputText
          v-model="password"
          id="password1"
          type="password"
          placehoder="Password"
          class="w-full mb-4"
        />
        <Button
          label="Sign In"
          icon="pi pi-user"
          @click="loginUser"
          class="w-full mb-5"
        ></Button>
        <div class="flex align-items-center justify-content-end">
          <div class="flex align-items-center">
            <span class="text-600 font-medium line-height-3"
              >Don't have an account?</span
            >
            <a
              href="/auth/signup"
              class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
              >Let's Create!</a
            >
          </div>
        </div>
      </div>
    </div>
  </BlockViewer>
</template>

<route lang="yaml">
meta:
  layout: auth
  ignoreAuth: true
</route>
