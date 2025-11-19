// src/components/ProductForm.tsx
import React from 'react';
import { Product } from '../types/product.types';
import {
  CancelButton,
  ImageUploadField,
  InputField,
  SubmitButton,
} from './FormElements';

interface ProductFormProps {
  product: Partial<Product>;
  isEditing: boolean;
  isSubmitting: boolean;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isEditing,
  isSubmitting,
  onInputChange,
  onImageUpload,
  onSubmit,
  onCancel,
}) => {
  return (
    <div className="bg-white dark:bg-brand-dark-secondary shadow-xl rounded-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <InputField
            label="Product Name"
            id="name"
            name="name"
            value={product.name}
            onChange={onInputChange}
          />
          <InputField
            label="Category"
            id="category"
            name="category"
            value={product.category}
            onChange={onInputChange}
          />
          <InputField
            label="Price"
            id="price"
            name="price"
            type="number"
            value={product.price}
            onChange={onInputChange}
          />
          <div className="sm:col-span-2">
            <InputField
              label="Description"
              id="description"
              name="description"
              value={product.description}
              onChange={onInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <InputField
              label="Image URL"
              id="image"
              name="image"
              value={product.image}
              onChange={onInputChange}
            />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
            <input
              type="checkbox"
              id="isFeatured"
              name="isFeatured"
              checked={product.isFeatured || false}
              onChange={onInputChange}
              className="w-5 h-5 text-theme-primary rounded border-gray-300 focus:ring-theme-primary cursor-pointer"
            />
            <label
              htmlFor="isFeatured"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
            >
              Mark as Featured Product
            </label>
          </div>
          <ImageUploadField
            onImageUpload={onImageUpload}
            newProduct={product}
          />
          <div className="col-span-full flex flex-col sm:flex-row gap-4 mt-4">
            <SubmitButton isEditing={isEditing} loading={isSubmitting} />
            {isEditing && <CancelButton onCancel={onCancel} />}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
