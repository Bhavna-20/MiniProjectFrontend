<script setup lang="ts">
import AdminCards from '@/components/AdminCards.vue';
import { getAllPosts } from '@/composables/posts';
import { useStore } from 'vuex';
import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { showToastSuccess, showToastError } from '../../composables/toast';
import Toast from 'primevue/toast';

const store = useStore();
const addNewPostFlag = ref(false);
const addPostTitle = ref('');
const addPostBody = ref('');
const addSelectedCategories = ref();
const editPostFlag = ref(false);
const editPostData = ref();
const accessToken = computed(() => store.state.accessToken);
const query = useQueryClient();
const page = ref(1);
const perPage = ref(2);

// Get All Categories
const { data: categories } = useQuery(
  ['categories'],
  () => getAllCategories(),
  {
    onError: (error) => {
      console.log(error);
    },
  }
);

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

// Create New Post
const addPostMutation = useMutation(
  ({ data, headers }) => {
    return createPost(data, headers);
  },
  {
    onError: (error) => {
      showToastError(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('posts');
      addNewPostFlag.value = false;
      addPostTitle.value = '';
      addPostBody.value = '';
      addSelectedCategories.value = '';
      showToastSuccess('Post Added Successfully');
    },
  }
);

const addPost = () => {
  const categoriesId = addSelectedCategories.value
    ? addSelectedCategories.value.map((category) => category.id)
    : [];
  const postData = {
    data: {
      title: addPostTitle.value,
      categories: categoriesId,
      body: addPostBody.value,
    },
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
    },
  };
  addPostMutation.mutate(postData);
};

// Delete Post with id
const deletePostMutation = useMutation(
  (id, headers: object) => {
    return deletePost(id, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('posts');
      addPostTitle.value = '';
      addPostBody.value = '';
      addSelectedCategories.value = '';
      showToastSuccess('Post Deleted Successfully');
    },
  }
);

const deletePostWithId = (id) => {
  const headers = {
    Authorization: `Bearer ${accessToken.value}`,
    'Content-Type': 'application/json',
  };
  deletePostMutation.mutate(id, headers);
};

// Edit POst

const editPostClicked = (post) => {
  editPostData.value = { ...post };
  editPostFlag.value = true;
};

const editPostMutation = useMutation(
  ({ id, data, headers }) => {
    console.log(id, data, headers);
    return editPost(id, data, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('posts');
      editPostFlag.value = false;
      addPostTitle.value = '';
      addPostBody.value = '';
      addSelectedCategories.value = '';
      showToastSuccess('Post Updated Successfully');
    },
  }
);

const editPostWithId = (id) => {
  const categoriesId = editPostData.value.categories
    ? editPostData.value.categories.map((category) => category.id)
    : [];
  const postData = {
    id: id,
    data: {
      title: editPostData.value.title,
      body: editPostData.value.body,
      categories: categoriesId,
    },
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
    },
  };
  editPostMutation.mutate(postData);
};
</script>

<template>
  <div class="py-4">
    <AdminCards />
    <BlockViewer
      header="Left Aligned with Action"
      containerClass="surface-section px-4 py-8 md:px-6 lg:px-8 mx-auto"
      :free="true"
    >
      <Toast />
      <div
        class="surface-section pl-4 pr-4 py-6"
        :style="{ width: '80%', margin: '0 auto' }"
      >
        <div class="flex justify-content-between align-item-center mb-6">
          <div class="font-medium text-3xl text-900 mb-3">
            Posts Information
          </div>

          <Button
            icon="pi pi-arrow-right"
            iconPos="right"
            @click="addNewPostFlag = true"
            label="Create New Post"
            class="p-button-rounded p-button-primary"
          ></Button>
        </div>
        <ul class="list-none p-0 m-0">
          <template v-for="post in posts" :key="post.id">
            <li
              class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap justify-content-between"
            >
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {{ post.title }}
              </div>
              <div class="flex justify-content-end align-items-center">
                <div class="text-500 align-item-center font-medium">
                  {{ post.author.name }}
                </div>
                <Button
                  label="Edit"
                  @click="editPostClicked(post)"
                  icon="pi pi-pencil"
                  class="p-button-text"
                ></Button>
                <Button
                  label="Delete"
                  @click="deletePostWithId(post.id)"
                  icon="pi pi-trash"
                  class="p-button-text"
                ></Button>
              </div>
            </li>
          </template>
        </ul>
        <div
          class="pagination-container flex gap-4 align-items-center justify-content-center py-4"
        >
          <Button @click="--page" :disabled="page <= 1">Prev</Button>

          <span>Page {{ page }}</span>

          <Button @click="++page"> Next </Button>
        </div>
      </div>
    </BlockViewer>
  </div>

  <Dialog
    v-model:visible="addNewPostFlag"
    appendTo="body"
    modal
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '52vw' }"
    header="Edit Payment Method"
    :draggable="false"
    :resizable="false"
  >
    <template #header>
      <div class="flex flex-column gap-2">
        <h1 class="m-0 text-900 font-semibold text-xl line-height-3">
          Create New Post
        </h1>
      </div>
    </template>
    <form class="flex flex-column gap-3 mt-3">
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >Post Title</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="addPostTitle"
            name="addPostTitle"
            type="text"
            class="w-full"
            id="addPostTitle"
          />
        </span>
      </div>
      <div>
        <label for="body" class="block mb-1 text-color text-base"
          >Categories</label
        >
        <MultiSelect
          v-model="addSelectedCategories"
          display="chip"
          :options="categories"
          optionLabel="name"
          class="w-full"
        />
      </div>
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >Post Description</label
        >
        <span class="p-input-icon-left w-full">
          <Textarea
            rows="12"
            v-model="addPostBody"
            name="addPostBody"
            type="text"
            class="w-full"
            id="addPostBody"
          />
        </span>
      </div>
    </form>
    <template #footer>
      <div>
        <Button
          label="Cancel"
          @click="addNewPostFlag = false"
          class="p-button-text"
        ></Button>
        <Button
          label="Submit"
          @click="addPost"
          class="p-button-rounded"
        ></Button>
      </div>
    </template>
  </Dialog>

  <Dialog
    v-model:visible="editPostFlag"
    appendTo="body"
    modal
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '52vw' }"
    header="Edit Payment Method"
    :draggable="false"
    :resizable="false"
  >
    <template #header>
      <div class="flex flex-column gap-2">
        <h1 class="m-0 text-900 font-semibold text-xl line-height-3">
          Edit Post
        </h1>
      </div>
    </template>
    <form class="flex flex-column gap-3 mt-3">
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >Post Title</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="editPostData.title"
            name="editPostTitle"
            type="text"
            class="w-full"
            id="editPostTitle"
          />
        </span>
      </div>
      <div>
        <label for="body" class="block mb-1 text-color text-base"
          >Categories</label
        >
        <MultiSelect
          v-model="editPostData.categories"
          display="chip"
          :options="categories"
          optionLabel="name"
          class="w-full"
        />
      </div>
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >Post Description</label
        >
        <span class="p-input-icon-left w-full">
          <Textarea
            rows="12"
            v-model="editPostData.body"
            name="editPostBody"
            type="text"
            class="w-full"
            id="editPostBody"
          />
        </span>
      </div>
    </form>
    <template #footer>
      <div>
        <Button
          label="Cancel"
          @click="addNewPostFlag = false"
          class="p-button-text"
        ></Button>
        <Button
          label="Submit"
          @click="editPostWithId(editPostData.id)"
          class="p-button-rounded"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>
