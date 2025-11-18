import toast from 'react-hot-toast';
import { create } from 'zustand';
import { getBanner, updateBanner } from '../services/apiService';

interface BannerState {
  bannerContent: string;
  isLoading: boolean;
  fetchBanner: () => Promise<void>;
  setBanner: (content: string) => Promise<void>;
}

export const useBannerStore = create<BannerState>((set) => ({
  bannerContent: '',
  isLoading: false,

  fetchBanner: async () => {
    try {
      const data = await getBanner();
      set({ bannerContent: data.content });
    } catch (error) {
      console.error(error);
    }
  },

  setBanner: async (content: string) => {
    set({ isLoading: true });
    try {
      const data = await updateBanner(content);
      set({ bannerContent: data.content, isLoading: false });
      toast.success('Banner updated successfully!');
    } catch (error: any) {
      set({ isLoading: false });
      toast.error('Failed to update banner');
    }
  },
}));
