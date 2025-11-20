import React, { useEffect } from 'react';
import aboutImage from '../assets/about_us.jpg';
import bhavishya_image from '../assets/bhavishya3.png';
import harshit_image from '../assets/harshit.png';
import sonu_image from '../assets/sonu3.jpg';
import tushar_image from '../assets/tushar.png';
import TeamMemberCard from '../components/about/TeamMemberCard';
import Timeline from '../components/about/Timeline';
import HeroSection from '../components/common/HeroSection';

const AboutPage: React.FC = () => {
  // Scroll to top
  useEffect(() => window.scrollTo(0, 0), []);

  const teamMembers = [
    {
      id: 1,
      name: 'Sonu Goyal',
      role: 'CEO & Founder',
      image: sonu_image,
      description:
        'The visionary behind Shelly Nutrition. 15 years of industry leadership and a passion for authentic fitness.',
    },
    {
      id: 2,
      name: 'Bhavishya Goyal',
      role: 'Operations Lead',
      image: bhavishya_image,
      description:
        'Ensures every order is processed with precision and every customer query is resolved instantly.',
    },
    {
      id: 3,
      name: 'Harshit Goyal',
      role: 'Tech Lead',
      image: harshit_image,
      description:
        'Building the digital infrastructure that powers our seamless shopping experience.',
    },
    {
      id: 4,
      name: 'Tushar Aggarwal',
      role: 'Lead Developer',
      image: tushar_image,
      description:
        'Crafting the user interface and ensuring a world-class web performance.',
    },
  ];

  return (
    <div className="bg-white dark:bg-brand-dark min-h-screen">
      <HeroSection
        title="We Are Shelly Nutrition"
        backgroundImage={aboutImage}
        subtitle="More than just a store. We are a movement dedicated to authentic performance."
      />

      {/* Mission Statement */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
            FUELING AMBITION SINCE{' '}
            <span className="text-theme-primary">2010</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Founded by Sonu Goyal, Shelly Nutrition started as a small promise:
            to eradicate fake supplements from the market. Today, we stand as
            Faridabad's most trusted name in health, delivering 100% genuine
            products to athletes across India.
          </p>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="bg-gray-50 dark:bg-black/20 py-24 border-y border-gray-200 dark:border-gray-800">
        <div className="text-center mb-16">
          <span className="text-theme-primary font-bold uppercase tracking-widest">
            Our Journey
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            From Humble Beginnings to Market Leaders
          </h2>
        </div>
        <Timeline />
      </section>

      {/* Team Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">
              Meet The Squad
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              The minds and muscles behind the brand.
            </p>
          </div>
          <div className="h-1 flex-1 bg-gray-100 dark:bg-gray-800 mx-8 rounded-full hidden md:block" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
