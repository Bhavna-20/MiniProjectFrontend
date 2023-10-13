<script setup lang="ts">
import { getSinglePost } from '@/composables/posts';
import { ref, watchEffect } from 'vue';
import { useQuery } from 'vue-query';
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = route.params.id;

const {
  data: post,
  isLoading,
  error,
} = useQuery(['post', postId], () => getSinglePost(postId), {
  onError: (error) => {
    console.log(error);
  },
});

const postCreatedAt = ref('');
const localTime = ref('');

watchEffect(() => {
  if (post.value) {
    const date = new Date(post.value.createdAt);
    postCreatedAt.value = date.toLocaleString();
    localTime.value = postCreatedAt.value;
  }
});
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div class="mx-auto py-8" style="max-width: 600px" v-else>
    <!-- <p>{{ post }}</p> -->
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <hr />
    <div class="flex justify-content-between">
      <p class="text-left">{{ localTime }}</p>
      <p class="text-right">
        Author :- <span class="font-bold">{{ post.author.name }}</span>
      </p>
    </div>
  </div>
</template>
