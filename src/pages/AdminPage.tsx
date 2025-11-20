import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaArrowDown,
  FaArrowUp,
  FaBoxOpen,
  FaChartLine,
  FaPlus,
  FaSave,
  FaStar,
  FaTags,
  FaTrash,
} from 'react-icons/fa';
import Spinner from '../components/common/Spinner';
import ProductForm from '../components/ProductForm';
import ProductTable from '../components/ProductTable';
import { useBannerStore } from '../stores/useBannerStore';
import { useProductStore } from '../stores/useProductStore';
import { Product } from '../types/product.types';

// --- Banner Editor Component (Modernized) ---
const BannerEditor: React.FC = () => {
  const { bannerContent, setBanner, isLoading, fetchBanner } = useBannerStore();
  const [lines, setLines] = useState<string[]>([]);
  const DELIMITER = '|||';

  useEffect(() => {
    fetchBanner();
  }, [fetchBanner]);

  useEffect(() => {
    setLines(
      bannerContent
        ? bannerContent.split(DELIMITER)
        : ['Welcome to Shelly Nutrition!']
    );
  }, [bannerContent]);

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...lines];
    newLines[index] = value;
    setLines(newLines);
  };

  const addLine = () => setLines([...lines, '']);

  const removeLine = (index: number) => {
    if (lines.length <= 1) {
      toast.error('At least one announcement is required.');
      return;
    }
    setLines(lines.filter((_, i) => i !== index));
  };

  const moveLine = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === lines.length - 1)
    )
      return;
    const newLines = [...lines];
    const target = direction === 'up' ? index - 1 : index + 1;
    [newLines[index], newLines[target]] = [newLines[target], newLines[index]];
    setLines(newLines);
  };

  const handleSave = () => {
    const validLines = lines.filter((line) => line.trim() !== '');
    if (validLines.length === 0) {
      toast.error('Banner cannot be empty.');
      return;
    }
    setBanner(validLines.join(DELIMITER));
  };

  return (
    <div className="bg-white dark:bg-brand-dark-secondary shadow-sm border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-8 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
            <FaTags size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Announcement Banner
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage scrolling header messages
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-theme-primary text-white px-5 py-2.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 font-semibold shadow-sm text-sm"
        >
          <FaSave /> {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-3">
        {lines.map((line, index) => (
          <div key={index} className="flex gap-3 items-center group">
            <div className="flex flex-col gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => moveLine(index, 'up')}
                disabled={index === 0}
                className="p-1 hover:text-theme-primary disabled:opacity-20"
              >
                <FaArrowUp size={10} />
              </button>
              <button
                onClick={() => moveLine(index, 'down')}
                disabled={index === lines.length - 1}
                className="p-1 hover:text-theme-primary disabled:opacity-20"
              >
                <FaArrowDown size={10} />
              </button>
            </div>
            <div className="flex-grow relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">
                {index + 1}
              </span>
              <input
                type="text"
                value={line}
                onChange={(e) => handleLineChange(index, e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all"
                placeholder="Announcement text..."
              />
            </div>
            <button
              onClick={() => removeLine(index)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addLine}
        className="mt-4 text-sm font-bold text-theme-primary hover:text-theme-primary/80 flex items-center gap-2 px-2"
      >
        <FaPlus size={10} /> Add Announcement
      </button>
    </div>
  );
};

// --- Main Admin Page ---
const AdminPage: React.FC = () => {
  const {
    fetchAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
  } = useProductStore();

  // Initial state with ALL fields
  const initialProductState = useCallback(
    (): Partial<Product> => ({
      category: '',
      name: '',
      description: '',
      price: 0,
      stock: 0,
      rating: 0,
      image: '',
      features: [],
      tags: [],
      material: '',
      size: '',
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
  const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const fetchedProducts = await fetchAllProducts({ limit: 1000 });
      setProducts(fetchedProducts);
    } catch (err) {
      toast.error('Failed to fetch products.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchAllProducts]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // --- Stats Calculation ---
  const stats = {
    total: products.length,
    featured: products.filter((p) => p.isFeatured).length,
    lowStock: products.filter((p) => (p.stock || 0) < 5).length,
  };

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value, type } = e.target;
      let parsedValue: any = value;

      if (type === 'checkbox') {
        parsedValue = (e.target as HTMLInputElement).checked;
      } else if (type === 'number') {
        parsedValue = parseFloat(value) || 0;
      }

      setNewProduct((prev) => ({ ...prev, [name]: parsedValue }));
    },
    []
  );

  // Handle Array Inputs (Features, Tags)
  const handleArrayChange = useCallback(
    (key: 'features' | 'tags', value: string) => {
      setNewProduct((prev) => ({
        ...prev,
        [key]: value.split('\n'), // Split by newline
      }));
    },
    []
  );

  const handleImageUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const toastId = toast.loading('Uploading image...');
      setIsSubmitting(true);
      try {
        const imageUrl = await uploadImage(file);
        setNewProduct((prev) => ({ ...prev, image: imageUrl }));
        toast.success('Image uploaded!');
      } catch (err) {
        toast.error('Upload failed.');
      } finally {
        toast.dismiss(toastId);
        setIsSubmitting(false);
      }
    },
    [uploadImage]
  );

  const handleSubmit = async () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error('Name and Price are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && editingProductId) {
        const updated = await updateProduct(editingProductId, newProduct);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProductId ? updated : p))
        );
        toast.success('Updated successfully!');
      } else {
        const created = await createProduct(newProduct);
        setProducts((prev) => [created, ...prev]);
        toast.success('Created successfully!');
      }
      resetForm();
      setActiveTab('list'); // Switch back to list automatically
    } catch (err) {
      toast.error('Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setNewProduct(initialProductState());
    setIsEditing(false);
    setEditingProductId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success('Deleted.');
    } catch (err) {
      toast.error('Delete failed.');
    }
  };

  const handleEdit = (product: Product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditingProductId(product.id);
    setActiveTab('add'); // Switch tab to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFeatured = async (product: Product) => {
    try {
      const updated = await updateProduct(product.id, {
        isFeatured: !product.isFeatured,
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? updated : p))
      );
      toast.success(
        updated.isFeatured ? 'Marked as featured' : 'Removed from featured'
      );
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark pb-20 pt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your store's inventory and settings.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400">
              <FaBoxOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Total Products
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400">
              <FaStar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Featured Items
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.featured}
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-brand-dark-secondary p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400">
              <FaChartLine size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Low Stock
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.lowStock}
              </p>
            </div>
          </div>
        </div>

        {/* Banner Editor */}
        <BannerEditor />

        {/* Main Content Tabs */}
        <div className="bg-white dark:bg-brand-dark-secondary rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => {
                setActiveTab('list');
                resetForm();
              }}
              className={`px-6 py-4 font-bold text-sm transition-colors ${
                activeTab === 'list'
                  ? 'bg-theme-primary/10 text-theme-primary border-b-2 border-theme-primary'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Product List
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-4 font-bold text-sm transition-colors ${
                activeTab === 'add'
                  ? 'bg-theme-primary/10 text-theme-primary border-b-2 border-theme-primary'
                  : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'list' ? (
              isLoading ? (
                <div className="p-12 flex justify-center">
                  <Spinner />
                </div>
              ) : (
                <ProductTable
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onToggleFeatured={toggleFeatured}
                />
              )
            ) : (
              <ProductForm
                product={newProduct}
                isEditing={isEditing}
                isSubmitting={isSubmitting}
                onInputChange={handleInputChange}
                onArrayChange={handleArrayChange}
                onImageUpload={handleImageUpload}
                onSubmit={handleSubmit}
                onCancel={() => {
                  resetForm();
                  setActiveTab('list');
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
