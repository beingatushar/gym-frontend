import axios, { AxiosError } from 'axios';
import {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
} from '../types/auth.types';
import { Product, ProductSortOption } from '../types/product.types';

// --- Type Definitions ---

interface ApiErrorResponse {
  success: boolean;
  message: string;
  stack?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// --- API Client Setup ---

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Error Handling ---

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiErrorResponse>;
    return err.response?.data?.message || err.message;
  }
  return 'An unknown error occurred';
};

// --- Auth Service Functions ---

export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  try {
    const { data: apiResponse } = await api.post<ApiResponse<AuthResponse>>(
      '/api/user/login',
      credentials
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const { data: apiResponse } = await api.get<ApiResponse<Product[]>>(
      '/api/products/featured'
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};
export const signupUser = async (
  credentials: SignupCredentials
): Promise<AuthResponse> => {
  try {
    const { data: apiResponse } = await api.post<ApiResponse<AuthResponse>>(
      '/api/user/signup',
      credentials
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

// --- Product Service Functions ---

export const fetchAllProducts = async (options?: {
  categories?: string[];
  sortBy?: ProductSortOption;
  page?: number;
  limit?: number;
}): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    if (options?.categories && options.categories.length > 0) {
      params.append('category', JSON.stringify(options.categories));
    }
    if (options?.sortBy) {
      params.append('sortBy', options.sortBy);
    }
    if (options?.page) {
      params.append('page', String(options.page));
    }
    if (options?.limit) {
      params.append('limit', String(options.limit));
    }

    const url = `/api/products?${params.toString()}`;
    const { data: apiResponse } = await api.get<ApiResponse<Product[]>>(url);
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export const getAllCategories = async (): Promise<string[]> => {
  try {
    const { data: apiResponse } = await api.get<ApiResponse<string[]>>(
      '/api/products/categories'
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const { data: apiResponse } = await api.get<ApiResponse<Product>>(
      `/api/products/${id}`
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export const createProduct = async (
  productData: Partial<Product>
): Promise<Product> => {
  try {
    const { data: apiResponse } = await api.post<ApiResponse<Product>>(
      '/api/products',
      productData
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export const updateProduct = async (
  id: string,
  updateData: Partial<Product>
): Promise<Product> => {
  try {
    const { data: apiResponse } = await api.put<ApiResponse<Product>>(
      `/api/products/${id}`,
      updateData
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export const deleteProduct = async (id: string): Promise<{ id: string }> => {
  try {
    const { data: apiResponse } = await api.delete<ApiResponse<{ id: string }>>(
      `/api/products/${id}`
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export const cleanProducts = async (): Promise<{
  updatedCount: number;
  totalProducts: number;
}> => {
  try {
    const { data: apiResponse } = await api.post<
      ApiResponse<{
        updatedCount: number;
        totalProducts: number;
      }>
    >('/api/products/clean');
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};

export interface BannerData {
  content: string;
}

export const getBanner = async (): Promise<BannerData> => {
  try {
    const { data: apiResponse } =
      await api.get<ApiResponse<BannerData>>('/api/banner');
    return apiResponse.data;
  } catch (error) {
    return { content: 'Welcome to Shelly Nutrition!' };
  }
};

export const updateBanner = async (content: string): Promise<BannerData> => {
  try {
    const { data: apiResponse } = await api.post<ApiResponse<BannerData>>(
      '/api/banner',
      { content }
    );
    return apiResponse.data;
  } catch (error: unknown) {
    throw new Error(handleApiError(error));
  }
};
