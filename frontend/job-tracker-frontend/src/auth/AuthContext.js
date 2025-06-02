import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in by verifying the token
    const token = localStorage.getItem('access_token');
    const userInfo = localStorage.getItem('user_info');
    
    if (token && userInfo) {
      setUser(JSON.parse(userInfo));
      // Set default authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (identifier, password) => {
    try {
      const response = await api.post('/users/login/', {
        identifier,
        password
      });

      const { data } = response;
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      
      // Store user info
      const userInfo = {
        email: data.email,
        username: data.username
      };
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      
      // Set default authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;
      
      setUser(userInfo);
      return true;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('refresh_token');
      await api.post('/users/logout/', { 
        refresh_token: token 
      });
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_info');
      // Remove default authorization header
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
