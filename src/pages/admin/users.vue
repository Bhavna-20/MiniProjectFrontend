<script setup lang="ts">
import AdminCards from '@/components/AdminCards.vue';
import { getAllUsers } from '@/composables/users';
import { useMutation, useQuery, useQueryClient } from 'vue-query';
import { showToastSuccess, showToastError } from '../../composables/toast';
import Toast from 'primevue/toast';
import { useStore } from 'vuex';

const store = useStore();
const query = useQueryClient();
const addUserName = ref('');
const addUserEmail = ref('');
const addUserPassword = ref('');
const accessToken = computed(() => store.state.accessToken);
const addNewUserFlag = ref(false);
const editUserFlag = ref(false);
const editUserData = ref();

const {
  data: users,
  isLoading,
  error,
} = useQuery(['users'], () => getAllUsers(), {
  onError: (error) => {
    console.log(error);
  },
});

// Create New User
const addUserMutation = useMutation(
  ({ data, headers }) => {
    return createUser(data, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('users');
      addNewUserFlag.value = false;
      showToastSuccess('User Added Successfully');
    },
  }
);

const addUser = () => {
  const userData = {
    data: {
      name: addUserName.value,
      email: addUserEmail.value,
      password: addUserPassword.value,
    },
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
    },
  };
  addUserMutation.mutate(userData);
};

// Delete User with id
const deleteUserMutation = useMutation(
  ({ id, headers }) => {
    console.log(headers);
    return deleteUser(id, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('users');
      addUserName.value = '';
      addUserEmail.value = '';
      addUserPassword.value = '';
      showToastSuccess('User Deleted Successfully');
    },
  }
);

const deleteUserWithId = (id) => {
  const userData = {
    id: id,
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
    },
  };
  deleteUserMutation.mutate(userData);
};

// Edit User

const editUserClicked = (post) => {
  editUserData.value = { ...post };
  editUserFlag.value = true;
};

const editUserMutation = useMutation(
  ({ id, data, headers }) => {
    console.log(id, data, headers);
    return editUser(id, data, headers);
  },
  {
    onError: (error) => {
      console.error(error);
    },
    onSettled: (data) => {
      query.invalidateQueries('users');
      editUserFlag.value = false;
      showToastSuccess('User Updated Successfully');
    },
  }
);

const editUserWithId = (id) => {
  const userData = {
    id: id,
    data: {
      name: editUserData.value.name,
      email: editUserData.value.email,
      password: editUserData.value.password,
    },
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
      'Content-Type': 'application/json',
    },
  };
  editUserMutation.mutate(userData);
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
            Users Information
          </div>

          <Button
            icon="pi pi-arrow-right"
            @click="addNewUserFlag = true"
            iconPos="right"
            label="Create New User"
            class="p-button-rounded p-button-primary"
          ></Button>
        </div>
        <ul class="list-none p-0 m-0">
          <template v-for="user in users" :key="user.id">
            <li
              class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap justify-content-between"
            >
              <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
                {{ user.name }}
              </div>
              <div class="w-6 md:w-2 flex justify-content-end">
                <Button
                  label="Edit"
                  @click="editUserClicked(user)"
                  icon="pi pi-pencil"
                  class="p-button-text"
                ></Button>
                <Button
                  label="Delete"
                  @click="deleteUserWithId(user.id)"
                  icon="pi pi-trash"
                  class="p-button-text"
                ></Button>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </BlockViewer>
  </div>

  <Dialog
    v-model:visible="addNewUserFlag"
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
          Create New User
        </h1>
      </div>
    </template>
    <form class="flex flex-column gap-3 mt-3">
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >User Name</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="addUserName"
            name="addUserName"
            type="text"
            class="w-full"
            id="addUserName"
          />
        </span>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >User Email</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="addUserEmail"
            name="addUserEmail"
            type="text"
            class="w-full"
            id="addUserEmail"
          />
        </span>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >User Password</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="addUserPassword"
            name="addUserPassword"
            type="text"
            class="w-full"
            id="addUserPassword"
          />
        </span>
      </div>
    </form>
    <template #footer>
      <div>
        <Button
          label="Cancel"
          @click="addNewUserFlag = false"
          class="p-button-text"
        ></Button>
        <Button
          label="Submit"
          @click="addUser"
          class="p-button-rounded"
        ></Button>
      </div>
    </template>
  </Dialog>

  <Dialog
    v-model:visible="editUserFlag"
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
          Update User
        </h1>
      </div>
    </template>
    <form class="flex flex-column gap-3 mt-3">
      <div>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >User Name</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="editUserData.name"
            name="editUserData"
            type="text"
            class="w-full"
            id="editUserData"
          />
        </span>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >User Email</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="editUserData.email"
            name="editUserData"
            type="text"
            class="w-full"
            id="editUserData"
          />
        </span>
        <label for="cardholder" class="block mb-1 text-color text-base"
          >User Password</label
        >
        <span class="p-input-icon-left w-full">
          <i class="pi pi-user"></i>
          <InputText
            v-model="editUserData.password"
            name="editUserData"
            type="text"
            class="w-full"
            id="editUserData"
          />
        </span>
      </div>
    </form>
    <template #footer>
      <div>
        <Button
          label="Cancel"
          @click="editUserFlag = false"
          class="p-button-text"
        ></Button>
        <Button
          label="Submit"
          @click="editUserWithId(editUserData.id)"
          class="p-button-rounded"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>
