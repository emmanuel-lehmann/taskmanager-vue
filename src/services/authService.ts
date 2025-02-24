import axiosInstance from './axiosInstance';

const API_URL = 'http://localhost:8080/api/auth';

export interface AuthResponse {
    token: string;
}

export interface UserCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    password: string;
}

export const login = async (credentials: UserCredentials): Promise<AuthResponse> => {
    try {
        const response = await axiosInstance.post<AuthResponse>(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Login failed. Please try again.');
        }
        throw new Error('Network error. Please check your connection.');
    }
};

export const register = async (data: RegisterData): Promise<void> => {
    await axiosInstance.post(`${API_URL}/register`, data);
};
