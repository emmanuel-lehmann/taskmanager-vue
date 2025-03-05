<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-app-bar color="primary" dense>
    <div class="app-bar-content">
      <v-toolbar-title class="title">Task Manager</v-toolbar-title>
      <v-btn
          v-if="authStore.isAuthenticated"
          @click="logout"
          class="logout-btn"
      >
        Logout
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped>
.app-bar-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 1px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logout-btn {
  background-color: #f0f0f0 !important;
  color: #000 !important;
  font-weight: bold;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  position: absolute;
  right: 20px;
}
</style>
