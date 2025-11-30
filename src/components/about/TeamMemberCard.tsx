import React from 'react';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

interface TeamMemberProps {
  member: {
    name: string;
    role: string;
    image: string;
    description: string;
  };
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div className="group relative h-[350px] md:h-[400px] w-full overflow-hidden rounded-3xl bg-gray-100 dark:bg-gray-900 shadow-md">
      {/* Image */}
      <img
        loading="lazy"
        src={member.image}
        alt={member.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

      {/* Text Content - Slides up on hover */}
      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform translate-y-6 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
        <p className="text-theme-primary font-bold uppercase tracking-wider text-xs mb-2">
          {member.role}
        </p>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-none">
          {member.name}
        </h3>

        {/* Reveal Container */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
          <div className="overflow-hidden">
            <p className="text-gray-300 text-sm mt-4 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75">
              {member.description}
            </p>
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
              <button
                className="p-2 bg-white/10 hover:bg-theme-primary text-white rounded-full backdrop-blur-md transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </button>
              <button
                className="p-2 bg-white/10 hover:bg-theme-primary text-white rounded-full backdrop-blur-md transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
