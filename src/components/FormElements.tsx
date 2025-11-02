import React from 'react';
import { Product } from '../types/product.types';

export interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value?: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  value,
  onChange,
  type = 'text',
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={id}
      className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
    />
  </div>
);

export const ImageUploadField: React.FC<{
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  newProduct: Partial<Product>;
}> = ({ onImageUpload, newProduct }) => (
  <>
    <div className="flex flex-col">
      <label
        htmlFor="image-upload"
        className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        Upload Image
      </label>
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={onImageUpload}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
      />
    </div>

    {newProduct.image && (
      <div className="col-span-full">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Image Preview
        </label>
        <img
          loading="lazy"
          src={newProduct.image}
          alt="Product Preview"
          className="w-32 h-32 object-cover rounded-lg"
        />
      </div>
    )}
  </>
);

export const SubmitButton: React.FC<{
  isEditing: boolean;
  loading: boolean;
}> = ({ isEditing, loading }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full sm:w-auto bg-theme-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50"
  >
    {loading ? 'Saving...' : isEditing ? 'Update Product' : 'Add Product'}
  </button>
);

export const CancelButton: React.FC<{ onCancel: () => void }> = ({
  onCancel,
}) => (
  <button
    type="button"
    onClick={onCancel}
    className="w-full sm:w-auto bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300"
  >
    Cancel
  </button>
);
