// frontend/src/api/client.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

// Generic fetch wrapper
async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

// MongoDB API Calls (via backend)
export const api = {
  // Waste Collection
  getWasteRecords: () => apiFetch('/waste/records'),
  createWasteRecord: (data) => apiFetch('/waste/records', { method: 'POST', body: JSON.stringify(data) }),
  updateWasteRecord: (id, data) => apiFetch(`/waste/records/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteWasteRecord: (id) => apiFetch(`/waste/records/${id}`, { method: 'DELETE' }),

  // Routes
  getRoutes: () => apiFetch('/routes'),
  createRoute: (data) => apiFetch('/routes', { method: 'POST', body: JSON.stringify(data) }),

  // Invoices
  getInvoices: () => apiFetch('/billing/invoices'),
  createInvoice: (data) => apiFetch('/billing/invoices', { method: 'POST', body: JSON.stringify(data) }),

  // Analytics
  getAnalytics: (params) => apiFetch(`/analytics?${new URLSearchParams(params)}`),

  // Users
  getUsers: () => apiFetch('/users'),
  createUser: (data) => apiFetch('/users', { method: 'POST', body: JSON.stringify(data) }),
  
  // Auth
  login: async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }
    return data;
  },
  register: async (data) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Registration failed');
    }
    return result;
  },
};

export default api;