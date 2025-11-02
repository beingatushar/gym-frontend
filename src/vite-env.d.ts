/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Backend Configuration
  readonly VITE_BACKEND_URL: string;
  readonly VITE_BASE_URL: string;

  // API Configuration
  readonly VITE_PINCODE_API_URL: string;

  // Cloudinary Configuration
  readonly VITE_CLOUDINARY_CLOUD_NAME: string;
  readonly VITE_CLOUDINARY_UPLOAD_PRESET: string;
  readonly VITE_CLOUDINARY_API_URL: string;

  // Cart Configuration
  readonly VITE_MAX_CART_ITEMS: string;
  readonly VITE_MAX_ITEM_QUANTITY: string;
  readonly VITE_CART_LOCALSTORAGE_KEY: string;

  // Contact Configuration
  readonly VITE_CONTACT_PHONE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
