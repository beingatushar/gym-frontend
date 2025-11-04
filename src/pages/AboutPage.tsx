import React from 'react';
import aboutImage from '../assets/about_us.jpg';
import bhavishya_image from '../assets/bhavishya3.png';
import sonu_image from '../assets/sonu3.jpg';
import HeroSection from '../components/common/HeroSection';

const TeamMember: React.FC<{ member: TeamMemberProps }> = ({ member }) => (
  <div className="bg-white dark:bg-brand-dark-secondary rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
    <img
      loading="lazy"
      src={member.image}
      alt={member.name}
      className="h-56 w-56 object-cover text-center mx-auto"
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
      name: 'Sonu Goyal',
      role: 'Founder & CEO',
      image: sonu_image,
      description:
        'Fitness enthusiast and visionary leader with over 10 years of experience in the fitness industry, dedicated to providing quality gym equipment.',
    },
    {
      id: 2,
      name: 'Bhavishya Goyal',
      role: 'Operations Lead',
      image: bhavishya_image,
      description:
        'Ensures seamless operations and customer satisfaction while maintaining our high standards for quality fitness products and services.',
    },
    {
      id: 3,
      name: 'Harshit Goyal',
      role: 'Web Developer',
      image: 'https://i.pravatar.cc/300?u=harshit',
      description:
        'Creates and maintains our digital platform, delivering an exceptional online shopping experience for fitness enthusiasts worldwide.',
    },
    {
      id: 4,
      name: 'Tushar Aggarwal',
      role: 'Web Developer',
      image: 'https://i.pravatar.cc/300?u=harshit',
      description:
        'Creates and maintains our digital platform, delivering an exceptional online shopping experience for fitness enthusiasts worldwide.',
    },
  ];

  return (
    <>
      <HeroSection
        title="Our Story"
        backgroundImage={aboutImage}
        subtitle="Crafting moments of charm and delight since 2010."
      />

      <section className="py-16 bg-white dark:bg-brand-dark">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Welcome to Shelly Nutrition
          </h2>
          <div className="mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Best Supplement Store in Faridabad with a 4.9/5 Google Rating
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-yellow-500">★★★★★</span>
              <span className="text-gray-600 dark:text-gray-400">
                (4.960 Google reviews)
              </span>
            </div>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Founded by Sonu Goyal, Shelly Nutrition is your trusted partner in
            fitness and wellness. Located in Sector 51, Faridabad, we specialize
            in premium quality supplements and nutritional products designed to
            support your fitness journey. With over a decade of experience in
            the industry, we provide carefully selected supplements, expert
            guidance, and personalized nutrition solutions.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50 dark:bg-brand-dark-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
