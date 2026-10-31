import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL;

const $host = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export default $host;
