<template>
  <div class="suspects-lobby-wrapper">
    <p>{{ props.type }}</p>
    <!-- <ul v-if="Object.keys(users).length">
      <li v-for="(value, email) in users" :key="email">
        <Email>{{ email }}</Email>
      </li>
    </ul>
    <p v-else>Brak danych</p> -->
  </div>
</template>

<script setup>
import { getSuspectsLobby } from "@/api/serviceApi";
import { ref } from "vue";
import Email from "../elements/Email.vue";
import { handleAction } from "@/utils/handleAction";
import { ACTIONS } from "@/utils/constants";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
});

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
    const emails = Object.keys(r.data);
    console.log("emails");
    console.log(emails);
    handleAction(ACTIONS.getLicenses, emails);
  } catch (err) {
    console.error(err);
    users.value = {};
  }
};
</script>
