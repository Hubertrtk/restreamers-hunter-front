<template>
  <span
    @contextmenu.prevent="openMenu($event)"
    ref="spanRef"
    class="cursor-pointer tool-bar-target"
    :style="{
      backgroundColor: hasLicense ? 'yellow' : 'inherit',
    }"
  >
    <slot />
    <div v-if="showMenu" class="tool-bar-container" @click.stop>
      <button @click="openInfoModal">Info</button>
      <button @click="openUserRootsModal">Powiązania</button>
      <button @click="addMarkEmail">Zaznacz</button>
    </div>
  </span>
  <!-- Toolbar -->
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
  onBeforeMount,
} from "vue";
import { useGlobalStore } from "@/stores/global";
import { markAsFoundByNagra } from "@/api/serviceApi";

const globalStore = useGlobalStore();

onBeforeMount(() => {
  globalStore.licenseCheck(emailText.value);
});

const showMenu = ref(false);
const spanRef = ref(null);

const instance = getCurrentInstance();
const emailText = computed(() =>
  instance.slots.default?.()[0]?.children?.trim()
);
const hasLicense = computed(() => {
  if (!globalStore.getProductId) return false;
  if (
    globalStore.getLicenseEmails[emailText.value] &&
    globalStore.getLicenseEmails[emailText.value].includes(
      globalStore.getProductId
    )
  ) {
    return true;
  }
  return false;
});

// 📍 Funkcja otwierająca menu kontekstowe
const openMenu = (event) => {
  showMenu.value = true;
  document.addEventListener("click", closeMenu);
};

// 📍 Zamknięcie menu po kliknięciu poza nim
const closeMenu = () => {
  showMenu.value = false;
  document.removeEventListener("click", closeMenu);
};
const addMarkEmail = () => {
  showMenu.value = false;
  globalStore.addSelectedEmails({
    [emailText.value]: null,
  });
};

// 📍 Akcje w menu
const openInfoModal = () => {
  handleAction(ACTIONS.OPEN_USER_INFO_MODAL, emailText.value);
  closeMenu();
};
const openUserRootsModal = () => {
  handleAction(ACTIONS.OPEN_USER_ROOTS_MODAL, emailText.value);
  closeMenu();
};

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
});
</script>
