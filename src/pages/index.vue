<script setup lang="ts">
import { useQuery } from 'vue-query';
// const fetchPosts = async () => {
//   const data = await getAllPosts();
//   return data;
// };
// fetchPosts()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const {
  data: posts,
  isLoading,
  error,
} = useQuery(['posts'], () => getAllPosts(), {
  onError: (error) => {
    console.log(error);
  },
});

// const posts = ref([]);
// const fetchPosts = async () => {
//   const response = await axios.get('http://127.0.0.1:5000/posts');
//   posts.value = response.data;
//   console.log(posts.value);
//   return response;
// };
// onMounted(() => {
//   fetchPosts();
// });
</script>

<template>
  <BlockViewer header="Dark Image Background">
    <div
      class="relative p-8 overflow-hidden bg-no-repeat bg-cover"
      style="background-color: rgb(2, 2, 54)"
    >
      <div class="text-center my-6 relative">
        <div class="text-6xl font-bold mb-1 text-white">
          Let's Master Your Coding Skills
        </div>
        <div class="text-6xl text-blue-400 font-bold mb-4">
          Best Programming Blogs
        </div>
        <p
          class="mt-0 mb-3 line-height-3 text-center mx-auto text-blue-100"
          style="max-width: 500px"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div class="flex align-items-center justify-content-center flex-wrap">
          <InputText
            type="text"
            class="bg-transparent border-white p-3 mr-3 mt-3"
            style="border-radius: 40px"
            placeholder="Search..."
          />
          <Button
            label="Search"
            class="p-3 mt-3"
            style="border-radius: 40px"
          ></Button>
        </div>
      </div>
    </div>
  </BlockViewer>

  <BlockViewer
    header="Cards with Actions"
    containerClass="surface-ground px-4 py-8 md:px-6 lg:px-8"
  >
    <div class="py-6" style="padding-left: 20px; padding-right: 20px">
      <h3 class="text-center py-4">Latest Posts</h3>
      <div class="grid" v-if="!isLoading">
        <template v-for="post in posts.slice(0, 4)" :key="post.id">
          <PostCard :post="post" />
        </template>
      </div>
      <div v-else>Loading...</div>
      <div class="text-right py-4">
        <a :href="`/posts`">
          <Button
            icon="pi pi-arrow-right"
            iconPos="right"
            label="See All"
            class="p-button-rounded p-button-primary"
          ></Button>
        </a>
      </div>
    </div>
  </BlockViewer>
</template>
