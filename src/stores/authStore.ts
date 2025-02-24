import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login, register } from '@/services/authService';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();

    const token = ref<string | null>(sessionStorage.getItem('token'));

    const loginUser = async (credentials: { username: string; password: string }) => {
        try {
            const response = await login(credentials);
            token.value = response.token;
            sessionStorage.setItem('token', response.token);
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const registerUser = async (username: string, password: string) => {
        try {
            await register({ username, password });
        } catch (error) {
            console.error("Registration failed", error);
        }
    };

    const logout = () => {
        token.value = null;
        sessionStorage.removeItem('token');
        router.push('/login');
    };

    const isAuthenticated = computed(() => !!token.value);

    return { token, loginUser, registerUser, logout, isAuthenticated };
});
