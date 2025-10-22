<template>
  <div class="user-roots-container">
    Użytkownicy powiązani z
    <p>{{ props.params }}</p>
    <MoreInfo v-if="selectedMoreInfo" :info="users[selectedMoreInfo]" />
    <div>
      <ul>
        <li v-for="(data, userEmail) in users" :key="userEmail">
          <button @click="() => handleButton(userEmail)">I</button>
          {{ userEmail }} {{ data.realatedAccounts[props.params] }}
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
<style scoped>
.user-roots-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-height: 500px;
  overflow-y: scroll;
  ul {
    li {
      margin: 15px 0;
    }
  }
}
</style>
