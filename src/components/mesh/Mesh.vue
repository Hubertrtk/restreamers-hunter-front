<template>
  <div class="user-roots-container">
    <p>Mesh:</p>
    <p>{{ props.params }}</p>
    <div>
      <button @click="handleButton">
        {{ displayEmails ? "emails" : "data" }}
      </button>
    </div>
    <div>
      <ul>
        <li v-for="(data, userEmail) in displayData" :key="userEmail">
          <p v-if="!displayEmails">
            {{ data }}
          </p>
          <Email v-if="displayEmails">
            {{ data }}
          </Email>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useFetchHook } from "@/utils/useFetchHook";
import { findUsersRoots, getMeshData } from "@/api/serviceApi";
import Email from "../elements/Email.vue";

const selectedMoreInfo = ref();
const displayEmails = ref(true);

const handleButton = () => {
  displayEmails.value = !displayEmails.value;
};

const displayData = computed(() => {
  if (!users.value) return;
  let dataToDisplay = [];
  if (displayEmails.value) {
    for (const [key, value] of Object.entries(users.value)) {
      value.forEach((element) => {
        if (!dataToDisplay.includes(element)) {
          dataToDisplay.push(element);
        }
      });
    }
  } else {
    dataToDisplay = Object.keys(users.value);
  }
  return dataToDisplay;
});

const props = defineProps({
  modalId: {
    type: String,
    required: true,
  },
  params: {
    required: true,
  },
});
const { data: users, error, isLoading, getData } = useFetchHook(getMeshData);

onMounted(async () => {
  await getData(props.params);
  console.log("users");
  console.log(users.value);
});
</script>
<style scoped>
.user-roots-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  max-height: 500px;
  overflow-y: scroll;
  width: 300px;
  ul {
    li {
      margin: 15px 0;
    }
    margin-bottom: 50px;
  }
}
</style>
