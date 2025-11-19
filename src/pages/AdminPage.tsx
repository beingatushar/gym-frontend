// src/pages/AdminPage.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaArrowDown,
  FaArrowUp,
  FaPlus,
  FaSave,
  FaTrash,
} from 'react-icons/fa';
import HeroSection from '../components/common/HeroSection';
import Spinner from '../components/common/Spinner';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { useBannerStore } from '../stores/useBannerStore';
import { useProductStore } from '../stores/useProductStore';
import { Product } from '../types/product.types';

// --- Banner Editor Component ---
const BannerEditor: React.FC = () => {
  const { bannerContent, setBanner, isLoading, fetchBanner } = useBannerStore();
  const [lines, setLines] = useState<string[]>([]);
  const DELIMITER = '|||';

  // Fetch on mount
  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  // Parse backend string into editable lines
  useEffect(() => {
    if (bannerContent) {
      setLines(bannerContent.split(DELIMITER));
    } else {
      setLines(['Welcome to Shelly Nutrition!']); // Default if empty
    }
  }, [bannerContent]);

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...lines];
    newLines[index] = value;
    setLines(newLines);
  };

  const addLine = () => {
    setLines([...lines, '']);
  };

  const removeLine = (index: number) => {
    if (lines.length <= 1) {
      toast.error('You must have at least one announcement.');
      return;
    }
    const newLines = lines.filter((_, i) => i !== index);
    setLines(newLines);
  };

  const moveLine = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === lines.length - 1)
    )
      return;

    const newLines = [...lines];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newLines[index], newLines[targetIndex]] = [
      newLines[targetIndex],
      newLines[index],
    ];
    setLines(newLines);
  };

  const handleSave = () => {
    // Filter out empty lines
    const validLines = lines.filter((line) => line.trim() !== '');

    if (validLines.length === 0) {
      toast.error('Banner cannot be empty.');
      return;
    }

    // Join with delimiter and save to backend
    setBanner(validLines.join(DELIMITER));
  };

  return (
    <div className="bg-white dark:bg-brand-dark-secondary shadow-xl rounded-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            📢 Announcement Banner
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Add multiple messages. They will cycle automatically in the header.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-theme-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition disabled:opacity-50 font-bold shadow-md"
        >
          <FaSave /> {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-3">
        {lines.map((line, index) => (
          <div
            key={index}
            className="flex gap-3 items-center group animate-fade-in-up"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveLine(index, 'up')}
                disabled={index === 0}
                className="p-1.5 text-gray-400 hover:text-theme-primary disabled:opacity-20 hover:bg-gray-100 dark:hover:bg-white/5 rounded transition"
                title="Move Up"
              >
                <FaArrowUp size={10} />
              </button>
              <button
                onClick={() => moveLine(index, 'down')}
                disabled={index === lines.length - 1}
                className="p-1.5 text-gray-400 hover:text-theme-primary disabled:opacity-20 hover:bg-gray-100 dark:hover:bg-white/5 rounded transition"
                title="Move Down"
              >
                <FaArrowDown size={10} />
              </button>
            </div>

            <div className="flex-grow relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 select-none">
                {index + 1}.
              </span>
              <input
                type="text"
                value={line}
                onChange={(e) => handleLineChange(index, e.target.value)}
                className="w-full pl-8 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-primary bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 transition-all"
                placeholder="Enter announcement text..."
              />
            </div>

            <button
              onClick={() => removeLine(index)}
              className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
              title="Remove Line"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
        <button
          onClick={addLine}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-theme-primary hover:bg-theme-secondary/50 dark:hover:bg-theme-primary/10 rounded-lg transition"
        >
          <FaPlus size={12} /> Add New Line
        </button>
      </div>
    </div>
  );
};

// --- Main Admin Page Component ---
const AdminPage: React.FC = () => {
  const {
    fetchAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
  } = useProductStore();

  const initialProductState = useCallback(
    () => ({
      category: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      isFeatured: false,
    }),
    []
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Partial<Product>>(
    initialProductState()
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchAllProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch products.');
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [fetchAllProducts]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      const checked = (e.target as HTMLInputElement).checked;

      setNewProduct((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : valueAsNumber(name, value),
      }));
    },
    []
  );

  const valueAsNumber = (name: string, value: string | number) => {
    if (name === 'price') {
      const num = parseFloat(value as string);
      return isNaN(num) ? '' : num;
    }
    return value;
  };

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const uploadingToast = toast.loading('Uploading image...');
      setIsSubmitting(true);
      try {
        const imageUrl = await uploadImage(file);
        setNewProduct((prev) => ({ ...prev, image: imageUrl }));
        toast.success('Image uploaded successfully!');
      } catch (err) {
        console.error(err);
        toast.error('Image upload failed.');
      } finally {
        toast.dismiss(uploadingToast);
        setIsSubmitting(false);
      }
    },
    [uploadImage]
  );

  const validateProduct = useCallback((): boolean => {
    if (!newProduct.name?.trim()) {
      toast.error('Product name is required');
      return false;
    }
    if (!newProduct.category?.trim()) {
      toast.error('Category is required');
      return false;
    }
    if (newProduct.price === undefined || newProduct.price <= 0) {
      toast.error('Price must be a positive number');
      return false;
    }
    return true;
  }, [newProduct]);

  const resetForm = useCallback(() => {
    setNewProduct(initialProductState());
    setIsEditing(false);
    setEditingProductId(null);
  }, [initialProductState]);

  const handleAddOrUpdateProduct = useCallback(async () => {
    if (!validateProduct()) return;

    setIsSubmitting(true);
    const action = isEditing ? 'Updating' : 'Adding';
    const toastId = toast.loading(`${action} product...`);

    try {
      if (isEditing && editingProductId) {
        const updated = await updateProduct(editingProductId, newProduct);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProductId ? updated : p))
        );
        toast.success('Product updated successfully!');
      } else {
        const created = await createProduct(newProduct);
        setProducts((prev) => [...prev, created]);
        toast.success('Product added successfully!');
      }
      resetForm();
    } catch (err) {
      console.error(err);
      toast.error(`Failed to ${action.toLowerCase()} product.`);
    } finally {
      toast.dismiss(toastId);
      setIsSubmitting(false);
    }
  }, [
    isEditing,
    editingProductId,
    newProduct,
    validateProduct,
    updateProduct,
    createProduct,
    resetForm,
  ]);

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      if (!window.confirm('Are you sure you want to delete this product?'))
        return;

      const toastId = toast.loading('Deleting product...');
      try {
        await deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success('Product deleted successfully!');
      } catch (err) {
        console.error(err);
        toast.error('Failed to delete product.');
      } finally {
        toast.dismiss(toastId);
      }
    },
    [deleteProduct]
  );

  const handleEditProduct = useCallback((product: Product) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setNewProduct(product);
    setIsEditing(true);
    setEditingProductId(product.id);
  }, []);

  return (
    <>
      <HeroSection
        title="Admin Panel"
        backgroundImage="https://source.unsplash.com/random/1600x900/?office,workspace"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Banner Editor Component */}
        <BannerEditor />

        <ProductForm
          product={newProduct}
          isEditing={isEditing}
          isSubmitting={isSubmitting}
          onInputChange={handleInputChange}
          onImageUpload={handleImageUpload}
          onSubmit={handleAddOrUpdateProduct}
          onCancel={resetForm}
        />

        {isLoading ? (
          <div className="flex justify-center p-10">
            <Spinner />
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}
      </div>
    </>
  );
};

export default AdminPage;
