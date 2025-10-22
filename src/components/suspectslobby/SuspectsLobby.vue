<template>
  <div class="suspectLobbyContainer">
    <p>Suspect Lobby</p>
    <div class="">
      <select v-model="selected" @change="fetchData" class="">
        <option disabled value="">-- wybierz typ --</option>
        <!-- Dynamiczne mapowanie obiektu endpoints -->
        <option
          v-for="(endpoint, key) in endpoints"
          :key="key"
          :value="endpoint"
        >
          {{ key }}
        </option>
      </select>
    </div>
    <ul v-if="Object.keys(users).length">
      <li v-for="(value, email) in users" :key="email">
        <Email>{{ email }}</Email>
      </li>
    </ul>
    <p v-else>Brak danych</p>
  </div>
</template>

<script setup>
import { getSuspectsLobby } from "@/api/serviceApi";
import { ref } from "vue";
import Email from "../elements/Email.vue";

// wybrana opcja z selecta
const selected = ref("");
// dane z API
const users = ref({});

// przykładowe mapowanie typu -> endpoint
const endpoints = {
  HASH: "HashMonitor",
  IP: "IpMonitor",
  User: "UserMonitor",
};

const fetchData = async () => {
  if (!selected.value) return;
  try {
    const r = await getSuspectsLobby(selected.value);
    users.value = r.data;
  } catch (err) {
    console.error(err);
    users.value = {};
  }
};
</script>
<style scoped>
.suspectLobbyContainer {
  position: absolute;
  top: 50px;
  left: 0;
  width: 400px;
  bottom: 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 4px 0;
}
</style>
