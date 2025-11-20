import React from 'react';
import { FaGoogle, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Hales Yadav',
    text: 'Best supplement dealers in over all india and 100% original supplement.',
    rating: 5,
    date: '2 days ago',
  },
  {
    name: 'Khanak Goyal',
    text: '100% original products and Owner is very humble and kind 💕',
    rating: 5,
    date: '1 week ago',
  },
  {
    name: 'Ujjawal Gupta',
    text: 'It Is not A Supplement Store It Is A Promise. Best House Of Support And Love.',
    rating: 5,
    date: '3 weeks ago',
  },
  {
    name: 'Manish Bhardwaj',
    text: 'Genuine products, reasonable rates, behaviour like a big brother. Love u Shelly bhai ❤️',
    rating: 5,
    date: '1 month ago',
  },
  {
    name: 'Rahul Sharma',
    text: 'Finally a store in Faridabad that sells authentic whey. Verified the codes myself!',
    rating: 5,
    date: '2 days ago',
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
        <p className="text-[10px] text-gray-400">{data.date}</p>
      </div>
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-black/20 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
          <FaGoogle /> Verified Reviews
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

      {/* Infinite Scroll Row 2 (Reverse) */}
      <div className="flex overflow-hidden mt-4">
        <div className="flex animate-marquee-reverse py-4">
          {[...testimonials, ...testimonials].reverse().map((t, i) => (
            <ReviewCard key={`r2-${i}`} data={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
