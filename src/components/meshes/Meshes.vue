<template>
  <div class="meshes-container">
    <p>Meshes</p>
    <div class="">
      <select v-model="selected" @change="fetchData" class="">
        <option disabled value="">-- wybierz typ --</option>
        <!-- Dynamiczne mapowanie obiektu endpoints -->
        <option
          v-for="(endpoint, key) in MESHES_TYPES"
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
      </li>
    </ul>
    <p v-else>Brak danych</p>
  </div>
</template>

<script setup>
import { getMeshes, getSuspectsLobby } from "@/api/serviceApi";
import { MESHES_TYPES } from "@/utils/constants";
import { useFetchHook } from "@/utils/useFetchHook";
import { onMounted, ref } from "vue";
import MeshId from "../elements/MeshId.vue";

// wybrana opcja z selecta
const selected = ref("");

const { data: meshes, error, isLoading, getData } = useFetchHook(getMeshes);

onMounted(async () => {
  await getData("HashMonitor");
  console.log("meshes");
  console.log(meshes.value);
});

const fetchData = async () => {
  console.log("selected.value");
  console.log(selected.value);
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
  }
}
</style>
