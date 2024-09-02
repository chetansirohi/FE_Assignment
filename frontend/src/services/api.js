import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const api = axios.create({
    baseURL: API_URL,
});

export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export const removeAuthToken = () => {
    delete api.defaults.headers.common['Authorization'];
};

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => refreshSubscribers.push(cb);

const onTokenRefreshed = (token) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                const response = await axios.post(`${API_URL}token/refresh/`, { refresh: refreshToken });
                const { access } = response.data;

                localStorage.setItem('access_token', access);
                setAuthToken(access);
                onTokenRefreshed(access);

                originalRequest.headers['Authorization'] = `Bearer ${access}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                removeAuthToken();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

// Auth endpoints
export const login = (credentials) => api.post('token/', credentials);
export const register = (userData) => api.post('register/', userData);
export const logout = (refreshToken) => api.post('logout/', { refresh: refreshToken });
export const refreshToken = (refreshToken) => api.post('token/refresh/', { refresh: refreshToken });
export const validateToken = (token) => api.post('token/verify/', { token });

// User endpoints
export const getCurrentUser = () => api.get('users/me/');

// Project endpoints
export const getProjects = () => api.get('projects/');
export const getProject = (id) => api.get(`projects/${id}/`);
export const createProject = (projectData) => api.post('projects/', projectData);
export const updateProject = (id, projectData) => api.put(`projects/${id}/`, projectData);
export const deleteProject = (id) => api.delete(`projects/${id}/`);

// Task endpoints
export const getTasks = () => api.get('tasks/');
export const getTask = (id) => api.get(`tasks/${id}/`);
export const createTask = (taskData) => api.post('tasks/', taskData);
export const updateTask = (id, taskData) => api.put(`tasks/${id}/`, taskData);
export const deleteTask = (id) => api.delete(`tasks/${id}/`);
export const getMyTasks = () => api.get('tasks/my_tasks/');
export const updateTaskStatus = (id, status) => api.patch(`tasks/${id}/update_status/`, { status });

export default api;