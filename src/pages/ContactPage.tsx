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
import TiltCard from '../components/common/TiltCard';

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

    const phoneNumber = import.meta.env.VITE_CONTACT_PHONE;
    if (!phoneNumber) {
      toast.error('Contact number not configured.');
      return;
    }

    setIsSubmitting(true);

    // 1. Construct the WhatsApp URL
    const whatsappMessage = `*New Inquiry from Website* 🚀\n\n👤 *Name:* ${formData.name}\n📧 *Email:* ${formData.email}\n📝 *Message:* ${formData.message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // 2. Open WhatsApp IMMEDIATELY to avoid popup blockers
    // Using window.open in a sync flow is safer than inside setTimeout
    const newWindow = window.open(whatsappUrl, '_blank');

    // 3. Fallback for mobile if window.open fails or for better mobile UX
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === 'undefined'
    ) {
      window.location.href = whatsappUrl;
    }

    toast.success('Opening WhatsApp...');

    // 4. Reset form after a delay for visual feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark transition-colors duration-300">
      <HeroSection
        title="Let's Talk Gains"
        subtitle="Got a question about a product? Need a diet plan? We are here 24/7."
        backgroundImage={contactImage}
      />

      <section className="relative container mx-auto px-4 -mt-24 pb-24 z-20">
        <div className="bg-white dark:bg-brand-dark-secondary rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row">
          {/* Left: Interactive Contact Info (Dark Theme) */}
          <div className="lg:w-5/12 bg-brand-dark text-white p-10 sm:p-12 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Decorative Background Elements */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-theme-primary/20 rounded-full blur-3xl" />
            <div
              className="absolute bottom-0 left-0 w-full h-full opacity-10 bg-repeat bg-[length:100px_100px] pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              }}
            />

            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-6 tracking-tight">
                Contact Information
              </h3>
              <p className="text-gray-400 mb-12 leading-relaxed">
                Visit our store for a personal consultation or drop us a
                message. We reply faster than your pre-workout kicks in.
              </p>

              <div className="space-y-6">
                <TiltCard className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-theme-primary rounded-lg text-white shadow-lg shadow-theme-primary/30">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Call Us
                      </p>
                      <a
                        href={`tel:+${import.meta.env.VITE_CONTACT_PHONE}`}
                        className="font-semibold text-lg hover:text-theme-primary transition-colors block"
                      >
                        +91 93133 03030
                      </a>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-theme-primary rounded-lg text-white shadow-lg shadow-theme-primary/30">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Email Us
                      </p>
                      <a
                        href="mailto:support@shellynutrition.com"
                        className="font-semibold text-lg hover:text-theme-primary transition-colors block"
                      >
                        support@shelly.com
                      </a>
                    </div>
                  </div>
                </TiltCard>

                <TiltCard className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-theme-primary rounded-lg text-white shadow-lg shadow-theme-primary/30">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                        Visit HQ
                      </p>
                      <p className="font-semibold text-sm leading-snug mt-1">
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
              <a
                href={`https://wa.me/${import.meta.env.VITE_CONTACT_PHONE}`}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div className="lg:w-7/12 p-10 sm:p-16 bg-white dark:bg-brand-dark-secondary">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Send us a Message
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
              Have a specific inquiry? Fill out the form below and we'll get
              back to you on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-theme-primary focus:border-theme-primary outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-theme-primary focus:border-theme-primary outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 ml-1">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-theme-primary focus:border-theme-primary outline-none transition-all text-gray-900 dark:text-white resize-none placeholder-gray-400"
                  placeholder="How can we help you today?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-theme-primary text-white font-bold rounded-xl shadow-lg shadow-theme-primary/30 hover:shadow-theme-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:translate-y-0"
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
