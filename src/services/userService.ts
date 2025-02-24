import axiosInstance from './axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import type { User } from '@/types/User';

const API_URL = 'http://localhost:8080/api/users';

const getAuthHeaders = () => {
    const authStore = useAuthStore();
    return {
        headers: {
            Authorization: `Bearer ${authStore.token}`,
        },
    };
};

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axiosInstance.get<User[]>(API_URL, getAuthHeaders());
    return response.data;
};
