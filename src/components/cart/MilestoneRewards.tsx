import clsx from 'clsx';
import React from 'react';
import { FaCheck, FaGift } from 'react-icons/fa';

export interface Milestone {
  amount: number;
  label: string;
  description?: string;
}

interface MilestoneRewardsProps {
  currentAmount: number;
  milestones: Milestone[];
}

const MilestoneRewards: React.FC<MilestoneRewardsProps> = ({
  currentAmount,
  milestones,
}) => {
  // Sort milestones by amount to ensure correct order
  const sortedMilestones = [...milestones].sort((a, b) => a.amount - b.amount);

  return (
    <div className="w-full bg-white dark:bg-brand-dark-secondary p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8 overflow-hidden relative">
      {/* Header Info */}
      <div className="text-center mb-10 relative z-10">
        {(() => {
          const next = sortedMilestones.find((m) => currentAmount < m.amount);
          if (next) {
            const remaining = next.amount - currentAmount;
            return (
              <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white">
                Add{' '}
                <span className="text-theme-primary">
                  ₹{remaining.toFixed(0)}
                </span>{' '}
                to unlock{' '}
                <span className="text-theme-primary underline decoration-dashed">
                  {next.label}
                </span>
              </h3>
            );
          }
          return (
            <h3 className="text-base sm:text-lg font-black text-green-500 animate-bounce">
              🎉 All Rewards Unlocked!
            </h3>
          );
        })()}
      </div>

      {/* The Tracker */}
      <div className="relative px-0 sm:px-8">
        {/* --- MOBILE VIEW (Vertical Timeline) --- */}
        <div className="sm:hidden relative pl-2">
          {/* Vertical Line Background */}
          <div className="absolute left-[calc(0.5rem+1.25rem-1px)] top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800 -z-10" />

          <div className="flex flex-col gap-8">
            {sortedMilestones.map((milestone, index) => {
              const isUnlocked = currentAmount >= milestone.amount;
              return (
                <div key={index} className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={clsx(
                      'w-10 h-10 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 z-10 bg-white dark:bg-brand-dark-secondary flex-shrink-0',
                      isUnlocked
                        ? 'border-green-500 text-green-500 shadow-md scale-110'
                        : 'border-gray-200 dark:border-gray-700 text-gray-300'
                    )}
                  >
                    {isUnlocked ? <FaCheck size={14} /> : <FaGift size={14} />}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col">
                    <span
                      className={clsx(
                        'text-xs font-bold mb-0.5 transition-colors duration-300',
                        isUnlocked
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400'
                      )}
                    >
                      ₹{milestone.amount}
                    </span>
                    <span
                      className={clsx(
                        'text-sm font-bold uppercase tracking-wider transition-colors duration-300',
                        isUnlocked
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500'
                      )}
                    >
                      {milestone.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- DESKTOP VIEW (Horizontal Bar) --- */}
        <div className="hidden sm:block relative">
          {/* Grey Track */}
          <div className="absolute top-[15px] left-0 w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full" />

          {/* Green Progress Fill */}
          <div
            className="absolute top-[15px] left-0 h-2 bg-gradient-to-r from-theme-primary to-green-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
            style={{
              width: `${Math.min((currentAmount / sortedMilestones[sortedMilestones.length - 1].amount) * 100, 100)}%`,
            }}
          />

          {/* Nodes Container */}
          <div className="flex justify-between w-full relative">
            {sortedMilestones.map((milestone, index) => {
              const isUnlocked = currentAmount >= milestone.amount;
              const positionPercent =
                (milestone.amount /
                  sortedMilestones[sortedMilestones.length - 1].amount) *
                100;

              return (
                <div
                  key={index}
                  className="absolute transform -translate-x-1/2 flex flex-col items-center"
                  style={{ left: `${positionPercent}%`, top: 0 }}
                >
                  {/* Price Label (Top) */}
                  <span
                    className={clsx(
                      'mb-2 text-[10px] sm:text-xs font-bold transition-colors duration-300 bg-white dark:bg-brand-dark-secondary px-1 py-0.5 rounded',
                      isUnlocked
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-400'
                    )}
                  >
                    ₹{milestone.amount}
                  </span>

                  {/* The Dot/Icon */}
                  <div
                    className={clsx(
                      'w-8 h-8 rounded-full flex items-center justify-center border-[3px] transition-all duration-500 z-10 shadow-sm',
                      isUnlocked
                        ? 'bg-green-500 border-green-100 dark:border-green-900 text-white scale-110 shadow-green-200'
                        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-300'
                    )}
                  >
                    {isUnlocked ? <FaCheck size={10} /> : <FaGift size={10} />}
                  </div>

                  {/* Reward Label (Bottom) */}
                  <div className="mt-2 text-center w-24 sm:w-32">
                    <p
                      className={clsx(
                        'text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 leading-tight',
                        isUnlocked
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-400'
                      )}
                    >
                      {milestone.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spacer to give height to the absolute container */}
          <div className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
};

export default MilestoneRewards;
