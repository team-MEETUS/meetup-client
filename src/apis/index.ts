import axios, { Axios } from 'axios';

import type { AxiosInstance } from 'axios';

const baseURL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.BASE_URL
    : (import.meta.env.VITE_API_URL as string);

const AxiosInstance = (baseURL: string): Axios => {
  const instance = axios.create({
    baseURL,
    timeout: 15000,
    headers: {
      accept: 'application/json',
      Authorization: null,
    },
  });

  return instance;
};

const api = AxiosInstance(baseURL);

// const api = {
//   get: async <T = any>(
//     url: string,
//     config?: AxiosRequestConfig,
//   ): Promise<AxiosResponse<T>> => {
//     return await axiosInstance.get<T>(url, config);
//   },

//   post: async <T = any>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<AxiosResponse<T>> => {
//     return await axiosInstance.post<T>(url, data, config);
//   },

//   put: async <T = any>(
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig,
//   ): Promise<AxiosResponse<T>> => {
//     return await axiosInstance.put<T>(url, data, config);
//   },

//   delete: async <T = any>(
//     url: string,
//     config?: AxiosRequestConfig,
//   ): Promise<AxiosResponse<T>> => {
//     return await axiosInstance.delete<T>(url, config);
//   },
// };

export default api;
