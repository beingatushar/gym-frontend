import React, { useState } from 'react';
import { FaArrowRight, FaEnvelope, FaLock } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate('/');
    } catch (error) {
      // Error handled in store
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-gray-50 dark:bg-brand-dark relative overflow-hidden">
      {/* Subtle Background Orbs */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-theme-primary/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="w-full max-w-sm relative z-10 p-4">
        <div className="bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-gray-800 rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Please sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400 text-xs" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-theme-primary focus:border-theme-primary text-sm text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400 text-xs" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-1 focus:ring-theme-primary focus:border-theme-primary text-sm text-gray-900 dark:text-white placeholder-gray-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group flex justify-center items-center gap-2 py-2.5 px-4 text-sm font-bold rounded-lg text-white bg-theme-primary hover:opacity-90 transition-all shadow-md disabled:opacity-70 mt-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && (
                <FaArrowRight
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              New here?{' '}
              <Link
                to="/signup"
                className="font-bold text-theme-primary hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
