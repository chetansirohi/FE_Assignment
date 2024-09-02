import React, { createContext, useState, useEffect, useCallback } from 'react';
import api, { setAuthToken, removeAuthToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('access_token');
            if (token) {
                setAuthToken(token);
                const response = await api.get('users/me/'); // Assuming there's an endpoint to get user info
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error loading user:', error);
            await logout();
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = async (credentials) => {
        try {
            const response = await api.post('token/', credentials);
            const { access, refresh, user: userData } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            setAuthToken(access);
            setUser(userData);
            setError(null);
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            setError('Login failed. Please check your credentials.');
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('register/', userData);
            const { access, refresh, user: newUser } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            setAuthToken(access);
            setUser(newUser);
            setError(null);
            return newUser;
        } catch (error) {
            console.error('Registration error:', error);
            setError('Registration failed. Please try again.');
            throw error;
        }
    };

    const logout = useCallback(async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await api.post('logout/', { refresh: refreshToken });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            removeAuthToken();
            setUser(null);
            setError(null);
        }
    }, []);

    const refreshAuth = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }
            const response = await api.post('token/refresh/', { refresh: refreshToken });
            const { access } = response.data;
            localStorage.setItem('access_token', access);
            setAuthToken(access);
            return access;
        } catch (error) {
            console.error('Token refresh failed:', error);
            await logout();
            throw error;
        }
    };

    const value = {
        user,
        loading,
        error,
        login,
        register,
        logout,
        refreshAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};