<template>
  <p
    @contextmenu.prevent="openMenu($event)"
    ref="spanRef"
    class="cursor-pointer"
    :style="{ color: isSelected ? 'aqua' : 'inherit' }"
  >
    <slot />
  </p>

  <!-- Toolbar -->
  <div
    v-if="showMenu"
    class="tool-bar-container"
    :style="{ top: `${menuY}px`, left: `${menuX}px` }"
    @click.stop
  >
    <button @click="copyEmail" class="">Otwórz</button>
    <button @click="handleRunMonitor" class="">Run</button>
    <button @click="selectMesh" class="">Zaznacz</button>
    <button @click="getMesh" class="">get</button>
    <button v-if="showAddEmails()" @click="selectMesh" class="">
      Dodaj Wybrane Adresy Email
    </button>
  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  getCurrentInstance,
  computed,
  onBeforeUnmount,
} from "vue";
import { useGlobalStore } from "@/stores/global";
import { deleteWhiteSigns } from "@/utils/helpers";
import { runMonitor } from "@/api/serviceApi";
import { handleAction } from "@/utils/handleAction";
import { ACTIONS } from "@/utils/constants";

const globalStore = useGlobalStore();
const showMenu = ref(false);
const menuX = ref(0);
const menuY = ref(0);
const spanRef = ref(null);

const isSelected = computed(() => {
  return globalStore.getMeshId == emailText.value;
});

const instance = getCurrentInstance();
const emailText = computed(() =>
  instance.slots.default?.()[0]?.children?.trim()
);

const handleRunMonitor = () => {
  const meshId = emailText.value;
  runMonitor(meshId).then((response) => {
    console.log("Monitor started:", response.data);
  });
};

const getMesh = () => {
  const meshId = emailText.value;
  handleAction(ACTIONS.get_mesh, meshId);
};

const showAddEmails = () => {
  if (globalStore.getSearchInput.length == 0) {
    return false;
  }
  if (!globalStore.getSearchInput.includes("@")) {
    return false;
  }
  let emails = deleteWhiteSigns(globalStore.getSearchInput);
  if (
    emails.every((e) => {
      return e.includes("@");
    })
  )
    return true;
};

// 📍 Funkcja otwierająca menu kontekstowe
const openMenu = (event) => {
  showMenu.value = true;
  menuX.value = event.pageX;
  menuY.value = event.pageY;

  document.addEventListener("click", closeMenu);
};

// 📍 Zamknięcie menu po kliknięciu poza nim
const closeMenu = () => {
  showMenu.value = false;
  document.removeEventListener("click", closeMenu);
};

// 📍 Akcje w menu
const copyEmail = () => {
  navigator.clipboard.writeText(emailText.value);
  closeMenu();
};

const sendEmail = () => {
  window.location.href = `mailto:${emailText.value}`;
  closeMenu();
};

const selectMesh = () => {
  globalStore.selectMeshId(emailText.value);
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
