<script setup lang="ts">
import { useQuery } from 'vue-query';

const page = ref(1);
const perPage = ref(4);

// Get All Posts
const {
  data: posts,
  isLoading,
  error,
} = useQuery(
  ['posts', page, perPage],
  () => getAllPosts(page.value, perPage.value),
  {
    onError: (error) => {
      showToastError(error);
      console.log(error);
    },
  }
);
</script>

<template>
  <BlockViewer
    header="Cards with Actions"
    containerClass="surface-ground px-4 py-8 md:px-6 lg:px-8"
  >
    <div class="py-6" style="padding-left: 20px; padding-right: 20px">
      <h3 class="text-center py-4">All Posts</h3>
      <div class="grid">
        <template v-for="post in posts" :key="post.id">
          <PostCard :post="post" />
        </template>
      </div>

      <div
        class="pagination-container flex gap-4 align-items-center justify-content-center py-4"
      >
        <Button @click="--page" :disabled="page <= 1">Prev</Button>

        <span>Page {{ page }}</span>

        <Button @click="++page"> Next </Button>
      </div>
    </div>
  </BlockViewer>
</template>
