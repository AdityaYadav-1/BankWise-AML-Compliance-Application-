import axios from 'axios';
import { User } from '../models/User';

const API_BASE = '/api/admin';

export const getAllUsers = () => {
  return axios.get<User[]>(`${API_BASE}/users`);
};

export const toggleUserStatus = (id: number) => {
  return axios.put(`${API_BASE}/users/${id}/toggle`);
};
