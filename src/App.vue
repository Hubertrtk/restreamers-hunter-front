<template>
  <div class="container">
    <SearchBar />
    <Meshes />
    <SuspectsLobby />
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
        <button @click="removeModal(modal.id)">x</button>
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

const globalStore = useGlobalStore();
const modals = computed(() => globalStore.allModals);

const modalComponents = {
  USER_INFO: SearchByEmail,
  SEARCH_BY_NAGRA: SearchByNagra,
  USER_ROORS: UserRoots,
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

<style scoped>
.container {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 50px;
  position: relative;
}
.modal-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  cursor: default;
  border: 2px solid black;
  border-radius: 10px;
  padding: 4px 0;
}
.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.row > div {
  cursor: grab;
  user-select: none;
}
</style>
