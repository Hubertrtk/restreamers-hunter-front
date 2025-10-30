<template>
  <div v-if="isToolBarVisible()" class="tool-bar-background">
    <nav></nav>
    <textarea ref="searchInput"></textarea>
    <label class="productId-label">
      <input type="number" v-model="productIdInput" />
      <button @click="setProductId">ok</button>
    </label>
  </div>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
import { nextTick, ref, watch } from "vue";

const globalStore = useGlobalStore();

const productIdInput = ref(null);

const searchInput = ref(null);

watch(
  () => globalStore.getShowToolBar,
  async (newValue) => {
    if (newValue) {
      await nextTick();
      searchInput.value?.focus();
    }
  }
);

const setProductId = () => {
  globalStore.setProductId(productIdInput.value);
};

const changleVisiblityToolBar = () => {
  return globalStore.setShowToolBar(!isToolBarVisible());
};

const isToolBarVisible = () => {
  return globalStore.getShowToolBar;
};

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    changleVisiblityToolBar();
  }
});
</script>
