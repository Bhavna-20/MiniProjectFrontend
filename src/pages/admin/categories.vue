<script setup lang="ts">
import AdminCards from '@/components/AdminCards.vue';
import { getAllCategories } from '@/composables/categories';
import { useStore } from 'vuex';
import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { showToastSuccess, showToastError } from '../../composables/toast.ts';
import Toast from 'primevue/toast';

const store = useStore();
const addNewCategoryFlag = ref(false);
const editCategoryFlag = ref(false);
const addCategoryInput = ref('');
const editCategoryInput = ref('');
const editCategoryId = ref('');
const accessToken = computed(() => store.state.accessToken);
const page = ref(1);
const perPage = ref(2);

const query = useQueryClient();

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

// Add New Category
const addCategoryMutation = useMutation(
  (data: object, headers: object) => {
    return createCategory(data, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('categories');
      addNewCategoryFlag.value = false;
      addCategoryInput.value = '';
      showToastSuccess('Category Added Successfully');
    },
  }
);

const addCategory = () => {
  const headers = {
    Authorization: `Bearer ${accessToken.value}`,
    'Content-Type': 'application/json',
  };
  const categoryData = {
    name: addCategoryInput.value,
  };
  addCategoryMutation.mutate(categoryData, headers);
};

// Delete addCategoryInput with id
const deleteCategoryMutation = useMutation(
  (id, headers: object) => {
    return deleteCategory(id, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('categories');
      addCategoryInput.value = '';
      showToastSuccess('Category Deleted Successfully');
    },
  }
);

const deleteCategoryWithId = (id) => {
  const headers = {
    Authorization: `Bearer ${accessToken.value}`,
    'Content-Type': 'application/json',
  };
  deleteCategoryMutation.mutate(id, headers);
};

// Edit Category with Id

const editCategoryClicked = (id, name) => {
  editCategoryInput.value = name;
  editCategoryId.value = id;
  editCategoryFlag.value = true;
};

const editCategoryMutation = useMutation(
  ({ id, data, headers }) => {
    return editCategory(id, data, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('categories');
      editCategoryFlag.value = false;
      addCategoryInput.value = '';
      showToastSuccess('Category Updated Successfully');
    },
  }
);

const editCategoryWithId = (id) => {
  const categoryData = {
    id: id,
    data: {
      name: editCategoryInput.value,
    },
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
    },
  };
  editCategoryMutation.mutate(categoryData);
};
</script>

<template>
  <AdminCards />
  <div class="py-4">
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
            Categories Information
          </div>

          <Button
            icon="pi pi-arrow-right"
            iconPos="right"
            label="Create New Category"
            @click="addNewCategoryFlag = true"
            class="p-button-rounded p-button-primary"
          ></Button>
        </div>
        <ul class="list-none p-0 m-0">
          <template v-for="category in categories" :key="category.id">
            <li
              class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap justify-content-between"
            >
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {{ category.name }}
              </div>
              <div class="w-6 md:w-2 flex justify-content-end">
                <Button
                  label="Edit"
                  @click="editCategoryClicked(category.id, category.name)"
                  icon="pi pi-pencil"
                  class="p-button-text"
                ></Button>
                <Button
                  label="Delete"
                  @click="deleteCategoryWithId(category.id)"
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
    v-model:visible="addNewCategoryFlag"
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
          Create New Category
        </h1>
      </div>
    </template>
    <form class="flex flex-column gap-3 mt-3">
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >Category Name</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="addCategoryInput"
            name="addCategoryInput"
            type="text"
            class="w-full"
            id="addCategoryInput"
          />
        </span>
      </div>
    </form>
    <template #footer>
      <div>
        <Button
          label="Cancel"
          @click="addNewCategoryFlag = false"
          class="p-button-text"
        ></Button>
        <Button
          label="Submit"
          @click="addCategory"
          class="p-button-rounded"
        ></Button>
      </div>
    </template>
  </Dialog>

  <Dialog
    v-model:visible="editCategoryFlag"
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
          Edit Category
        </h1>
      </div>
    </template>
    <form class="flex flex-column gap-3 mt-3">
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >Category Name</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="editCategoryInput"
            name="editCategoryInput"
            type="text"
            class="w-full"
            id="editCategoryInput"
          />
        </span>
      </div>
    </form>
    <template #footer>
      <div>
        <Button
          label="Cancel"
          @click="editCategoryFlag = false"
          class="p-button-text"
        ></Button>
        <Button
          label="Submit"
          @click="editCategoryWithId(editCategoryId)"
          class="p-button-rounded"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>
