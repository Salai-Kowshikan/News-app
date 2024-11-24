import axios from 'axios';

const apiClient1 = axios.create({
  baseURL: 'https://api.example.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiClient2 = axios.create({
  baseURL: 'https://api.anotherexample.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { apiClient1, apiClient2 };