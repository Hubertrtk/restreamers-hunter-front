<template>
  <div class="search-by-nagra-container">
    <Loading v-if="isLoading" />
    <div v-if="data" class="pages">
      <button
        @click="setSelectedWtm(value)"
        v-for="(key, value) in data"
        :key="key"
        :value="endpoint"
      >
        {{ value }}
      </button>
    </div>
    <div v-if="data">
      <ul>
        <li v-for="(item, index) in data[selectedWtm]" :key="index">
          <UserInfo :user="item" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import UserInfo from "../userInfo/UserInfo.vue";
import { useFetchHook } from "@/utils/useFetchHook";
import { getUsersByWtmIds } from "@/api/serviceApi";
import Loading from "../loading/Loading.vue";

const selectedWtm = ref(false);

const setSelectedWtm = (id) => {
  selectedWtm.value = id;
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

const { data, error, isLoading, getData } = useFetchHook(getUsersByWtmIds);

onMounted(async () => {
  await getData([Number(props.params)]);
});
</script>
<style scoped>
.search-by-nagra-container {
  height: 500px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow-y: scroll;
  ul {
    list-style: none;
    padding: 0;
  }
}
.pages {
  width: 100%;
  height: 50px;
  border-bottom: 2px solid black;
}
</style>
