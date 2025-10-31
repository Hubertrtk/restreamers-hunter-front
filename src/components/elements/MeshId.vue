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
      <button @click="runMesh">Run</button>
      <button @click="openInfoModal">Info</button>
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
import { markAsFoundByNagra, runMonitor } from "@/api/serviceApi";

const globalStore = useGlobalStore();

onBeforeMount(() => {
  globalStore.licenseCheck(meshId.value);
});

const showMenu = ref(false);
const spanRef = ref(null);

const instance = getCurrentInstance();
const meshId = computed(() => instance.slots.default?.()[0]?.children?.trim());
const hasLicense = computed(() => {
  if (!globalStore.getProductId) return false;
  if (
    globalStore.getLicenseEmails[meshId.value] &&
    globalStore.getLicenseEmails[meshId.value].includes(
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

// 📍 Akcje w menu
const openInfoModal = () => {
  handleAction(ACTIONS.OPEN_MESH_INFO_MODAL, meshId.value);
  closeMenu();
};
const runMesh = () => {
  runMonitor(meshId.value);
  closeMenu();
};

onBeforeUnmount(() => {
  document.removeEventListener("click", closeMenu);
});
</script>
