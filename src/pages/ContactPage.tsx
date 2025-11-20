import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaPhoneAlt,
  FaWhatsapp,
} from 'react-icons/fa';
import contactImage from '../assets/contact.jpeg';
import HeroSection from '../components/common/HeroSection';
import TiltCard from '../components/common/TiltCard'; // Assuming you added this earlier

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    const whatsappMessage = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${import.meta.env.VITE_CONTACT_PHONE}?text=${encodedMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      toast.success('Opening WhatsApp...');
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark">
      <HeroSection
        title="Let's Talk Gains"
        subtitle="Got a question about a product? Need a diet plan? We are here 24/7."
        backgroundImage={contactImage}
      />

      <section className="relative container mx-auto px-4 -mt-24 pb-24 z-20">
        <div className="bg-white dark:bg-brand-dark-secondary rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row">
          {/* Left: Interactive Contact Info (Dark Theme) */}
          <div className="lg:w-5/12 bg-brand-dark text-white p-10 sm:p-12 relative overflow-hidden flex flex-col justify-between">
            {/* Decorative Circles */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-theme-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6">Contact Information</h3>
              <p className="text-gray-400 mb-12 leading-relaxed">
                Visit our store for a personal consultation or drop us a
                message. We reply faster than your pre-workout kicks in.
              </p>

              <div className="space-y-8">
                <TiltCard className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-theme-primary rounded-lg text-white">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Call Us
                      </p>
                      <p className="font-semibold text-lg">+91 93133 03030</p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-theme-primary rounded-lg text-white">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Email Us
                      </p>
                      <p className="font-semibold text-lg">
                        support@shellynutrition.com
                      </p>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-theme-primary rounded-lg text-white">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Visit HQ
                      </p>
                      <p className="font-semibold text-sm leading-snug">
                        1185, Nangla Rd, Ghazipur, Sector 51,
                        <br /> Faridabad, Haryana 121005
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Socials */}
            <div className="relative z-10 mt-12 flex gap-4">
              <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-brand-dark flex items-center justify-center transition-all">
                <FaWhatsapp />
              </button>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div className="lg:w-7/12 p-10 sm:p-16 bg-white dark:bg-brand-dark-secondary">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Send us a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-theme-primary outline-none transition-all dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-theme-primary outline-none transition-all dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-theme-primary outline-none transition-all dark:text-white resize-none"
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-theme-primary text-white font-bold rounded-xl shadow-lg shadow-theme-primary/30 hover:shadow-theme-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'} <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
