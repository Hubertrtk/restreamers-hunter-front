<template>
  <ToolBar />
  <div class="container">
    <SuspectsLobby v-for="(value, key) in MONITORS" :key="key" :type="value" />
    <Meshes />
    <div
      v-for="modal in modals"
      :key="modal.id"
      class="modal-container"
      :style="{
        top: modalPositions[modal.id]?.top + 'px',
        left: modalPositions[modal.id]?.left + 'px',
      }"
    >
      <div class="row">
        <div @mousedown="startDrag($event, modal.id)">…</div>
        <button class="close-modal-button" @click="removeModal(modal.id)">
          ✕
        </button>
      </div>
      <component :is="modalComponents[modal.modalType]" :params="modal.data" />
    </div>
  </div>
</template>
<script setup>
import { computed, reactive } from "vue";
import SearchBar from "./components/searchBar/SearchBar.vue";
import UserRoots from "./components/userRoots/UserRoots.vue";
import SearchByEmail from "./components/searchByEmail/SearchByEmail.vue";
import SearchByNagra from "./components/searchByNagra/SearchByNagra.vue";
import { useGlobalStore } from "@/stores/global";
import Meshes from "./components/meshes/Meshes.vue";
import SuspectsLobby from "./components/suspectslobby/SuspectsLobby.vue";
import Mesh from "./components/mesh/Mesh.vue";
import { MONITORS } from "./utils/constants";
import { onMounted } from "vue";
import { onUnmounted } from "vue";
import { getLicenses } from "./api/serviceApi";
import { ref } from "vue";
import ToolBar from "./components/toolBar/ToolBar.vue";

const globalStore = useGlobalStore();

let intervalId = null;

onMounted(() => {
  intervalId = setInterval(() => {
    const unknowLicenseEmails = [];
    for (const [email, productIds] of Object.entries(
      globalStore.getLicenseEmails
    )) {
      if (!productIds) {
        unknowLicenseEmails.push(email);
      }
    }
    if (unknowLicenseEmails.length === 0) return;
    getLicenses(unknowLicenseEmails).then((response) => {
      globalStore.addLicenseEmails(response.data);
    });
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

const modals = computed(() => globalStore.allModals);

const modalComponents = {
  USER_INFO: SearchByEmail,
  SEARCH_BY_NAGRA: SearchByNagra,
  USER_ROOTS: UserRoots,
  MESH: Mesh,
};

const removeModal = (id) => {
  globalStore.removeModal(id);
};

// pozycje modalów
const modalPositions = reactive({});

const startDrag = (event, id) => {
  event.preventDefault();
  const startX = event.clientX;
  const startY = event.clientY;

  // zachowujemy początkową pozycję
  if (!modalPositions[id]) {
    modalPositions[id] = { top: 100, left: 100 }; // startowa pozycja
  }
  const initialTop = modalPositions[id].top;
  const initialLeft = modalPositions[id].left;

  const onMouseMove = (e) => {
    modalPositions[id].top = initialTop + (e.clientY - startY);
    modalPositions[id].left = initialLeft + (e.clientX - startX);
  };

  const onMouseUp = () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
};
</script>
