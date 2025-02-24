<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const router = useRouter();
const authStore = useAuthStore();

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!username.value.trim() || !password.value.trim()) {
    errorMessage.value = 'Username and password are required!';
    return;
  }

  errorMessage.value = '';
  loading.value = true;

  try {
    await authStore.loginUser({ username: username.value, password: password.value });
    router.push('/tasks');
  } catch (error: any) {
    if (error.message) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'An unexpected error occurred. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};



</script>

<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-6 rounded-lg" width="400" elevation="12">
      <v-card-title class="text-center text-h5 font-weight-bold">Sign In</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
              v-model="username"
              label="Username"
              variant="outlined"
              prepend-inner-icon="mdi-account"
              required
              @input="errorMessage = ''"
          ></v-text-field>

          <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              prepend-inner-icon="mdi-lock"
              required
              @input="errorMessage = ''"
          ></v-text-field>

          <v-alert v-if="errorMessage" type="error" class="mb-3" dense>
            {{ errorMessage }}
          </v-alert>

          <v-btn type="submit" color="blue darken-3" block class="mt-3" size="large" :loading="loading">
            Sign In
          </v-btn>

          <v-btn to="/register" variant="text" block class="mt-2 text-blue">Create an Account</v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
