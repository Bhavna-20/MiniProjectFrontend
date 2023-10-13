<script setup lang="ts">
const transitionName = ref('fade');
const currentRoute = useRoute();
// const { isLarge } = useCommonBreakPoints();

watch(currentRoute, async (val, oldVal) => {
  const toDepth = val.path.split('/').length;
  const fromDepth = oldVal.path.split('/').length;
  transitionName.value = toDepth < fromDepth ? 'slide-left' : 'slide-right';
});
</script>

<template>
  <!-- <div id="layout-main-container" :class="containerClass">
    <div class="layout-content-wrapper">
      <div class="layout-main" @click="appMenuControls.handleDocumentClick">

        <div class="layout-content" :class="[
          appMenuControls.mailLayout.value ? 'pb-0' : '',
          layoutContentClass,
        ]">
          <router-view v-slot="{ Component, route }">
            <transition :name="transitionName" :appear="true" mode="out-in">
              <div :key="route.fullPath">
                <component :is="Component" :key="route" />
              </div>
            </transition>
          </router-view>
        </div>
      </div>
    </div>

    <div class="layout-mask modal-in" @click="appMenuControls.handleDocumentClick"></div>
  </div> -->

  <router-view v-slot="{ Component, route }">
    <transition :name="transitionName" :appear="true" mode="out-in">
      <div :key="route.fullPath">
        <component :is="Component" :key="route" />
      </div>
    </transition>
  </router-view>
</template>
