import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://api.thenewsapi.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const db = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { newsApi, db };