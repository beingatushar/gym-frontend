import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaChevronRight } from 'react-icons/fa';

import { Product } from '../types/product.types';
import { useProductStore } from '../stores/useProductStore';
import useCartStore from '../stores/useCartStore';

import Spinner from '../components/common/Spinner';
import ProductInformation from '../components/ProductInformation';
import { ProductCard } from '../components/ProductCard';
import ProductImage from '../components/ProductImage';

const ProductNotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center py-20 min-h-[60vh]">
    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
      Product Not Found
    </h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      Sorry, we couldn't find the product you're looking for.
    </p>
    <Link
      to="/shop"
      className="bg-theme-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition duration-300"
    >
      Continue Shopping
    </Link>
  </div>
);

const Breadcrumb: React.FC<{ product: Product }> = ({ product }) => (
  <nav className="text-sm mb-8 flex items-center space-x-2 text-gray-500 dark:text-gray-400 flex-wrap">
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
    <div className="mt-16 sm:mt-24">
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

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const { getProductById } = useProductStore();
  const { handleAddToCart } = useCartStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on product change
    const loadProduct = async () => {
      if (!productId) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setProduct(null);
        toast.error('Could not load product details.');
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId, getProductById]);

  const onAddToCart = useCallback(() => {
    if (product) {
      handleAddToCart(product);
    }
  }, [product, handleAddToCart]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!product) {
    return <ProductNotFound />;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24 md:pt-32">
      <Breadcrumb product={product} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        <ProductImage image={product.image || ''} name={product.name} />
        <ProductInformation product={product} onAddToCart={onAddToCart} />
      </div>
      <RelatedProducts
        category={product.category}
        currentProductId={product.id}
      />
    </div>
  );
};

export default ProductPage;
