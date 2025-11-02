import React from 'react';
import HeroSection from '../components/common/HeroSection';
import aboutImage from '../assets/about_us.jpg';

const TeamMember: React.FC<{ member: TeamMemberProps }> = ({ member }) => (
  <div className="bg-white dark:bg-brand-dark-secondary rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
    <img
      loading="lazy"
      src={member.image}
      alt={member.name}
      className="w-full h-56 object-cover"
    />
    <div className="p-6 text-center">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {member.name}
      </h3>
      <p className="text-theme-primary font-medium">{member.role}</p>
      <p className="text-gray-600 dark:text-gray-300 mt-4 text-sm">
        {member.description}
      </p>
    </div>
  </div>
);

const AboutPage: React.FC = () => {
  const teamMembers: TeamMemberProps[] = [
    {
      id: 1,
      name: 'Pooja Arora',
      role: 'Founder & CEO',
      image: 'https://i.pravatar.cc/300?u=pooja',
      description:
        'The visionary leader with a passion for creating unique resin crafts and sweet delights.',
    },
    {
      id: 2,
      name: 'Vanshita Arora',
      role: 'Operations Lead',
      image: 'https://i.pravatar.cc/300?u=vanshita',
      description:
        'Vanshita ensures smooth production and delivery, maintaining our high-quality standards.',
    },
    {
      id: 3,
      name: 'Tushar Aggarwal',
      role: 'Web Developer',
      image: 'https://i.pravatar.cc/300?u=tushar',
      description:
        'Tushar crafts our seamless online experience, bringing our creations to the digital world.',
    },
  ];

  return (
    <>
      <HeroSection
        title="Our Story"
        backgroundImage={aboutImage}
        subtitle="Crafting moments of charm and delight since 2023."
      />

      <section className="py-16 bg-white dark:bg-brand-dark">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Welcome to Charming Moments
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Founded by Pooja Arora, Charming Moments believes in recollecting
            and brightening every moment. We specialize in a variety of handmade
            products, including homemade chocolates, candles, resin art, and
            purses, all crafted with love and meticulous attention to detail.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-brand-dark-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

interface TeamMemberProps {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

export default AboutPage;
