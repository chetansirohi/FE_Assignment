import { useAuth } from './useAuth';
import api from '../services/api';

export const useApi = () => {
    const { logout } = useAuth();

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response && error.response.status === 401) {
                logout();
            }
            return Promise.reject(error);
        }
    );

    return api;
};