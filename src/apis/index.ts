/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';

import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

type AnyObject = Record<string, unknown>;

const isObject = (data: unknown): data is AnyObject => {
  return typeof data === 'object' && data !== null;
};

// 날짜 데이터를 ISO 8601 형식으로 변환하는 함수
const convertDateToISO = (data: AnyObject): void => {
  Object.keys(data).forEach((key) => {
    if (data[key] instanceof Date) {
      data[key] = data[key].toISOString();
    } else if (isObject(data[key])) {
      convertDateToISO(data[key]);
    }
  });
};

// ISO 8601 문자열을 Date 객체로 변환하는 함수
const convertISOToDate = (data: AnyObject): void => {
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string' && !isNaN(Date.parse(data[key]))) {
      const date = new Date(data[key]);
      if (date.toISOString() === data[key]) {
        data[key] = date;
      }
    } else if (isObject(data[key])) {
      convertISOToDate(data[key]);
    }
  });
};

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

      // 요청 데이터에서 날짜를 ISO 형식으로 변환
      if (config.data) {
        convertDateToISO(config.data);
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

      if (data) {
        convertISOToDate(data);
      }

      if (config.url === '/login' && status === 200) {
        instance.defaults.headers['Authorization'] =
          `Bearer ${data.data.accessToken}`;
      }

      return res;
    },
    (error: AxiosError<{ error: { code: string; message: string } }>) => {
      if (error.response && error.response.status === 401) {
        if (confirm('로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?')) {
          window.location.href = '/user/login';
        } else {
          window.history.back();
          return;
        }
      }

      if (error.response && error.config) {
        const errorMessage =
          error.response.data?.error?.message || '오류가 발생했습니다.';
        toast.error(String(errorMessage));
        throw new Error(error.response.statusText);
      }
      throw new Error(error.message);
    },
  );

  return instance;
};

const api = AxiosInstance(API_URL);

export default api;
