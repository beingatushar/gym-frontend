import React, { useState } from 'react';
import { FaBars, FaShoppingBag, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
    <header className="bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md fixed w-full z-50 shadow-sm text-gray-800 dark:text-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-theme-primary">
          Shelly Nutrition
        </Link>
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
            <FaShoppingBag size={24} />
          </Link>
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 dark:text-gray-200 hover:text-theme-primary dark:hover:text-theme-primary focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-brand-dark shadow-lg">
          <nav className="flex flex-col space-y-4 p-6">
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
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
