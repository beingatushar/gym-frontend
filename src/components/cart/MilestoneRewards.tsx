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

  // --- Visual Progress Logic ---
  // We treat the distance between each milestone as equal "visual segments"
  // regardless of the actual price difference. This ensures the dots are always spaced evenly.
  const calculateVisualProgress = () => {
    if (sortedMilestones.length === 0) return 0;

    // If we've passed the last milestone
    if (currentAmount >= sortedMilestones[sortedMilestones.length - 1].amount) {
      return 100;
    }

    // Find which "segment" we are in
    let activeIndex = -1;
    for (let i = 0; i < sortedMilestones.length; i++) {
      if (currentAmount >= sortedMilestones[i].amount) {
        activeIndex = i;
      } else {
        break;
      }
    }

    // Calculate progress within the current segment
    const segmentWidth = 100 / sortedMilestones.length;
    const previousAmount =
      activeIndex === -1 ? 0 : sortedMilestones[activeIndex].amount;
    const nextAmount = sortedMilestones[activeIndex + 1].amount;
    const segmentProgress =
      (currentAmount - previousAmount) / (nextAmount - previousAmount);

    // Base progress (completed segments) + partial progress of current segment
    // We assume the first segment starts at 0% width and the last ends at 100% width?
    // Actually, for a timeline looking bar:
    // Let's map 0 to Start, and 100 to Last Milestone.
    // If there are 3 milestones, they are at 33%, 66%, 100%.

    const percentPerStep = 100 / sortedMilestones.length;
    const basePercent = (activeIndex + 1) * percentPerStep;

    // If we are effectively at "step -1" (before first milestone)
    if (activeIndex === -1) {
      return segmentProgress * percentPerStep;
    }

    // Add the partial of the next step
    // (activeIndex + 1) is the next target index
    return (activeIndex + 1 + segmentProgress) * percentPerStep;
  };

  // Refined Logic:
  // To align with visual nodes placed via Flexbox (justify-between), we need simpler logic or absolute nodes.
  // Let's use a grid/flex layout where each milestone takes up equal space.
  // Actually, the easiest way to make the line match the dots perfecty is to render the line *segments* individually between dots.

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
      <div className="relative px-4 sm:px-8">
        {/* Container for Lines and Dots */}
        <div className="flex items-center justify-between relative z-0">
          {/* The background grey line connecting everything */}
          <div className="absolute top-1/2 left-0 w-full h-1.5 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 rounded-full -z-10" />

          {/* Render Milestones */}
          {sortedMilestones.map((milestone, index) => {
            const isUnlocked = currentAmount >= milestone.amount;
            const isNext =
              !isUnlocked &&
              (index === 0 ||
                currentAmount >= sortedMilestones[index - 1].amount);

            return (
              <div
                key={index}
                className="flex flex-col items-center group relative"
                style={{ width: '100%' }}
              >
                {/* Progress Line Segment (To the left of this dot) */}
                {/* We render a line segment connecting to the Previous dot (or start) */}
                {/* Actually, styling a continuous bar is easier. Let's use the absolute bar approach but fixed logic. */}
              </div>
            );
          })}
        </div>

        {/* Simplified Implementation: Absolute Bar + Flex Dots */}
        <div className="relative">
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
            {/* Fake Start Node (Hidden but used for spacing alignment if needed, usually standard start is 0) */}
            {/* <div className="w-0" />  */}

            {sortedMilestones.map((milestone, index) => {
              // Visual calculations
              const isUnlocked = currentAmount >= milestone.amount;

              // To make the dots align with a percentage-based bar, we need to position them at specific percentages.
              // Flexbox `justify-between` pushes them to edges.
              // A pure percentage left position is more accurate for the bar.
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
