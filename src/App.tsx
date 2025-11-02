import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Spinner from './components/common/Spinner';
import Layout from './components/common/Layout';

// Lazy loading pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
// const AdminPage = React.lazy(() => import('./pages/AdminPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage'));

const App: React.FC = () => {
  // Define routes in an array to avoid redundancy
  const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/shop', element: <ShopPage /> },
    // { path: "/admin", element: <AdminPage /> },
    { path: '/about', element: <AboutPage /> },
    { path: '/contact', element: <ContactPage /> },
    { path: '/cart', element: <CartPage /> },
    { path: '/product/:productId', element: <ProductPage /> },
  ];

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
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
};

export default App;
