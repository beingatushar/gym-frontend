import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaChevronRight, FaEdit, FaMagic, FaSave } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

import { useAuthStore } from '../stores/useAuthStore';
import useCartStore from '../stores/useCartStore';
import { useProductStore } from '../stores/useProductStore';
import { Product } from '../types/product.types';

import PageMeta from '../components/common/PageMeta'; // Import PageMeta
import Spinner from '../components/common/Spinner';
import { ProductCard } from '../components/ProductCard';
import ProductForm from '../components/ProductForm';
import ProductImage from '../components/ProductImage';
import ProductInformation from '../components/ProductInformation';

const ProductNotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]">
    <PageMeta title="Product Not Found" />
    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      Product Not Found
    </h1>
    <Link
      to="/shop"
      className="bg-theme-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
    >
      Continue Shopping
    </Link>
  </div>
);

const Breadcrumb: React.FC<{ product: Product }> = ({ product }) => (
  <nav className="text-sm my-8 flex items-center space-x-2 text-gray-500 dark:text-gray-400 flex-wrap">
    <Link to="/" className="hover:text-theme-primary">
      Home
    </Link>
    <FaChevronRight size={10} />
    <Link to="/shop" className="hover:text-theme-primary">
      Shop
    </Link>
    <FaChevronRight size={10} />
    <Link
      to={`/shop?categories=${product.category}`}
      className="hover:text-theme-primary capitalize"
    >
      {product.category.replace(/-/g, ' ')}
    </Link>
    <FaChevronRight size={10} />
    <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-[150px] sm:max-w-none">
      {product.name}
    </span>
  </nav>
);

const RelatedProducts: React.FC<{
  category: string;
  currentProductId: string;
}> = ({ category, currentProductId }) => {
  const { fetchAllProducts } = useProductStore();
  const [related, setRelated] = useState<Product[]>([]);

  useEffect(() => {
    const loadRelated = async () => {
      try {
        const products = await fetchAllProducts({ categories: [category] });
        // Filter out the current product and take up to 4 others
        setRelated(
          products.filter((p) => p.id !== currentProductId).slice(0, 4)
        );
      } catch (error) {
        console.error('Failed to fetch related products', error);
      }
    };
    loadRelated();
  }, [category, currentProductId, fetchAllProducts]);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-24 border-t border-gray-100 dark:border-gray-800 pt-12">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

// --- Main Page Component ---
const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProductById, updateProduct, uploadImage } = useProductStore();
  const { handleAddToCart } = useCartStore();
  const { user } = useAuthStore();

  const [originalProduct, setOriginalProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 1. Load Product
  const loadProduct = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const fetchedProduct = await getProductById(productId);
      setOriginalProduct(fetchedProduct);
      setPreviewProduct(fetchedProduct);
    } catch (err) {
      console.error('Error fetching product:', err);
      toast.error('Could not load product details.');
    } finally {
      setLoading(false);
    }
  }, [productId, getProductById]);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProduct();
  }, [loadProduct]);

  // 2. Live Edit Handlers
  const handleLiveInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!previewProduct) return;
    const { name, value, type } = e.target;
    let parsedValue: any = value;

    if (type === 'checkbox') {
      parsedValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      parsedValue = parseFloat(value) || 0;
    }

    setPreviewProduct({ ...previewProduct, [name]: parsedValue });
  };

  const handleLiveArrayChange = (key: 'features' | 'tags', value: string) => {
    if (!previewProduct) return;
    setPreviewProduct({
      ...previewProduct,
      [key]: value.split('\n'),
    });
  };

  const handleLiveImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!previewProduct) return;
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Uploading new image...');
    try {
      const imageUrl = await uploadImage(file);
      setPreviewProduct({ ...previewProduct, image: imageUrl });
      toast.success('Image updated in preview!');
    } catch (err) {
      toast.error('Upload failed.');
    } finally {
      toast.dismiss(toastId);
    }
  };

  // 3. Actions
  const handleSaveChanges = async () => {
    if (!previewProduct || !originalProduct) return;
    setIsSaving(true);
    try {
      const updated = await updateProduct(originalProduct.id, previewProduct);
      setOriginalProduct(updated);
      setPreviewProduct(updated);
      setIsEditing(false);
      toast.success('Product updated successfully!');
    } catch (error) {
      toast.error('Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setPreviewProduct(originalProduct);
    setIsEditing(false);
    toast('Changes discarded', { icon: '↩️' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onAddToCart = useCallback(() => {
    if (previewProduct) {
      handleAddToCart(previewProduct);
    }
  }, [previewProduct, handleAddToCart]);

  // --- Render ---
  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  if (!previewProduct || !originalProduct) return <ProductNotFound />;

  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen pt-20 pb-12 bg-white dark:bg-brand-dark transition-colors duration-300">
      {/* DYNAMIC PAGE TITLE */}
      <PageMeta title={previewProduct.name} />

      <div className="container mx-auto px-4">
        {/* --- Header & Controls --- */}
        <div className="flex justify-between items-center mb-6">
          <Breadcrumb product={previewProduct} />

          {isAdmin && !isEditing && (
            <button
              onClick={() => {
                setIsEditing(true);
                setTimeout(() => {
                  document
                    .getElementById('admin-editor-panel')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
              className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <FaEdit /> Edit Product
            </button>
          )}
        </div>

        <div
          className={clsx(
            'grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 transition-all duration-300',
            isEditing &&
              'opacity-100 ring-4 ring-blue-500/10 rounded-3xl p-4 bg-blue-50/30 dark:bg-blue-900/5'
          )}
        >
          <ProductImage
            image={previewProduct.image || ''}
            name={previewProduct.name}
          />
          <ProductInformation
            product={previewProduct}
            onAddToCart={onAddToCart}
          />
        </div>

        {/* --- Admin Editor Panel --- */}
        {isAdmin && isEditing && (
          <div id="admin-editor-panel" className="mt-12 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-gray-900 text-white rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg animate-pulse">
                  <FaMagic />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Live Editor</h3>
                  <p className="text-xs text-gray-400">
                    Changes above update instantly. Save to publish.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleCancelEdit}
                  className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <Spinner size="sm" className="border-white" />
                  ) : (
                    <FaSave />
                  )}
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-brand-dark-secondary border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-inner">
              <ProductForm
                product={previewProduct}
                isEditing={true}
                isSubmitting={isSaving}
                onInputChange={handleLiveInputChange}
                onArrayChange={handleLiveArrayChange}
                onImageUpload={handleLiveImageUpload}
                onSubmit={handleSaveChanges}
                onCancel={handleCancelEdit}
              />
            </div>
          </div>
        )}

        {!isEditing && (
          <RelatedProducts
            category={previewProduct.category}
            currentProductId={previewProduct.id}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
