import { CartItem } from '../types/product.types';

export const generateCheckoutMessage = (
  cart: CartItem[],
  address?: {
    name: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
  }
) => {
  // Header with bold and emoji
  let message = '🌟 *MY ORDER DETAILS* 🌟\n\n';

  // Cart Items (with product links)
  message += '🛒 *ITEMS ORDERED:*\n';
  cart.forEach((item, index) => {
    const productLink = `${import.meta.env.VITE_BASE_URL}/product/${item.id}`;
    message += `*${index + 1}. ${item.name}* 🔗 [View Product](${productLink})\n`;
    message += `   └ 📦 Qty: ${item.quantity}\n`;
    message += `   └ 💵 Price: ₹${item.price.toFixed(2)}\n`;
    message += `   └ 💰 Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n\n`;
  });

  // Total Amount (bold + emoji)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  message += `——————————————\n`;
  message += `💳 *TOTAL AMOUNT: ₹${total.toFixed(2)}*\n\n`;

  // Shipping Address (if provided)
  if (address) {
    message += '🏡 *SHIPPING ADDRESS:*\n';
    message += `👤 *Name:* ${address.name}\n`;
    message += `📍 *Address:* ${address.street}, ${address.city}\n`;
    message += `🏙️ *State:* ${address.state} (${address.pincode})\n`;
    message += `📞 *Phone:* ${address.phone}\n\n`;
  }

  // Footer (polite request + emoji)
  message +=
    '📢 *Please confirm my order and let me know the expected delivery date.*\n';
  // message += "⏳ *We'll process it within 24 hours!*\n";
  message += '🙏 *Looking forward to recieve my order!* ❤️';

  return message;
};
