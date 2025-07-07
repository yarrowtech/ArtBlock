import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
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

// Auth API
export const auth = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Posts API
export const posts = {
  create: (postData) => {
    const formData = new FormData();
    Object.keys(postData).forEach(key => {
      if (key === 'tags' && Array.isArray(postData[key])) {
        formData.append(key, JSON.stringify(postData[key]));
      } else if (key === 'media') {
        formData.append('media', postData[key]);
      } else {
        formData.append(key, postData[key]);
      }
    });
    return api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getPublic: (page = 1, limit = 10) => 
    api.get(`/posts/public?page=${page}&limit=${limit}`),
  getFeed: (page = 1, limit = 10) => 
    api.get(`/posts/feed?page=${page}&limit=${limit}`),
  getById: (id) => api.get(`/posts/${id}`),
  update: (id, updates) => api.patch(`/posts/${id}`, updates),
  delete: (id) => api.delete(`/posts/${id}`),
  like: (id) => api.post(`/posts/${id}/like`),
  comment: (id, content) => api.post(`/posts/${id}/comment`, { content }),
};

// Users API
export const users = {
  getProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (updates) => {
    const formData = new FormData();
    Object.keys(updates).forEach(key => {
      formData.append(key, updates[key]);
    });
    return api.post('/profile/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  changePassword: (passwords) => api.post('/users/change-password', passwords),
  block: (userId) => api.post(`/users/block/${userId}`),
  follow: (userId) => api.post(`/users/follow/${userId}`),
  getFollowers: () => api.get('/users/followers'),
  getFollowing: () => api.get('/users/following'),
};

// Subscriptions API
export const subscriptions = {
  subscribe: (creatorId, amount) => 
    api.post(`/subscriptions/${creatorId}`, { amount }),
  getMySubscriptions: () => api.get('/subscriptions/my-subscriptions'),
  getMySubscribers: () => api.get('/subscriptions/my-subscribers'),
  cancel: (subscriptionId) => 
    api.post(`/subscriptions/${subscriptionId}/cancel`),
  renew: (subscriptionId, amount) => 
    api.post(`/subscriptions/${subscriptionId}/renew`, { amount }),
};

// Messages API
export const messages = {
  send: (recipientId, content, attachments = []) => 
    api.post('/messages', { recipientId, content, attachments }),
  getConversation: (userId) => api.get(`/messages/conversation/${userId}`),
  getConversations: () => api.get('/messages/conversations'),
  markAsRead: (senderId) => api.post(`/messages/read/${senderId}`),
  delete: (messageId) => api.delete(`/messages/${messageId}`),
};

export default {
  auth,
  posts,
  users,
  subscriptions,
  messages,
}; 