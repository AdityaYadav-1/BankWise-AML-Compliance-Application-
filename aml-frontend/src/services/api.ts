import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL
});

// Request interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  console.log("Token in request header:", token); // 👈 TEMP LOG
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchTransactions = () => api.get('/transactions');
export const createTransaction = (data: any) => api.post('/transactions', data);
export const fetchSuspiciousTransactions = () => api.get('/transactions/suspicious');