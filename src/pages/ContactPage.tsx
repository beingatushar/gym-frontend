import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPaperPlane } from 'react-icons/fa';
import contactImage from '../assets/contact.jpeg';
import HeroSection from '../components/common/HeroSection';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill all the fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    const whatsappMessage = `Hi! I'm ${name}.\n\nMessage: ${message}\n\nMy email is ${email}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = import.meta.env.VITE_CONTACT_PHONE;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Redirecting to WhatsApp!');
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  const inputStyle =
    'w-full px-4 py-2 border rounded-md shadow-sm transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 focus:border-theme-primary focus:ring-1 focus:ring-theme-primary';
  const labelStyle =
    'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1';

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="bg-white dark:bg-brand-dark-secondary p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
            Get in Touch
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            We'd love to hear from you. Send us a message!
          </p>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name" className={labelStyle}>
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelStyle}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="message" className={labelStyle}>
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you?"
                rows={4}
                className={inputStyle}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 bg-theme-primary text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send via WhatsApp'}
              {!isSubmitting && <FaPaperPlane />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const ContactPage: React.FC = () => (
  <>
    <HeroSection
      title="Contact Us"
      subtitle="We are here to help and answer any question you might have."
      backgroundImage={contactImage}
    />
    <ContactForm />
  </>
);

export default ContactPage;
