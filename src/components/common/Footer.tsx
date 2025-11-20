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
    <footer className="bg-brand-light dark:bg-brand-dark pt-20 overflow-hidden relative">
      {/* --- Section 1: Big Type CTA --- */}
      <div className="container mx-auto px-4 mb-24 relative flex items-center justify-center py-12">
        {/* Giant Watermark Text (Absolute Background) */}
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] leading-none font-black text-gray-200 dark:text-gray-800/40 select-none whitespace-nowrap z-0 pointer-events-none">
          SHELLY
        </h1>

        {/* Call to Action Card (Relative Content) */}
        <div className="relative z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full mx-4 transform transition-transform duration-500 hover:scale-[1.02]">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-3">
            Ready to Transform?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-sm sm:text-base font-medium">
            Join the community of 500+ serious athletes trusting us with their
            nutrition.
          </p>
          <Link
            to="/shop"
            className="inline-flex justify-center items-center bg-theme-primary text-white px-8 py-3.5 rounded-full font-bold text-base shadow-lg shadow-theme-primary/30 hover:shadow-theme-primary/50 hover:-translate-y-1 transition-all duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>

      {/* --- Section 2: Main Footer Links --- */}
      <div className="container mx-auto px-4 sm:px-6 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-theme-primary mb-4 flex items-center">
                Shelly Nutrition
                <span className="ml-3 text-[10px] uppercase tracking-wider bg-theme-primary text-white px-2 py-1 rounded-md font-bold">
                  Est. 2010
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed max-w-md">
                Your trusted source for supplement and health products with 15
                years of experience. We offer all-India delivery at the lowest
                rates.
              </p>
              <div className="bg-white dark:bg-brand-dark-secondary border border-gray-100 dark:border-gray-700/50 rounded-xl p-5 shadow-sm">
                <p className="font-bold text-gray-900 dark:text-white mb-1">
                  Visit Our Store
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug">
                  1185, Nangla Rd, near five star cable, Ghazipur, Sector 51,
                  Faridabad, Haryana 121005
                </p>
                <a
                  href="https://maps.app.goo.gl/YQersSvYFmj29fvm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-xs font-bold text-theme-primary hover:underline uppercase tracking-wide"
                >
                  📍 View on Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Explore
            </h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <QuickLink to="/">Home</QuickLink>
              <QuickLink to="/shop">Shop Now</QuickLink>
              <QuickLink to="/about">Our Story</QuickLink>
              <QuickLink to="/contact">Contact Support</QuickLink>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Connect
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919313303030"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-theme-primary group-hover:text-white transition-all duration-300">
                    📞
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium group-hover:text-theme-primary transition-colors">
                    +91 93133 03030
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919313303030"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 group-hover:bg-green-500 group-hover:text-white transition-all duration-300">
                    <FaWhatsapp size={18} />
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 font-medium group-hover:text-green-500 transition-colors">
                    Chat on WhatsApp
                  </span>
                </a>
              </li>
              <li className="pt-2">
                <div className="flex gap-3">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-theme-primary hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-lg"
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
        <div className="border-t border-gray-200 dark:border-gray-700/50 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Shelly Nutrition. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-theme-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-theme-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
