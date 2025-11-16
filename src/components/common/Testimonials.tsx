import React from 'react';
import { FaGoogle, FaStar } from 'react-icons/fa';

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Hales Yadav',
    rating: 5,
    text: 'Best supplement dealers in over all india and 100% original supplement',
    date: '3 months ago',
  },
  {
    name: 'Khanak Goyal',
    rating: 5,
    text: 'Best supplement store on faridabad ❣️. 100% original products and Owner is very humble and kind💕',
    date: '2 months ago',
  },
  {
    name: 'Ujjawal Gupta',
    rating: 5,
    text: 'It Is not A Supplement Store It Is A Promise And Genuine And Complete Brand Product Store And Shelly Supplements House Is The Best House Of Support And Love.',
    date: '3 months ago',
  },
  {
    name: 'Manish Bhardwaj',
    rating: 5,
    text: 'Genuine products, reasonable rates, behaviour like a big brother, gives good advices, love u Shelly bhai ❤️',
    date: '3 months ago',
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <div className="bg-white dark:bg-brand-dark-secondary rounded-lg shadow-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {testimonial.name}
      </h3>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {testimonial.date}
      </span>
    </div>
    <div className="flex items-center mb-4">
      {[...Array(5)].map((_, i) => (
        <FaStar
          key={i}
          className={
            i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'
          }
          size={16}
        />
      ))}
    </div>
    <p className="text-gray-700 dark:text-gray-300">{testimonial.text}</p>
  </div>
);

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-brand-dark py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaGoogle size={24} className="text-theme-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Customer Reviews
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" size={24} />
              ))}
            </div>
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              4.9/5
            </p>
            <span className="text-gray-500 dark:text-gray-400">
              (60+ reviews)
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
