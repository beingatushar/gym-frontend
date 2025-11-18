import React from 'react';
import { FaGoogle, FaQuoteLeft, FaStar } from 'react-icons/fa';

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string; // Now storing ISO date strings (YYYY-MM-DD)
}

// Helper function to calculate dynamic "time ago"
const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }
  return 'just now';
};

// Fixed dates ensure the "time ago" updates automatically in the future
const testimonials: Testimonial[] = [
  {
    name: 'Hales Yadav',
    rating: 5,
    text: 'Best supplement dealers in over all india and 100% original supplement',
    date: '2025-01-15', // Approx 3 months ago relative to roughly now
  },
  {
    name: 'Khanak Goyal',
    rating: 5,
    text: 'Best supplement store on faridabad ❣️. 100% original products and Owner is very humble and kind💕',
    date: '2025-02-10', // Approx 2 months ago
  },
  {
    name: 'Ujjawal Gupta',
    rating: 5,
    text: 'It Is not A Supplement Store It Is A Promise And Genuine And Complete Brand Product Store And Shelly Supplements House Is The Best House Of Support And Love.',
    date: '2025-01-20',
  },
  {
    name: 'Manish Bhardwaj',
    rating: 5,
    text: 'Genuine products, reasonable rates, behaviour like a big brother, gives good advices, love u Shelly bhai ❤️',
    date: '2025-01-05',
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <div className="min-w-[280px] w-[280px] md:w-full bg-white dark:bg-brand-dark-secondary rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex-shrink-0 scroll-snap-align-start flex flex-col">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={
              i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'
            }
            size={14}
          />
        ))}
      </div>
      <FaQuoteLeft className="text-theme-primary/20" size={20} />
    </div>

    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-4 flex-grow">
      "{testimonial.text}"
    </p>

    <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700/50 mt-auto">
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          {testimonial.name}
        </h3>
        {/* Dynamically calculate the date */}
        <span className="text-xs text-gray-400">
          {getRelativeTime(testimonial.date)}
        </span>
      </div>
      <FaGoogle className="text-gray-400" size={14} />
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-brand-dark py-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaGoogle size={20} className="text-theme-primary" />
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight">
              Customer Reviews
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm font-medium">
            <span className="text-yellow-500 font-bold text-lg">4.9</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" size={14} />
              ))}
            </div>
            <span className="text-gray-500 dark:text-gray-400">
              (60+ reviews)
            </span>
          </div>
        </div>

        <div className="text-center mb-10">
          <a
            href="https://maps.app.goo.gl/R1bn221b7L3tfd9g9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white dark:bg-blue-600/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/30 px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-md transition-all duration-300 active:scale-95"
          >
            <FaGoogle size={14} />
            Leave us a Google Review!
          </a>
        </div>

        {/* Mobile: Horizontal Scroll | Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto pb-8 md:pb-0 px-2 -mx-2 md:mx-0 scrollbar-hide snap-x snap-mandatory">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
