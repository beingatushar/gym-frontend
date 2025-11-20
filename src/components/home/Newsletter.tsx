import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPaperPlane } from 'react-icons/fa';
import MagneticButton from '../common/MagneticButton';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Welcome to the inner circle! 🚀');
    setEmail('');
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 bg-theme-primary/5 dark:bg-theme-primary/10">
        <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-brand-dark-secondary border border-gray-200 dark:border-gray-700 p-8 md:p-16 rounded-3xl shadow-2xl text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter">
            DON'T MISS THE <span className="text-theme-primary">GAINS</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto">
            Join 2,000+ athletes receiving exclusive deals, nutrition tips, and
            early access to new drops.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 bg-gray-50 dark:bg-black/30 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-theme-primary outline-none transition-all"
              required
            />
            <MagneticButton className="w-full sm:w-auto">
              <button
                type="submit"
                className="w-full h-full bg-theme-primary text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-theme-primary/30"
              >
                Subscribe <FaPaperPlane size={14} />
              </button>
            </MagneticButton>
          </form>

          <p className="mt-6 text-xs text-gray-400">
            No spam. Unsubscribe anytime. We respect your inbox.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
