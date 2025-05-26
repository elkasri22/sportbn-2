import axios from 'axios';
export const BASE_URL_API = import.meta.env.VITE_API_URL;
export const limit = 4;

export let MainAxios = axios.create({
    baseURL: BASE_URL_API,
});