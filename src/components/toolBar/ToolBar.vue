<template>
  <div v-if="isToolBarVisible()" class="tool-bar-background">
    <div class="tool-bar-wrapper">
      <nav>
        <button @click="handleSearchByWtmIdButton">SEARCH_BY_WTMID</button>
      </nav>
      <textarea ref="searchInput"></textarea>
      <label class="productId-label">
        <input type="number" v-model="productIdInput" />
        <button @click="setProductId">ok</button>
      </label>
      <ul class="selected-emails">
        <li v-for="(value, key) in globalStore.getSelectedEmails" :key="key">
          {{ key }} {{ value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from "@/stores/global";
import { ACTIONS } from "@/utils/constants";
import { handleAction } from "@/utils/handleAction";
import { deleteWhiteSigns } from "@/utils/helpers";
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
//=================

const handleSearchByWtmIdButton = () => {
  const wtmId = searchInput.value;
  let wtmIds = deleteWhiteSigns(wtmId.value);
  wtmIds = wtmIds.map((id) => Number(id));
  wtmIds = wtmIds.filter((id) => !isNaN(id) && id > 0);
  handleAction(ACTIONS.SEARCH_BY_WTMID, wtmIds);
};

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    changleVisiblityToolBar();
  }
});
</script>
