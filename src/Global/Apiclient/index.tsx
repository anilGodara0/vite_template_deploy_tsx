import axios, { AxiosRequestConfig } from 'axios';
import { Environment } from '../Environment/Environment';
import Cookies from 'js-cookie';

const API_BASE_URL = Environment.api || '';

const defaultConfig: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const setLoading = (type: boolean) => {
  try {
    document.getElementById(type ? 'loaderTrue' : 'loaderFalse')?.click();
  } catch {
    console.log('error');
  }
};

const getToken = () => Cookies.get('token') || '';

const createConfig = (extraConfig: AxiosRequestConfig = {}): AxiosRequestConfig => {
  const token = getToken();
  return {
    ...defaultConfig,
    headers: {
      ...defaultConfig.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...extraConfig.headers,
    },
    ...extraConfig,
  };
};

const handleError = (error: any) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error?.message ||
    'Server Error';
  if (error?.response?.status === 401) {
    localStorage.clear();
    Cookies.remove('token');
    window.location.assign('/');
  }
  return { success: false, message };
};


class ApiClient {
  static async post<T>(endpoint: string, data: any, config: AxiosRequestConfig = {}) {
    setLoading(true);
    try {
      const baseurl = config.baseURL || API_BASE_URL;
      const response = await axios.post<T>(`${baseurl}${endpoint}`, data, createConfig(config));
      return response.data;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }

  static async put<T>(endpoint: string, data: any, config: AxiosRequestConfig = {}) {
    setLoading(true);
    try {
      const response = await axios.put<T>(`${API_BASE_URL}${endpoint}`, data, createConfig(config));
      return response.data;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }

  static async get<T>(endpoint: string, params: any = {}, config: AxiosRequestConfig = {}) {
    setLoading(true);
    try {
      const query = new URLSearchParams(params).toString();
      const baseurl = config.baseURL || API_BASE_URL;
      const url = query ? `${baseurl}${endpoint}?${query}` : `${baseurl}${endpoint}`;
      const response = await axios.get<T>(url, createConfig(config));
      return response.data;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }

  static async delete<T>(endpoint: string, params: any = {}, config: AxiosRequestConfig = {}) {

    setLoading(true);
    try {
      const query = new URLSearchParams(params).toString();
      const url = query ? `${API_BASE_URL}${endpoint}?${query}` : `${API_BASE_URL}${endpoint}`;
      const response = await axios.delete<T>(url, createConfig(config));
      return response.data;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }

  static async postFormData<T>(endpoint: string, formData: FormData, config: AxiosRequestConfig = {}) {
    setLoading(true);
    try {
      const formConfig = createConfig({
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const response = await axios.post<T>(
        `${API_BASE_URL}${endpoint}`,
        formData,
        { ...formConfig, ...config }
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    } finally {
      setLoading(false);
    }
  }


}

export default ApiClient;
