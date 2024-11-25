import axios from 'axios';

const db = axios.create({
  baseURL: 'http://10.16.49.130:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export { db };