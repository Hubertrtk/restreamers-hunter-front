<template>
  <span
    @contextmenu.prevent="openMenu($event)"
    ref="spanRef"
    class="cursor-pointer"
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
    <button @click="sendEmail" class="">Dodaj do mesh</button>
    <button @click="sendEmail" class="">Info</button>
    <button @click="sendEmail" class="">Roots</button>
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
