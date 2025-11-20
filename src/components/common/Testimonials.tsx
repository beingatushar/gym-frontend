import React from 'react';
import { FaGoogle, FaStar } from 'react-icons/fa';

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

const ReviewCard: React.FC<{ data: (typeof testimonials)[0] }> = ({ data }) => (
  <div className="w-[350px] flex-shrink-0 rounded-2xl bg-white dark:bg-brand-dark-secondary p-6 shadow-sm border border-gray-100 dark:border-gray-800 mx-4">
    <div className="flex justify-between items-start mb-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" size={12} />
        ))}
      </div>
      <FaGoogle className="text-gray-300" />
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3">
      "{data.text}"
    </p>
    <div className="flex items-center gap-3">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-theme-primary to-purple-600 flex items-center justify-center text-white font-bold text-xs">
        {data.name[0]}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white">
          {data.name}
        </h4>
        <p className="text-[10px] text-gray-400">
          {getRelativeTime(data.date)}
        </p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black/20 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
          <a
            href="https://maps.app.goo.gl/R1bn221b7L3tfd9g9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-md"
          >
            <FaGoogle /> Verified Reviews
          </a>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
          Don't just take our word for it.
        </h2>
      </div>

      {/* Infinite Scroll Row 1 */}
      <div className="flex overflow-hidden">
        <div className="flex animate-marquee py-4">
          {[...testimonials, ...testimonials].map((t, i) => (
            <ReviewCard key={`r1-${i}`} data={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
