import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute'; // Import the new component
import Spinner from './components/common/Spinner';

// Lazy loading pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage')); // Make sure this is uncommented
const ProductPage = React.lazy(() => import('./pages/ProductPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));

const App: React.FC = () => {
  return (
    <Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
        }}
      />
      <Suspense
        fallback={
          <div className="flex h-screen items-center justify-center bg-brand-light dark:bg-brand-dark">
            <Spinner />
          </div>
        }
      >
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminPage />} />
            </Route>

            {/* Example: If you wanted a route for any logged-in user (e.g., profile) */}
            {/* <Route element={<ProtectedRoute />}>
                 <Route path="/profile" element={<ProfilePage />} />
               </Route> 
            */}
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
