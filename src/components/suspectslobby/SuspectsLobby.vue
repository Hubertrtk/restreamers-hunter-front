<template>
  <div class="suspects-lobby-wrapper">
    <p>{{ props.type }}</p>
    <Loading v-if="isLoading" />
    <ul v-if="Object.keys(data || {}).length">
      <li v-for="(value, email) in data" :key="email">
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
import { handleAction } from "@/utils/handleAction";
import { ACTIONS } from "@/utils/constants";
import { useFetchHook } from "@/utils/useFetchHook";
import Loading from "../loading/Loading.vue";
import { onMounted } from "vue";

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

const { data, error, isLoading, getData } = useFetchHook(getSuspectsLobby);

onMounted(() => {
  getData(props.type)
    .then(() => {
      // users.value = data.value;
      // const emails = Object.keys(data.value);
      // console.log("emails");
      // console.log(emails);
      // handleAction(ACTIONS.getLicenses, emails);
      console.log(data.value);
    })
    .catch((err) => {
      console.error(err);
    });
});

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
