import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN as string;
const BASE_URL = process.env.NEXT_PUBLIC_NOTEHUB_BASE_URL as string;

const $host = axios.create({
  baseURL: BASE_URL,
});

function authInterceptor(config: InternalAxiosRequestConfig) {
  config.headers.authorization = `Bearer ${API_KEY}`;
  return config;
}

$host.interceptors.request.use(authInterceptor);

export default $host;
