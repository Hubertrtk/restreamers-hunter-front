<template>
  <div class="user-roots-container">
    Użytkownicy powiązani z
    <p>{{ props.params }}</p>
    <MoreInfo v-if="selectedMoreInfo" :info="users[selectedMoreInfo]" />
    <Loading v-if="isLoading" />
    <div>
      <ul>
        <li v-for="(data, userEmail) in users" :key="userEmail">
          <button @click="() => handleButton(userEmail)">I</button>
          <Email>{{ userEmail }}</Email>
          {{ data.realatedAccounts[props.params] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MoreInfo from "./MoreInfo.vue";
import { useFetchHook } from "@/utils/useFetchHook";
import { findUsersRoots } from "@/api/serviceApi";
import Email from "../elements/Email.vue";
import Loading from "../loading/Loading.vue";

const selectedMoreInfo = ref();

const handleButton = (email) => {
  selectedMoreInfo.value = email;
};

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  params: {
    required: true,
  },
});
const { data: users, error, isLoading, getData } = useFetchHook(findUsersRoots);

onMounted(async () => {
  await getData(props.params);
});

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const d = new Date(timestamp);
  return d.toLocaleString("pl-PL");
};
</script>
