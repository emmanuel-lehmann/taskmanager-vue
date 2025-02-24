<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <v-app>
    <NavBar />
    <v-main class="d-flex justify-center align-center fill-height">
      <router-view />
    </v-main>
  </v-app>
</template>
