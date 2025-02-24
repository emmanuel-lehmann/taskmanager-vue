<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const logout = () => {
  authStore.logout();
};
</script>

<template>
  <v-app-bar color="primary" dense>
    <v-toolbar-title>Task Manager</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="authStore.isAuthenticated" @click="logout" color="red">Logout</v-btn>
  </v-app-bar>
</template>
