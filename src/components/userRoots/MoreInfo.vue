<template>
  <div>
    <p>email: {{ info.email }}</p>
    <p>id: {{ info.id }}</p>
    <p>firstname: {{ info.firstname }}</p>
    <p>lastname: {{ info.lastname }}</p>
    <p>country: {{ info.country }}</p>
    <p>banNotes: {{ info.banNotes }}</p>
    <div v-if="Array.isArray(info.transactions)">
      <h3>Transakcje</h3>
      <div v-for="(t, i) in info.transactions" :key="i" class="card">
        <p><strong>product:</strong> {{ t.product }}</p>
        <p><strong>channel:</strong> {{ t.channel }}</p>
      </div>
    </div>
    <div v-if="Array.isArray(info.licenses)">
      <h3>Licencje</h3>
      <div v-for="(t, i) in info.licenses" :key="i" class="card">
        <p>{{ t }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped></style>
