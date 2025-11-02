import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FaTrash, FaCreditCard } from 'react-icons/fa';

import { useAddressForm } from '../stores/useAddressForm';
import useCartStore from '../stores/useCartStore';

import { generateCheckoutMessage } from '../utils/utils';
import AddressForm from '../components/AddressForm';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const {
    formState,
    errors,
    updateField,
    validate,
    isFetchingPincode,
    pincodeError,
  } = useAddressForm();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  // Example shipping cost and tax rate
  const shippingCost = subtotal > 500 ? 0 : 50;
  const taxRate = 0.05;
  const taxes = subtotal * taxRate;
  const totalPrice = subtotal + shippingCost + taxes;

  const handleCheckout = () => {
    if (!validate()) {
      toast.error('Please fill in all required address details correctly.');
      return;
    }

    const address = {
      name: formState.name.trim(),
      street: `${formState.houseNumber.trim()}, ${formState.area.trim()}`,
      city: formState.city.trim(),
      state: formState.state.trim(),
      pincode: formState.pincode.trim(),
      phone: formState.mobile.trim(),
    };

    const message = generateCheckoutMessage(cart, address);
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile
      ? `whatsapp://send?phone=${import.meta.env.VITE_CONTACT_PHONE}&text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=${import.meta.env.VITE_CONTACT_PHONE}&text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    toast.success('Redirecting to WhatsApp for checkout!');
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-8 tracking-tight">
        Your Shopping Cart
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items & Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-brand-dark-secondary rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={clearCart}
                className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700 font-medium transition"
              >
                <FaTrash /> Clear Cart
              </button>
            </div>
          </div>
          {/* Order Totals */}
          <div className="bg-white dark:bg-brand-dark-secondary rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Order Totals
            </h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 text-lg border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Address Form */}
        <div className="lg:col-span-1">
          <AddressForm
            formState={formState}
            updateField={updateField}
            errors={errors}
            isFetchingPincode={isFetchingPincode}
            pincodeError={pincodeError}
          />
          <button
            onClick={handleCheckout}
            className="w-full mt-6 flex justify-center items-center gap-3 bg-theme-primary text-white px-6 py-3 rounded-lg hover:opacity-90 transition duration-300 font-semibold shadow-md"
          >
            <FaCreditCard /> Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
