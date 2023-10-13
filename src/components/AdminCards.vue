<script setup lang="ts">
import { getAllCategories } from '@/composables/categories';
import { getAllUsers } from '@/composables/users';
import { getAllPosts } from '@/composables/posts';
import { useQuery } from 'vue-query';
const page = ref(1);
const perPage = ref(2);

// Get All Categories
const {
  data: categories,
  isLoading,
  error,
} = useQuery(
  ['categories', page, perPage],
  () => getAllCategories(page.value, perPage.value),
  {
    onError: (error) => {
      showToastError(error);
      console.log(error);
    },
  }
);

const { data: users } = useQuery(['users'], () => getAllUsers(), {
  onError: (error) => {
    console.log(error);
  },
});

const { data: posts } = useQuery(['posts'], () => getAllPosts(), {
  onError: (error) => {
    console.log(error);
  },
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <BlockViewer header="With Icons" v-else>
    <div class="py-6 px-2" :style="{ width: '80%', margin: '0 auto' }">
      <div class="grid">
        <div class="col-12 lg:col-4 p-3">
          <div
            class="p-3 border-round shadow-2 flex align-items-center surface-card"
          >
            <div
              style="width: 48px; height: 48px; border-radius: 10px"
              class="bg-teal-100 inline-flex align-items-center justify-content-center mr-3"
            >
              <i class="pi pi-shield text-teal-600 text-3xl"></i>
            </div>
            <a href="/admin/posts">
              <div>
                <span class="text-900 text-xl font-medium mb-2">Posts</span>
                <p class="mt-1 mb-0 text-600 font-medium text-sm">
                  {{ posts.length }} Posts
                </p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-12 lg:col-4 p-3">
          <div
            class="p-3 border-round shadow-2 flex align-items-center surface-card"
          >
            <div
              style="width: 48px; height: 48px; border-radius: 10px"
              class="bg-pink-100 inline-flex align-items-center justify-content-center mr-3"
            >
              <i class="pi pi-wallet text-pink-600 text-3xl"></i>
            </div>
            <a href="/admin/categories">
              <div>
                <span class="text-900 text-xl font-medium mb-2"
                  >Categories</span
                >
                <p class="mt-1 mb-0 text-600 font-medium text-sm">
                  {{ categories.length }} Categories
                </p>
              </div>
            </a>
          </div>
        </div>
        <div class="col-12 lg:col-4 p-3">
          <div
            class="p-3 border-round shadow-2 flex align-items-center surface-card"
          >
            <div
              style="width: 48px; height: 48px; border-radius: 10px"
              class="bg-orange-100 inline-flex align-items-center justify-content-center mr-3"
            >
              <i class="pi pi-users text-orange-600 text-3xl"></i>
            </div>
            <a href="/admin/users">
              <div>
                <span class="text-900 text-xl font-medium mb-2">Users</span>
                <p class="mt-1 mb-0 text-600 font-medium text-sm">
                  {{ users.length }} Users
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </BlockViewer>
  }
</template>
