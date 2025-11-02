import { create } from 'zustand';
import { Product, ProductSortOption } from '../types/product.types';
import * as apiService from '../services/apiService';
import { uploadImage as uploadImageService } from '../services/imageUploadService';

interface ProductStore {
  error: string | null;
  setError: (error: string | null) => void;

  fetchAllProducts: (options?: {
    categories?: string[];
    sortBy?: ProductSortOption;
    page?: number;
    limit?: number;
  }) => Promise<Product[]>;

  getAllCategories: () => Promise<string[]>;
  getProductById: (id: string) => Promise<Product>;
  createProduct: (productData: Partial<Product>) => Promise<Product>;
  updateProduct: (id: string, updateData: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  cleanProducts: () => Promise<{ updatedCount: number; totalProducts: number }>;
  uploadImage: (imageFile: File) => Promise<string>;
}

export const useProductStore = create<ProductStore>((set) => ({
  error: null,
  setError: (error: string | null) => set({ error }),

  fetchAllProducts: async (options) => {
    set({ error: null });
    try {
      return await apiService.fetchAllProducts(options);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  getAllCategories: async () => {
    set({ error: null });
    try {
      return await apiService.getAllCategories();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  getProductById: async (id) => {
    set({ error: null });
    try {
      return await apiService.getProductById(id);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  createProduct: async (productData) => {
    set({ error: null });
    try {
      return await apiService.createProduct(productData);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateProduct: async (id, updateData) => {
    set({ error: null });
    try {
      return await apiService.updateProduct(id, updateData);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteProduct: async (id) => {
    set({ error: null });
    try {
      await apiService.deleteProduct(id);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  cleanProducts: async () => {
    set({ error: null });
    try {
      return await apiService.cleanProducts();
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  uploadImage: async (imageFile: File) => {
    set({ error: null });
    try {
      return await uploadImageService(imageFile);
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));
