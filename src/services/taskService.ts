import axiosInstance from './axiosInstance';
import { useAuthStore } from '@/stores/authStore';
import type { Task } from '@/types/Task'

const API_URL = 'http://localhost:8080/api/tasks';

const getAuthHeaders = () => {
    const authStore = useAuthStore();
    const token = authStore.token;

    if (!token) {
        console.error('No token found! User may not be logged in.');
        return {};
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const fetchTasks = async (): Promise<Task[]> => {
    const response = await axiosInstance.get<Task[]>(API_URL, getAuthHeaders());
    return response.data;
};

export const addTask = async (title: string, assignedTo?: string): Promise<Task> => {
    const newTask: Task = { title, assignedTo, status: 'INCOMPLETE' };
    const response = await axiosInstance.post<Task>(API_URL, newTask, getAuthHeaders());
    return response.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
    const response = await axiosInstance.put<Task>(`${API_URL}/${task.id}`, task, getAuthHeaders());
    return response.data;
};

export const assignTaskToUser = async (taskId: number, userId: number): Promise<void> => {
    await axiosInstance.put(`${API_URL}/${taskId}/assign/${userId}`, {}, getAuthHeaders());
};

export const deleteTask = async (id: number): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`, getAuthHeaders());
};
