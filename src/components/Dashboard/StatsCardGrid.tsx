import React from 'react';
import { cn } from '@/lib/utils';
import StatCard, { StatCardProps } from './StatCard';

interface StatsCardGridProps {
  className?: string;
}

const funnelCountData: StatCardProps = {
  title: 'Funnel count',
  mainStat: '600',
  mainStatLabel: 'active leads',
  type: 'funnel' as const,
  data: [
    { name: 'Discovery', value: 200, budget: 200, time: '2 days', color: 'bg-red-400' },
    { name: 'Qualified', value: 100, budget: 100, time: '2 days', color: 'bg-yellow-400' },
    { name: 'In conversation', value: 50, budget: 100, time: 'average time on this stage', color: 'bg-indigo-500' },
    { name: 'Negotiations', value: 20, budget: 50, time: '8 days', color: 'bg-green-400' },
    { name: 'Closed won', value: 20, budget: 50, time: '10 days', color: 'bg-purple-500' },
  ],
};

const sourcesData: StatCardProps = {
  title: 'Sources',
  type: 'pie' as const,
  data: [
    { name: 'Clutch', value: 3000, percentage: 50, color: '#F87171' }, // Tailwind red-400
    { name: 'Behance', value: 1000, percentage: 40, color: '#FBBF24' }, // Tailwind amber-400
    { name: 'Instagram', value: 1000, percentage: 10, color: '#34D399' }, // Tailwind green-400
    { name: 'Dribbble', value: 1000, percentage: 10, color: '#A78BFA' }, // Tailwind violet-400 (closer to image's light green/blue)
  ],
  footerNote: 'from leads total',
};


const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2", className)}>
      <StatCard {...funnelCountData} />
      <StatCard {...sourcesData} />
    </div>
  );
};

export default StatsCardGrid;
