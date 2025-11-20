import React from 'react';
import { Product } from '../types/product.types';

// --- Modern Floating Label Input ---
export const InputField: React.FC<{
  label: string;
  id: string;
  name: string;
  type?: string;
  value?: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}> = ({ label, id, type = 'text', value, onChange, ...props }) => (
  <div className="relative z-0 w-full group">
    <input
      type={type}
      id={id}
      // name={id}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer block w-full appearance-none rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent px-4 py-3 text-sm text-gray-900 dark:text-white focus:border-theme-primary focus:outline-none focus:ring-0"
      {...props}
    />
    <label
      htmlFor={id}
      className="absolute top-3 left-4 z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 bg-white dark:bg-brand-dark-secondary px-1 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-3 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-theme-primary peer-focus:font-bold"
    >
      {label}
    </label>
  </div>
);

// --- Drag & Drop Style Image Upload ---
export const ImageUploadField: React.FC<{
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newProduct: Partial<Product>;
}> = ({ onImageUpload, newProduct }) => (
  <div className="col-span-full">
    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
      Product Image
    </label>
    <div className="flex items-center gap-6">
      {newProduct.image && (
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <img
            src={newProduct.image}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <label className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-bold text-theme-primary">
              Click to upload
            </span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF
          </p>
        </div>
        <input
          type="file"
          className="hidden"
          onChange={onImageUpload}
          accept="image/*"
        />
      </label>
    </div>
  </div>
);

// --- Action Buttons ---
export const SubmitButton: React.FC<{
  isEditing: boolean;
  loading: boolean;
}> = ({ isEditing, loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full sm:w-auto rounded-xl bg-theme-primary px-8 py-3 text-sm font-bold text-white shadow-lg hover:bg-opacity-90 focus:outline-none focus:ring-4 focus:ring-theme-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
  >
    {loading
      ? 'Processing...'
      : isEditing
        ? 'Update Product'
        : 'Create Product'}
  </button>
);

export const CancelButton: React.FC<{ onCancel: () => void }> = ({
  onCancel,
}) => (
  <button
    type="button"
    onClick={onCancel}
    className="w-full sm:w-auto rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent px-8 py-3 text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 focus:outline-none transition-all"
  >
    Cancel
  </button>
);
