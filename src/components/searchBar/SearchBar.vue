<template>
  <nav>
    <input v-model="inputValue" type="text" placeholder="Wpisz coś..." />
    <button
      @click="handleAction(key)"
      v-for="(key, value) in ACTIONS"
      :key="key"
      :value="endpoint"
    >
      {{ key }}
    </button>
  </nav>
</template>
<script setup>
import { ACTIONS, MODALS } from "@/utils/constants";
import { useGlobalStore } from "@/stores/global";
import { ref } from "vue";

const globalStore = useGlobalStore();

const inputValue = ref("");

const handleAction = (action) => {
  let modal;
  switch (action) {
    case ACTIONS.search_by_email:
      modal = MODALS.USER_INFO;
      break;
    case ACTIONS.search_by_wtmId:
      modal = MODALS.SEARCH_BY_NAGRA;
      break;
    case ACTIONS.get_related_users_by_email:
      modal = MODALS.USER_ROORS;
      break;
    case ACTIONS.get_mesh:
      modal = MODALS.MESH;
      break;
    default:
      return;
  }
  globalStore.addModal(modal, inputValue.value);
  inputValue.value = "";
};
</script>
<style scoped>
nav {
  position: fixed;
  top: 0;
  height: 50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 2px solid black;
}
</style>
