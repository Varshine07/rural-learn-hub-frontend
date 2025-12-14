import axios from 'axios';

const API_BASE_URL = 'https://rural-learning-backend.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/users/login', { email, password }),
  register: (name: string, email: string, password: string, role: string) =>
    api.post('/users/register', { name, email, password, role }),
};

// Courses API
export const coursesAPI = {
  getAll: () => api.get('/courses'),
  getById: (id: string) => api.get(`/courses/${id}`),
  create: (data: { title: string; description: string; category: string }) =>
    api.post('/courses', data),
  update: (id: string, data: { title: string; description: string; category: string }) =>
    api.put(`/courses/${id}`, data),
  delete: (id: string) => api.delete(`/courses/${id}`),
};

// Lessons API
export const lessonsAPI = {
  getByCourse: (courseId: string) => api.get(`/lessons/course/${courseId}`),
  getById: (id: string) => api.get(`/lessons/${id}`),
  create: (courseId: string, data: { title: string; content: string; videoUrl?: string }) =>
    api.post(`/lessons`, { ...data, courseId }),
  update: (id: string, data: { title: string; content: string; videoUrl?: string }) =>
    api.put(`/lessons/${id}`, data),
  delete: (id: string) => api.delete(`/lessons/${id}`),
};

export default api;
