import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FunnelStageData {
  name: string;
  value: number;
  budget: number;
  time: string;
  color: string; 
}

interface PieSliceData {
  name: string;
  value: number; 
  percentage?: number; 
  amount?: number; 
  color: string; 
}

export interface StatCardProps {
  title: string;
  mainStat?: string;
  mainStatLabel?: string;
  type: 'funnel' | 'pie';
  data: FunnelStageData[] | PieSliceData[];
  className?: string;
  footerNote?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  mainStat,
  mainStatLabel,
  type,
  data,
  className,
  footerNote,
}) => {
  const renderFunnel = () => {
    const funnelData = data as FunnelStageData[];
    const totalValue = funnelData.reduce((sum, item) => sum + item.value, 0);

    return (
      <div className="space-y-4">
        {mainStat && (
          <div className="mb-4">
            <span className="text-4xl font-bold text-primaryText">{mainStat}</span>
            {mainStatLabel && <span className="ml-2 text-sm text-secondaryText">{mainStatLabel}</span>}
          </div>
        )}
        <div className="relative mb-4 h-5 w-full overflow-hidden rounded-full bg-muted">
          {funnelData.map((stage, index) => {
            const percentageWidth = totalValue > 0 ? (stage.value / totalValue) * 100 : 0;
            let accumulatedWidth = 0;
            for (let i = 0; i < index; i++) {
                accumulatedWidth += (funnelData[i].value / totalValue) * 100;
            }
            return (
              <div
                key={stage.name}
                className={cn("absolute h-full", stage.color)}
                style={{
                  width: `${percentageWidth}%`,
                  left: `${accumulatedWidth}%`,
                }}
              />
            );
          })}
        </div>
        <ul className="space-y-2 text-sm">
          {funnelData.map((stage) => (
            <li key={stage.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={cn("mr-2 inline-block h-3 w-3 rounded-sm", stage.color)} />
                <span className="text-primaryText">{stage.name}</span>
              </div>
              <div className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-6 text-right">
                 <span className="w-10 text-secondaryText text-right tabular-nums">{stage.value}</span>
                 <span className="w-16 text-secondaryText text-right tabular-nums">${stage.budget.toLocaleString()}</span>
                 <span className="w-auto min-w-[80px] text-secondaryText text-right flex items-center justify-end">
                    {stage.time}
                    {stage.name === 'In conversation' && (
                        <TooltipProvider>
                            <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <button className='ml-1 appearance-none border-none bg-transparent p-0 cursor-help flex items-center'>
                                       <Info className="h-3 w-3 text-muted-foreground" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent className="bg-primaryText text-background text-xs p-2 rounded-md shadow-lg">
                                   <p>Average time on this stage</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                 </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderPieChart = () => {
    const pieData = data as PieSliceData[];
    
    return (
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-1/2 h-48 md:h-56 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="80%"
                innerRadius="50%"
                fill="#8884d8"
                dataKey="value"
                stroke="hsl(var(--card))"
                strokeWidth={3}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number, name: string, props: { payload: PieSliceData}) => {
                    return [`$${props.payload.value.toLocaleString()}`, props.payload.name];
                }}
                contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}
                itemStyle={{ color: 'hsl(var(--card-foreground))' }}
                labelStyle={{ color: 'hsl(var(--primary-text))', fontWeight: '600' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 space-y-2 text-sm mt-2 md:mt-0 self-center">
          {pieData.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <span style={{ backgroundColor: entry.color }} className="mr-2 inline-block h-3 w-3 flex-shrink-0 rounded-sm" />
                <span className="text-primaryText truncate" title={entry.name}>{entry.name}</span>
              </div>
              <div className="flex items-center gap-x-2 text-right flex-shrink-0">
                {entry.amount !== undefined && <span className="w-16 text-secondaryText tabular-nums">${entry.amount.toLocaleString()}</span>}
                {entry.value !== undefined && entry.amount === undefined && <span className="w-16 text-secondaryText tabular-nums">${entry.value.toLocaleString()}</span>}
                {entry.percentage !== undefined && <span className="w-10 text-secondaryText tabular-nums">{entry.percentage}%</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return (
    <Card className={cn("w-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primaryText">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {type === 'funnel' && renderFunnel()}
        {type === 'pie' && renderPieChart()}
      </CardContent>
      {footerNote && (
        <CardFooter className="text-xs text-muted-foreground justify-end pt-4">
          <TooltipProvider>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <button className='flex items-center appearance-none border-none bg-transparent p-0 cursor-default'>
                    <Info className="mr-1 h-3 w-3" />
                    {footerNote}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-primaryText text-background text-xs p-2 rounded-md shadow-lg">
                <p>{footerNote}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      )}
    </Card>
  );
};

export default StatCard;
