// src/pages/AdminPage.tsx
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useProductStore } from '../stores/useProductStore';
import { Product } from '../types/product.types';
import ProductForm from '../components/ProductForm';
import HeroSection from '../components/common/HeroSection';
import Spinner from '../components/common/Spinner';
import ProductTable from '../components/ProductTable';

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
      const { name, value } = e.target;
      setNewProduct((prev) => ({
        ...prev,
        [name]: valueAsNumber(name, value),
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
