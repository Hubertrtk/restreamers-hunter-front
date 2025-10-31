<template>
  <div v-if="isToolBarVisible()" class="tool-bar-background">
    <div class="tool-bar-wrapper">
      <nav>
        <button @click="handleSearchByWtmIdButton">SEARCH_BY_WTMID</button>
        <button @click="handleMarkAsFoundByNagraButton">
          MARK_AS_FOUND_BY_NAGRA
        </button>
      </nav>
      <textarea ref="searchInput"></textarea>
      <label class="productId-label">
        <input
          placeholder="product id"
          type="number"
          v-model="productIdInput"
        />
        <button @click="setProductId">ok</button>
      </label>
      <ul class="selected-emails">
        <li v-for="(value, key) in globalStore.getSelectedEmails" :key="key">
          <button @click="handleAction(ACTIONS.REMOVE_SELECTED_EMAIL, key)">
            x
          </button>
          {{ key }}
        </li>
      </ul>
      <button
        class="selectedDataButton"
        @click="handleSelectedDataButton"
        ref="selectedDataButton"
      >
        {{ selectedData ? "Zaznaczone" : "Input" }}
      </button>
      <button
        class="addToSelectedEmailsButton"
        @click="handleAddToSelectedEmailsButton"
        ref="addToSelectedEmailsButton"
      >
        DODAJ DO ZAZNACZONYCH
      </button>
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
const selectedData = ref(true);
const selectedDataButton = ref(null);
const addToSelectedEmailsButton = ref(null);

watch(
  () => globalStore.getShowToolBar,
  async (newValue) => {
    if (newValue) {
      await nextTick();
      searchInput.value?.focus();
    }
  }
);

const handleSelectedDataButton = () => {
  selectedData.value = !selectedData.value;
};

const setProductId = () => {
  globalStore.setProductId(productIdInput.value);
};

const changleVisiblityToolBar = () => {
  return globalStore.setShowToolBar(!isToolBarVisible());
};

const isToolBarVisible = () => {
  return globalStore.getShowToolBar;
};

const handleMarkAsFoundByNagraButton = () => {
  handleAction(ACTIONS.MARK_AS_FOUND_BY_NAGRA, globalStore.getSelectedEmails);
};

const handleSearchByWtmIdButton = () => {
  const wtmId = searchInput.value;
  let wtmIds = deleteWhiteSigns(wtmId.value);
  wtmIds = wtmIds.map((id) => Number(id));
  wtmIds = wtmIds.filter((id) => !isNaN(id) && id > 0);
  handleAction(ACTIONS.SEARCH_BY_WTMID, wtmIds);
};

const handleAddToSelectedEmailsButton = () => {
  let emails = [];
  emails = deleteWhiteSigns(searchInput.value.value);
  emails = emails.filter((email) => email.includes("@"));
  const emailsObj = {};
  emails.forEach((email) => {
    emailsObj[email] = true;
  });
  globalStore.addSelectedEmails(emailsObj);
  searchInput.value.value = "";
};

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    changleVisiblityToolBar();
  }
});
</script>
