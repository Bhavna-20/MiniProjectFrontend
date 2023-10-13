<script setup lang="ts">
import { defineProps } from 'vue';
const props = defineProps({
  post: Object,
});
</script>

<template>
  <div class="col-12 lg:col-3 p-3">
    <div
      class="shadow-2 border-round surface-card mb-3 h-full flex-column justify-content-between flex"
    >
      <div class="p-4">
        <div class="text-900 my-3 text-xl font-medium title-body">
          {{ post?.title }}
        </div>
        <p class="mt-0 mb-3 text-700 line-height-3 card-body">
          {{ post?.body }}
        </p>
        <div class="text-right font-bold">
          <p>{{ post?.author.name }}</p>
        </div>
        <div class="text-left">
          <a :href="`/post/${post?.id}`">
            <Button
              icon="pi pi-arrow-right"
              iconPos="right"
              label="Read More"
              class="p-button-rounded p-button-primary"
            ></Button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title-body {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-body {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
