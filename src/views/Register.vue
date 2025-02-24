<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    errorMessage.value = 'All fields are required.';
    return;
  }
  try {
    await authStore.registerUser(username.value, password.value);
    router.push('/tasks');
  } catch (error) {
    errorMessage.value = 'Registration failed. Try again.';
  }
};
</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6 rounded-lg" width="400" elevation="12">
      <v-card-title class="text-center text-h5 font-weight-bold">Sign Up</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
          <v-text-field v-model="username" label="Username" required variant="outlined" prepend-inner-icon="mdi-account"></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required variant="outlined" prepend-inner-icon="mdi-lock"></v-text-field>
          <v-alert v-if="errorMessage" type="error" class="mb-3">{{ errorMessage }}</v-alert>
          <v-btn type="submit" color="green darken-3" block class="mt-3" size="large">Register</v-btn>
          <v-btn to="/login" variant="text" block class="mt-2 text-blue">Already have an account? Sign In</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
