import { useAuth } from './useAuth';
import api from '../services/api';

export const useApi = () => {
    const { logout, refreshAuth } = useAuth();

    api.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If the error is due to an expired token and we haven't tried to refresh yet
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Attempt to refresh the token
                    const newToken = await refreshAuth();

                    // If successful, update the original request with the new token
                    if (newToken) {
                        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        return api(originalRequest);
                    }
                } catch (refreshError) {
                    // If refresh fails, log out the user
                    console.error('Token refresh failed:', refreshError);
                    logout();
                    return Promise.reject(refreshError);
                }
            }

            // For other errors, or if token refresh failed, reject the promise
            return Promise.reject(error);
        }
    );

    return api;
};