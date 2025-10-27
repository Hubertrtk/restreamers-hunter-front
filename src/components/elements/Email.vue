<template>
  <span
    @contextmenu.prevent="openMenu($event)"
    ref="spanRef"
    class="cursor-pointer"
    :style="{ color: isSelected ? 'aqua' : 'inherit' }"
  >
    <slot />
  </span>

  <!-- Toolbar -->
  <div
    v-if="showMenu"
    class="tool-bar-container"
    :style="{ top: `${menuY}px`, left: `${menuX}px` }"
    @click.stop
  >
    <button @click="copyEmail" class="">Zaznacz</button>
    <button @click="addToMesh" class="">Dodaj do mesh</button>
    <button @click="searchByEmail" class="">Info</button>
    <button @click="getRelatedUsers" class="">Roots</button>
  </div>
</template>

<script setup>
import { ACTIONS } from "@/utils/constants";
import { handleAction } from "@/utils/handleAction";
import {
  ref,
  onMounted,
  getCurrentInstance,
  computed,
  onBeforeUnmount,
} from "vue";
import { useGlobalStore } from "@/stores/global";

const globalStore = useGlobalStore();

const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const spanRef = ref(null);

const instance = getCurrentInstance();
const emailText = computed(() =>
  instance.slots.default?.()[0]?.children?.trim()
);

// 📍 Funkcja otwierająca menu kontekstowe
const openMenu = (event) => {
  showMenu.value = true;
  menuX.value = event.pageX;
  menuY.value = event.pageY;

  document.addEventListener("click", closeMenu);
};

const isSelected = computed(() => {
  return globalStore.getSearchInput.includes(emailText.value);
});

// 📍 Zamknięcie menu po kliknięciu poza nim
const closeMenu = () => {
  showMenu.value = false;
  document.removeEventListener("click", closeMenu);
};

// 📍 Akcje w menu
const copyEmail = () => {
  globalStore.addValueToSearchInput(`${emailText.value}\n`);
  closeMenu();
};

const sendEmail = () => {
  window.location.href = `mailto:${emailText.value}`;
  closeMenu();
};
const addToMesh = () => {
  console.log("globalStore.getMeshId");
  console.log(globalStore.getMeshId);
  closeMenu();
};

const searchByEmail = () => {
  handleAction(ACTIONS.search_by_email, emailText.value);
  closeMenu();
};

const getRelatedUsers = () => {
  handleAction(ACTIONS.get_related_users_by_email, emailText.value);
  closeMenu();
};

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
});
</script>

<style scoped>
.tool-bar-container {
  position: fixed;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background: white;
  button {
    margin: 2px 0;
    border: none;
  }
}
</style>
