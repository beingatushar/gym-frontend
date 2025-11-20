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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onArrayChange: (key: 'features' | 'tags', value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isEditing,
  isSubmitting,
  onInputChange,
  onArrayChange,
  onImageUpload,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="animate-fade-in-up"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <InputField
              label="Price (₹)"
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={onInputChange}
            />
            <InputField
              label="Stock Qty"
              id="stock"
              name="stock"
              type="number"
              value={product.stock}
              onChange={onInputChange}
            />
            <InputField
              label="Rating (0-5)"
              id="rating"
              name="rating"
              type="number"
              value={product.rating}
              onChange={onInputChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              value={product.description || ''}
              onChange={onInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              placeholder="Detailed product description..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Features (One per line)
              </label>
              <textarea
                rows={4}
                value={product.features?.join('\n') || ''}
                onChange={(e) => onArrayChange('features', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm"
                placeholder="- 24g Protein&#10;- No Added Sugar"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                Tags (One per line)
              </label>
              <textarea
                rows={4}
                value={product.tags?.join('\n') || ''}
                onChange={(e) => onArrayChange('tags', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 text-sm"
                placeholder="whey&#10;protein&#10;muscle"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Media & Extras */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4">
              Media
            </h3>
            <div className="mb-4">
              <InputField
                label="Image URL (or upload below)"
                id="image"
                name="image"
                value={product.image}
                onChange={onInputChange}
              />
            </div>
            <ImageUploadField
              onImageUpload={onImageUpload}
              newProduct={product}
            />
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-4">
            <h3 className="font-bold text-gray-700 dark:text-gray-200">
              Attributes
            </h3>
            <InputField
              label="Size / Weight"
              id="size"
              name="size"
              value={product.size}
              onChange={onInputChange}
            />
            <InputField
              label="Material / Flavor"
              id="material"
              name="material"
              value={product.material}
              onChange={onInputChange}
            />
            <div className="flex items-center gap-3 pt-2">
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
                Featured Product
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
        {isEditing && <CancelButton onCancel={onCancel} />}
        <SubmitButton isEditing={isEditing} loading={isSubmitting} />
      </div>
    </form>
  );
};

export default ProductForm;
