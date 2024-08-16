/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AxiosInstance = (baseURL: string): Axios => {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      accept: 'application/json',
      Authorization: null,
    },
  });

  instance.interceptors.request.use(
    function (config) {
      const token = config.headers.Authorization;
      const accessToken = sessionStorage.getItem('ACCESS_TOKEN');

      if (!token && accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }

      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    (res: AxiosResponse) => {
      const { data, status, config } = res;

      if (config.url === '/login' && status === 200) {
        instance.defaults.headers['Authorization'] =
          `Bearer ${data.data.accessToken}`;
      }

      return res;
    },
    (error: AxiosError) => {
      if (error.response && error.response.status === 401) {
        window.location.href = '/user/login';
        toast.error('로그인이 필요합니다.');
      }
      if (error.response && error.config) {
        const { url } = error.config;
        const { pathname } = window.location;
        console.log(`[${pathname}][${url}] : ${error.response.statusText}`);
        throw new Error(error.response.statusText);
      }
      throw new Error(error.message);
    },
  );

  return instance;
};

const api = AxiosInstance(API_URL);

export default api;
