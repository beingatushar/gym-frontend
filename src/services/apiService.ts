import axios, { AxiosError } from 'axios';
import { Product, ProductSortOption } from '../types/product.types.ts';

// --- Type Definitions ---

// Matches the backend's ApiError structure for better error handling
interface ApiErrorResponse {
  success: boolean;
  message: string;
  stack?: string;
}

// Matches the backend's ApiResponse structure
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// --- API Client Setup ---

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// --- Error Handling ---

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const err = error as AxiosError<ApiErrorResponse>;
    // Prioritize the structured error message from our backend
    return err.response?.data?.message || err.message;
  }
  return 'An unknown error occurred';
};

// --- API Service Functions ---

export const fetchAllProducts = async (options?: {
  categories?: string[];
  sortBy?: ProductSortOption;
  page?: number;
  limit?: number;
}): Promise<Product[]> => {
  try {
    const params = new URLSearchParams();
    if (options?.categories && options.categories.length > 0) {
      // The backend expects a JSON stringified array
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

    // Return the nested data property
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
    return apiResponse.data; // The backend now returns the ID of the deleted product
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
