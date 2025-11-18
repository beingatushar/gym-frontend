import React, { useState } from 'react';
import {
  FaBars,
  FaShoppingBag,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed w-full z-50">
      {/* 🔹 Moving announcement bar (infinite loop) */}
      <div className="bg-theme-secondary text-black font-semibold text-sm py-2 overflow-hidden relative">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-8">
            ⚡ Big Sale! Get 20% Off on All Protein Supplements Today ⚡
          </span>
          <span className="mx-8">💪 Free Shipping on Orders Above ₹999 💪</span>
          <span className="mx-8">
            🏋️‍♂️ Fuel Your Fitness Journey with Premium Protein 🏋️‍♂️
          </span>
          {/* Duplicate content for smooth looping */}
          <span className="mx-8">
            ⚡ Big Sale! Get 20% Off on All Protein Supplements Today ⚡
          </span>
          <span className="mx-8">💪 Free Shipping on Orders Above ₹999 💪</span>
          <span className="mx-8">
            🏋️‍♂️ Fuel Your Fitness Journey with Premium Protein 🏋️‍♂️
          </span>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md fixed w-full z-50 shadow-sm text-gray-800 dark:text-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-theme-primary">
            Shelly Nutrition
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`transition-all duration-300 hover:text-theme-primary ${
                  isActive(to) ? 'text-theme-primary font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Link
              to="/cart"
              aria-label="Cart"
              className={`p-2 rounded-full transition-colors duration-200 border border-theme-primary ${
                isActive('/cart')
                  ? 'bg-theme-primary text-white'
                  : 'bg-gray-100 dark:bg-brand-dark-secondary text-gray-600 dark:text-gray-300 hover:bg-theme-secondary dark:hover:bg-white/10'
              }`}
            >
              <FaShoppingBag size={20} />
            </Link>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-sm font-medium hover:text-theme-primary transition">
                    <FaUser />
                    {user?.name.split(' ')[0]}
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-brand-dark-secondary rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                    <div className="px-4 py-2 border-b dark:border-gray-700">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Signed in as
                      </p>
                      <p className="font-medium truncate">{user?.email}</p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                    >
                      <FaSignOutAlt size={14} /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-theme-primary border border-theme-primary rounded-full hover:bg-theme-primary hover:text-white transition-all"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-800 dark:text-gray-200 hover:text-theme-primary dark:hover:text-theme-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-brand-dark shadow-lg absolute w-full top-full left-0 border-t dark:border-gray-800">
          <nav className="flex flex-col p-6 space-y-4">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-center py-2 rounded-md transition-all duration-300 ${
                  isActive(to)
                    ? 'bg-theme-primary text-white font-semibold'
                    : 'bg-opacity-10 hover:bg-theme-secondary dark:hover:bg-white/10'
                }`}
                onClick={toggleMenu}
              >
                {label}
              </Link>
            ))}
            <div className="border-t dark:border-gray-700 pt-4 mt-2">
              {isAuthenticated ? (
                <div className="flex flex-col gap-3 items-center">
                  <div className="flex items-center gap-2 font-medium">
                    <FaUser /> {user?.name}
                  </div>
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      onClick={toggleMenu}
                      className="text-sm text-theme-primary"
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="flex items-center gap-2 text-red-500"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="text-center py-2 rounded-lg border border-theme-primary text-theme-primary font-medium hover:bg-theme-primary hover:text-white transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="text-center py-2 rounded-lg bg-theme-primary text-white font-medium hover:opacity-90 transition"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
