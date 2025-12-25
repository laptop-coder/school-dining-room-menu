import axios, { AxiosInstance } from 'axios';

import getBackendURL from './getBackendURL';

const axiosInstanceUnauthorized: AxiosInstance = axios.create({
  baseURL: getBackendURL(),
  withCredentials: true,
});

export default axiosInstanceUnauthorized;
