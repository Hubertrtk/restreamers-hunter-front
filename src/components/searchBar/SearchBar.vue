<template>
  <nav>
    <!-- <input v-model="productId" type="number" placeholder="Wpisz productId" /> -->
    <textarea
      ref="textareaRef"
      class="textarea-search"
      v-model="inputValue"
      type="text"
      placeholder="Wpisz coś..."
      v-if="isTextAreVisible()"
    />
    <div
      @click="changeTextAreaIsVisible"
      v-if="isTextAreVisible()"
      class="textarea-search-background"
    />
    <button @click="changeTextAreaIsVisible">TYPE</button>
    <button
      @click="handleButton(key)"
      v-for="(key, value) in ACTIONS"
      :key="key"
      :value="endpoint"
      :disabled="validate(key)"
    >
      {{ key }}
    </button>
  </nav>
</template>
<script setup>
import { ACTIONS, MODALS } from "@/utils/constants";
import { useGlobalStore } from "@/stores/global";
import { computed, ref, watch, nextTick } from "vue";
import { handleAction } from "@/utils/handleAction";

const globalStore = useGlobalStore();
const textareaRef = ref(null);

const inputValue = computed({
  get: () => globalStore.getSearchInput,
  set: (val) => (globalStore.searchInput = val),
});
const productId = ref();

const changeTextAreaIsVisible = () => {
  return globalStore.changeShowSearchInput(!isTextAreVisible());
};

const handleButton = (action) => {
  handleAction(action, inputValue.value);
  inputValue.value = "";
};
const isTextAreVisible = () => {
  return globalStore.getShowSearchInput;
};

watch(
  () => globalStore.getShowSearchInput,
  async (newValue) => {
    if (newValue) {
      // Poczekaj aż textarea pojawi się w DOM
      await nextTick();
      // I ustaw focus
      textareaRef.value?.focus();
    }
  }
);

const validate = (action) => {
  const value = inputValue.value;
  switch (action) {
    case ACTIONS.get_related_users_by_email:
    case ACTIONS.search_by_email:
      if (!value.includes("@")) {
        return true;
      }
      return false;
    case ACTIONS.search_by_wtmId:
      const ids = [""];
      let index = 0;
      for (const sign of value) {
        if (!Number(sign) && ids[index].length != 0) {
          ids.push("");
          index++;
        } else {
          if (Number(sign)) {
            console.log(sign);
            ids[index] += sign;
          }
        }
      }
      if (ids[0].length > 5 && ids.every((el) => Number(el))) {
        return false;
      }
      return true;
    case ACTIONS.get_mesh:
      return false;
    default:
      return false;
  }
};
</script>
<style scoped>
nav {
  position: fixed;
  top: 0;
  height: 70px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 2px solid black;
  .textarea-search {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    resize: none;
    z-index: 9999;
    height: 600px;
    width: 500px;
  }
  button {
    height: 100%;
    width: 70px;
  }
  .textarea-search-background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: black;
    opacity: 0.5;
    z-index: 9998;
  }
}
</style>
