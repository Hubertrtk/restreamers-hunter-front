<template>
  <div class="suspects-lobby-wrapper">
    <p>{{ props.type }}</p>
    <Loading v-if="isLoading && !data" />
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
import { onUnmounted, ref } from "vue";
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

const { data, error, isLoading, getData } = useFetchHook(getSuspectsLobby);

let intervalId = null;

onMounted(() => {
  getData(props.type)
    .then(() => {
      console.log(data.value);
    })
    .catch((err) => {
      console.error(err);
    });
  intervalId = setInterval(() => {
    getData(props.type)
      .then(() => {
        console.log(data.value);
      })
      .catch((err) => {
        console.error(err);
      });
  }, 5000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>
