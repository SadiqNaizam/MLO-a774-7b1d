import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const dateRanges = [
  { label: 'Today', value: 'today' as const },
  { label: 'Last 7 days', value: 'last_7_days' as const },
  { label: 'Last 30 days', value: 'last_30_days' as const },
  { label: 'Last 6 months', value: 'last_6_months' as const },
  { label: 'Last 12 months', value: 'last_12_months' as const },
];

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');
  const [selectedDateRange, setSelectedDateRange] = React.useState<(typeof dateRanges)[number]>(dateRanges[3]);

  return (
    <div className={cn("flex flex-col items-start justify-between gap-4 border-b border-border pb-4 md:flex-row md:items-center", className)}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="sales" className="px-4 py-1.5 text-sm data-[state=active]:bg-background data-[state=active]:text-primaryText data-[state=active]:shadow-sm">
            Sales
          </TabsTrigger>
          <TabsTrigger value="leads" className="px-4 py-1.5 text-sm data-[state=active]:bg-background data-[state=active]:text-primaryText data-[state=active]:shadow-sm">
            Leads
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 text-secondaryText hover:text-primaryText">
            <CalendarDays className="h-4 w-4" />
            <span>{selectedDateRange.label}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {dateRanges.map((range) => (
            <DropdownMenuItem
              key={range.value}
              onClick={() => setSelectedDateRange(range)}
              className={cn(selectedDateRange.value === range.value && "bg-accent text-accent-foreground")}
            >
              {range.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default PageHeader;
