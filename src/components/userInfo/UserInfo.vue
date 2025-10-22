<template>
  <div class="user-card">
    <h2>Dane użytkownika</h2>

    <div class="user-info">
      <p><strong>Imię:</strong> {{ user.firstname }}</p>
      <p><strong>Nazwisko:</strong> {{ user.lastname }}</p>
      <p>
        <strong>Email:</strong> <Email>{{ user.email }}</Email>
      </p>
      <p><strong>Kraj:</strong> {{ user.country }}</p>
      <p><strong>Firma:</strong> {{ user.company ? "Tak" : "Nie" }}</p>
      <p><strong>Aktywowany:</strong> {{ user.activated ? "Tak" : "Nie" }}</p>
      <p><strong>Zbanowany:</strong> {{ user.banned ? "Tak" : "Nie" }}</p>
      <p><strong>Reseller:</strong> {{ user.reseller ? "Tak" : "Nie" }}</p>
      <p><strong>IP rejestracji:</strong> {{ user.registrationIp }}</p>
    </div>

    <!-- TRANSAKCJE -->
    <div v-if="Array.isArray(user.transactions)" class="section">
      <h3>Transakcje</h3>
      <div v-for="(t, i) in user.transactions" :key="i" class="card">
        <p><strong>Provider:</strong> {{ t.provider }}</p>
        <p><strong>Typ:</strong> {{ t.type }}</p>
        <p><strong>Status:</strong> {{ t.status }}</p>
        <p><strong>Kanał:</strong> {{ t.channel }}</p>
        <p><strong>Kwota:</strong> {{ t.amount }} {{ t.currency }}</p>
        <p><strong>Produkt:</strong> {{ t.product?.title }}</p>
        <p><strong>Metoda płatności:</strong> {{ t.data?.paymentMethod }}</p>
        <p><strong>Data wydarzenia:</strong> {{ t.data?.eventDate }}</p>
        <p><strong>IP zakupu:</strong> {{ t.buyIp }}</p>
      </div>
    </div>

    <!-- LICENCJE -->
    <div v-if="Array.isArray(user.licenses)" class="section">
      <h3>Licencje</h3>
      <div v-for="(lic, i) in user.licenses" :key="i" class="card">
        <p><strong>Produkt:</strong> {{ lic.product?.title }}</p>
        <p><strong>Wariant:</strong> {{ lic.product?.variantId }}</p>
        <p><strong>Od:</strong> {{ formatDate(lic.validFrom) }}</p>
        <p><strong>Do:</strong> {{ formatDate(lic.validTo) }}</p>
      </div>
    </div>

    <!-- ZGODY -->
    <div class="section">
      <h3>Zgody</h3>
      <p><strong>News:</strong> {{ user.approvals?.news ? "Tak" : "Nie" }}</p>
      <p>
        <strong>Marketing:</strong>
        {{ user.approvals?.marketing ? "Tak" : "Nie" }}
      </p>
      <p>
        <strong>Statut zaakceptowany:</strong>
        {{ user.customApprovals?.statuteAgreement?.value ? "Tak" : "Nie" }}
      </p>
    </div>

    <!-- GOOGLE -->
    <div v-if="user.extAuth?.ggl" class="section">
      <h3>Google</h3>
      <p><strong>ID:</strong> {{ user.extAuth.ggl.id }}</p>
      <p><strong>Email:</strong> {{ user.extAuth.ggl.email }}</p>
      <p>
        <strong>Zweryfikowany:</strong>
        {{ user.extAuth.ggl.verified_email ? "Tak" : "Nie" }}
      </p>
    </div>
  </div>
</template>

<script setup>
import Email from "../elements/Email.vue";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

const formatDate = (timestamp) => {
  if (!timestamp) return "-";
  const d = new Date(timestamp);
  return d.toLocaleString("pl-PL");
};
</script>

<style scoped>
.user-card {
  max-width: 100%;
  max-height: 100%;
  padding: 25px;
  background: #f7f9fb;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", sans-serif;
  color: #222;
}

.user-card h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.user-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.section h3 {
  font-size: 18px;
  color: #444;
}

.card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 12px 15px;
  transition: 0.2s;
}

.card:hover {
  background: #f1f7ff;
}

p {
  margin: 0;
}
</style>
