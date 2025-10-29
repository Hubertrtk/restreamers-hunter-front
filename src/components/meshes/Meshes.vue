<template>
  <div class="meshes-list-container">
    <p>Meshes</p>
    <div class="">
      <select v-model="selected" @change="fetchData" class="">
        <option disabled value="">-- wybierz typ --</option>
        <!-- Dynamiczne mapowanie obiektu endpoints -->
        <option
          v-for="(endpoint, key) in MONITORS"
          :key="key"
          :value="endpoint"
        >
          {{ key }}
        </option>
      </select>
    </div>
    <ul v-if="meshes">
      <li v-for="(value, email) in meshes" :key="email">
        <MeshId> {{ email }}</MeshId>
        <p>- {{ value }}</p>
      </li>
    </ul>
    <p v-else>Brak danych</p>
  </div>
</template>

<script setup>
import { getMeshes, getSuspectsLobby } from "@/api/serviceApi";
import { MONITORS } from "@/utils/constants";
import { useFetchHook } from "@/utils/useFetchHook";
import { ref } from "vue";
import MeshId from "../elements/MeshId.vue";

const selected = ref("");

const { data: meshes, error, isLoading, getData } = useFetchHook(getMeshes);

const fetchData = async () => {
  if (!selected.value) return;
  getData(selected.value);
  try {
    getData;
  } catch (err) {
    console.error(err);
  }
};
</script>
<style scoped>
.meshes-container {
  position: absolute;
  top: 50px;
  right: 0;
  width: 400px;
  bottom: 0;
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    padding: 4px 0;
    display: flex;
  }
}
</style>
