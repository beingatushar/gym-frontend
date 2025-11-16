import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/shelly_nutrition',
      icon: <FaInstagram size={16} />,
      label: 'Instagram',
    },
    {
      href: 'https://www.facebook.com/sonu.goyal.75470',
      icon: <FaFacebook size={16} />,
      label: 'Facebook',
    },
    {
      href: 'https://wa.me/919313303030',
      icon: <FaWhatsapp size={16} />,
      label: 'WhatsApp',
    },
  ];

  const QuickLink = ({
    to,
    children,
  }: {
    to: string;
    children: React.ReactNode;
  }) => (
    <li>
      <Link
        to={to}
        className="hover:text-theme-primary transition-all duration-300 hover:translate-x-1 inline-flex items-center"
      >
        {children}
      </Link>
    </li>
  );

  return (
    <footer className="bg-gradient-to-b from-brand-light-secondary to-white dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-theme-primary mb-4 flex items-center">
                Shelly Nutrition
                <span className="ml-2 text-xs bg-theme-primary text-white px-2 py-1 rounded-full">
                  Est. 2010
                </span>
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
                Your trusted source for supplement and health products with 15
                years of experience. We offer all-India delivery at the lowest
                rates.
              </p>
              <div className="bg-white/50 dark:bg-black/20 backdrop-blur-sm rounded-lg p-4 space-y-2">
                <p className="font-medium">Our Location</p>
                <p className="text-sm">
                  1185, Nangla Rd, near five star cable, Ghazipur, Sector 51,
                  Faridabad, Haryana 121005
                </p>
                <a
                  href="https://maps.app.goo.gl/YQersSvYFmj29fvm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 px-4 py-2 bg-white dark:bg-gray-800 text-theme-primary hover:bg-theme-primary hover:text-white rounded-full transition-all duration-300 text-sm font-medium shadow-sm hover:shadow-md"
                >
                  📍 View on Google Maps
                  <span className="text-xs">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-theme-primary">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <QuickLink to="/">Home</QuickLink>
              <QuickLink to="/shop">Shop</QuickLink>
              <QuickLink to="/about">About Us</QuickLink>
              <QuickLink to="/contact">Contact</QuickLink>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-theme-primary">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919313303030"
                  className="inline-flex items-center gap-3 hover:text-theme-primary transition-colors group"
                >
                  <span className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm group-hover:shadow-md transition-all">
                    📞
                  </span>
                  <span>+91 93133 03030</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919313303030"
                  className="inline-flex items-center gap-3 hover:text-theme-primary transition-colors group"
                >
                  <span className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm group-hover:shadow-md transition-all flex items-center justify-center">
                    <FaWhatsapp size={16} />
                  </span>
                  <span>WhatsApp</span>
                </a>
              </li>
              <li className="pt-4">
                <div className="flex gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white dark:bg-gray-800 p-3 rounded-full hover:text-theme-primary hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                      aria-label={`Follow us on ${link.label}`}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-gray-700/50 mt-12 pt-8 text-center text-sm">
          <p className="opacity-75">
            &copy; {new Date().getFullYear()} Shelly Nutrition. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
