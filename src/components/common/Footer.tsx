import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: 'https://instagram.com/charmimg_moments',
      icon: <FaInstagram size={24} />,
    },
    { href: 'https://facebook.com', icon: <FaFacebook size={24} /> },
    { href: 'https://twitter.com', icon: <FaTwitter size={24} /> },
  ];

  const QuickLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link to={to} className="hover:text-theme-primary transition-colors">
        {children}
      </Link>
    </li>
  );

  return (
    <footer className="bg-brand-light-secondary dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-theme-primary mb-4">
              Charming Moments
            </h3>
            <p className="max-w-md">
              Handcrafted Elegance & Sweet Delights. Discover our unique
              collection of handmade products.
            </p>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-theme-primary transition-colors"
                  aria-label={`Follow us on ${link.href.split('.com')[0]}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-theme-primary mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <QuickLink to="/">Home</QuickLink>
              <QuickLink to="/shop">Shop</QuickLink>
              <QuickLink to="/about">About Us</QuickLink>
              <QuickLink to="/contact">Contact</QuickLink>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-theme-primary mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>charmingmomentsbypooja310777@gmail.com</li>
              <li>+91 8368580432</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Charming Moments. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
