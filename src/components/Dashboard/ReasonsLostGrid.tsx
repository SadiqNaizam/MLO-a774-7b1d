import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ReasonStat {
  id: string;
  percentage: string;
  description: string;
  tooltip?: string;
}

const reasonsData: ReasonStat[] = [
  { id: 'reason1', percentage: '40%', description: 'The proposal is unclear' },
  { id: 'reason2', percentage: '20%', description: 'However venture pursuit' },
  { id: 'reason3', percentage: '10%', description: 'Other' },
  { id: 'reason4', percentage: '30%', description: 'The proposal is unclear' },
];

const StatItem: React.FC<ReasonStat> = ({ percentage, description, tooltip }) => (
  <div>
    <p className="text-3xl font-bold text-primaryText tabular-nums">{percentage}</p>
    <p className="text-sm text-secondaryText mt-1 flex items-center">
      {description}
      {tooltip && (
         <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button className='ml-1 appearance-none border-none bg-transparent p-0 cursor-help flex items-center'>
                     <Info className="h-3 w-3 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-primaryText text-background text-xs p-2 rounded-md shadow-lg">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      )}
    </p>
  </div>
);

interface OtherDataStat {
    id: string;
    value: string;
    label: string;
    tooltip?: string;
}

const otherDataItems: OtherDataStat[] = [
    { id: 'odata1', value: '900', label: 'total leads count' },
    { id: 'odata2', value: '12', label: 'days in average to convert lead' },
    { id: 'odata3', value: '30', label: 'inactive leads', tooltip: 'Inactive leads are those that have not shown activity in the last 30 days.' },
];

const OtherDataItem: React.FC<OtherDataStat> = ({ value, label, tooltip }) => (
  <div>
    <p className="text-3xl font-bold text-primaryText tabular-nums">{value}</p>
    <p className="text-sm text-secondaryText mt-1 flex items-center">
      {label}
      {tooltip && (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <button className='ml-1.5 appearance-none border-none bg-transparent p-0 cursor-help flex items-center'>
                     <Info className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-primaryText text-background text-xs p-2 rounded-md shadow-lg max-w-xs">
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
      )}
    </p>
  </div>
);


interface ReasonsLostGridProps {
  className?: string;
}

const ReasonsLostGrid: React.FC<ReasonsLostGridProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 gap-6 lg:grid-cols-5", className)}>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-primaryText">Reasons of leads lost</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                {reasonsData.map((reason) => (
                    <StatItem key={reason.id} {...reason} />
                ))}
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="text-lg font-semibold text-primaryText">Other data</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-y-8 sm:grid-cols-3 lg:grid-cols-1">
                {otherDataItems.map((item) => (
                    <OtherDataItem key={item.id} {...item} />
                ))}
            </CardContent>
        </Card>
    </div>
  );
};

export default ReasonsLostGrid;
