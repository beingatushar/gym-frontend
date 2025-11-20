import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import AddressForm from '../components/AddressForm';
import CartItem from '../components/CartItem';
import EmptyCart from '../components/EmptyCart';
import MilestoneRewards, {
  Milestone,
} from '../components/cart/MilestoneRewards';
import OrderSummary from '../components/cart/OrderSummary';
import PageMeta from '../components/common/PageMeta'; // Import PageMeta

import { useAddressForm } from '../stores/useAddressForm';
import useCartStore from '../stores/useCartStore';
import { generateCheckoutMessage } from '../utils/utils';

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const CART_MILESTONES: Milestone[] = [
    { amount: 4999, label: 'Free Wristband' },
    { amount: 7999, label: 'Shelly T-Shirt' },
    { amount: 9999, label: 'Pro Gym Bag' },
  ];

  const shippingCost = subtotal > 500 ? 0 : 50;
  const taxRate = 0.05;
  const tax = subtotal * taxRate;
  const totalPrice = subtotal + shippingCost + tax;

  const handleCheckout = () => {
    if (!validate()) {
      toast.error('Please fill in all required address details correctly.');
      document
        .getElementById('address-form-section')
        ?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const unlockedRewards = CART_MILESTONES.filter(
      (m) => subtotal >= m.amount
    ).map((m) => m.label);

    const address = {
      name: formState.name.trim(),
      street: `${formState.houseNumber.trim()}, ${formState.area.trim()}`,
      city: formState.city.trim(),
      state: formState.state.trim(),
      pincode: formState.pincode.trim(),
      phone: formState.mobile.trim(),
    };

    let message = generateCheckoutMessage(cart, address);

    if (unlockedRewards.length > 0) {
      message += `\n🎁 *UNLOCKED REWARDS:*\n`;
      unlockedRewards.forEach((r) => (message += `✅ ${r}\n`));
    }

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
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      {/* DYNAMIC TITLE */}
      <PageMeta title="Your Cart" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              Your Cart
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              You have {cart.length} item{cart.length !== 1 ? 's' : ''} in your
              cart
            </p>
          </div>
          <Link
            to="/shop"
            className="text-theme-primary hover:text-theme-primary/80 font-semibold mt-4 sm:mt-0 transition-colors"
          >
            Continue Shopping &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-8">
            <MilestoneRewards
              currentAmount={subtotal}
              milestones={CART_MILESTONES}
            />
            <div className="bg-white dark:bg-brand-dark-secondary rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="p-6 space-y-6">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CartItem
                      item={item}
                      onRemove={removeFromCart}
                      onUpdateQuantity={updateQuantity}
                    />
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 dark:bg-white/5 px-6 py-4 flex justify-end border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={clearCart}
                  className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <FaTrash size={14} /> Clear Entire Cart
                </button>
              </div>
            </div>

            <div
              id="address-form-section"
              className="bg-white dark:bg-brand-dark-secondary rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sm:p-8"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shipping Details
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Where should we send your supplements?
                </p>
              </div>
              <AddressForm
                formState={formState}
                updateField={updateField}
                errors={errors}
                isFetchingPincode={isFetchingPincode}
                pincodeError={pincodeError}
              />
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <OrderSummary
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              total={totalPrice}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
