import React, { useEffect, useState } from 'react';
import {
  FaBars,
  FaShoppingBag,
  FaSignOutAlt,
  FaTimes,
  FaUser,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/useAuthStore';
import AnnouncementBanner from './AnnouncementBanner'; // Import the new component
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed w-full z-50 top-0 left-0 transition-all duration-300">
      {/* The logic is now encapsulated here */}
      <AnnouncementBanner />

      {/* Compact Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50 py-2'
            : 'bg-white dark:bg-brand-dark py-2 sm:py-4 border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Smaller Logo for Mobile */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-theme-primary to-purple-600 flex-shrink-0"
          >
            SHELLY
            <span className="text-gray-800 dark:text-white">NUTRITION</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative text-sm font-medium transition-colors hover:text-theme-primary ${
                  isActive(to)
                    ? 'text-theme-primary'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {label}
                {isActive(to) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-theme-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Compact Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="scale-90 sm:scale-100">
              <ThemeToggle />
            </div>

            <Link
              to="/cart"
              className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-theme-secondary/50 dark:hover:bg-white/10 transition-all group"
            >
              <FaShoppingBag
                size={16}
                className="text-gray-700 dark:text-gray-200 group-hover:text-theme-primary transition-colors"
              />
            </Link>

            {/* User Profile / Login Button */}
            {isAuthenticated ? (
              <div className="hidden md:block relative group">
                <button className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-200 hover:text-theme-primary transition-colors px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700">
                  <FaUser size={12} />
                  {user?.name.split(' ')[0]}
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="bg-white dark:bg-brand-dark-secondary rounded-xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden p-1">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-bold">
                        Signed in as
                      </p>
                      <p className="text-xs font-medium truncate text-gray-900 dark:text-white">
                        {user?.email}
                      </p>
                    </div>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg m-1"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg m-1 flex items-center gap-2"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex px-5 py-2 text-xs sm:text-sm font-bold text-white bg-theme-primary rounded-full shadow-md hover:opacity-90 transition-all"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-1.5 text-gray-800 dark:text-white active:scale-95 transition-transform"
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMenu}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[75%] max-w-xs bg-white dark:bg-brand-dark shadow-2xl z-50 transform transition-transform duration-300 ease-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-5">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <span className="text-lg font-bold text-theme-primary">Menu</span>
            <button onClick={toggleMenu}>
              <FaTimes size={20} className="text-gray-500" />
            </button>
          </div>

          <nav className="space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={toggleMenu}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(to)
                    ? 'bg-theme-secondary/50 text-theme-primary'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            {!isAuthenticated && (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={toggleMenu}
                  className="flex justify-center py-2.5 rounded-lg border border-theme-primary text-theme-primary text-sm font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleMenu}
                  className="flex justify-center py-2.5 rounded-lg bg-theme-primary text-white text-sm font-bold shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  toggleMenu();
                }}
                className="w-full py-2.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 text-sm font-medium flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
