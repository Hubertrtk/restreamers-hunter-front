<template>
  <div class="search-by-email-container">
    <UserInfo v-if="data" :user="data" />
    <Loading v-if="isLoading" />
  </div>
</template>
<script setup>
import { getUserByEmail } from "@/api/serviceApi";
import { useFetchHook } from "@/utils/useFetchHook";
import { onMounted } from "vue";
import UserInfo from "../userInfo/UserInfo.vue";
import Loading from "../loading/Loading.vue";

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  params: {
    required: true,
  },
});

const { data, error, isLoading, getData } = useFetchHook(getUserByEmail);

onMounted(async () => {
  await getData(props.params);
});
</script>
<style scoped></style>
