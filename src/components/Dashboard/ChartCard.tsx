import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ResponsiveContainer, LineChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, Line } from 'recharts';
import { CalendarDays, ChevronDown } from 'lucide-react';

interface ChartCardProps {
  className?: string;
}

const initialChartData = [
  { name: 'Mar', closedWon: 65, closedLost: 58 },
  { name: 'Apr', closedWon: 40, closedLost: 30 },
  { name: 'May', closedWon: 82, closedLost: 45 },
  { name: 'Jun', closedWon: 65, closedLost: 5 },
  { name: 'Jul', closedWon: 78, closedLost: 40 },
  { name: 'Aug', closedWon: 30, closedLost: 95 },
];

const leadsCameData = [
  { name: 'Mar', leads: 120 }, { name: 'Apr', leads: 150 }, { name: 'May', leads: 130 },
  { name: 'Jun', leads: 180 }, { name: 'Jul', leads: 160 }, { name: 'Aug', leads: 200 },
];
const totalDealsSizeData = [
  { name: 'Mar', size: 35000 }, { name: 'Apr', size: 28000 }, { name: 'May', size: 42000 },
  { name: 'Jun', size: 30000 }, { name: 'Jul', size: 45000 }, { name: 'Aug', size: 32000 },
];


type FilterType = 'leadsConverted' | 'leadsCame' | 'totalDealsSize';

const dateRanges = [
  { label: 'Last 3 months', value: 'last_3_months' as const },
  { label: 'Last 6 months', value: 'last_6_months' as const },
  { label: 'Last 12 months', value: 'last_12_months' as const },
  { label: 'Year to date', value: 'ytd' as const },
];

const ChartCard: React.FC<ChartCardProps> = ({ className }) => {
  const [activeFilter, setActiveFilter] = React.useState<FilterType>('leadsConverted');
  const [currentChartData, setCurrentChartData] = React.useState<unknown[]>(initialChartData);
  const [selectedDateRange, setSelectedDateRange] = React.useState<(typeof dateRanges)[number]>(dateRanges[1]);

  React.useEffect(() => {
    let data;
    if (activeFilter === 'leadsConverted') {
      data = initialChartData.map(d => ({...d, closedWon: Math.max(0, d.closedWon + Math.floor(Math.random()*20-10)), closedLost: Math.max(0, d.closedLost + Math.floor(Math.random()*20-10)) }));
    } else if (activeFilter === 'leadsCame') {
      data = leadsCameData.map(d => ({...d, leads: Math.max(0, d.leads + Math.floor(Math.random()*30-15)) }));
    } else if (activeFilter === 'totalDealsSize') {
      data = totalDealsSizeData.map(d => ({...d, size: Math.max(0, d.size + Math.floor(Math.random()*10000-5000)) }));
    }
    setCurrentChartData(data || []);
  }, [activeFilter, selectedDateRange]);

  const renderChart = () => {
    if (activeFilter === 'leadsConverted') {
      return (
        <AreaChart data={currentChartData as typeof initialChartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
          <YAxis tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }} axisLine={false} tickLine={false} />
          <RechartsTooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}
            itemStyle={{ color: 'hsl(var(--card-foreground))' }}
            labelStyle={{ color: 'hsl(var(--primary-text))', fontWeight: '600' }}
          />
          <Legend 
            verticalAlign="top" 
            align="left" 
            wrapperStyle={{ paddingBottom: '20px', marginLeft: '-5px' }}
            iconType="square"
            iconSize={10}
            payload={[
                { value: 'Closed won', type: 'line', id: 'closedWon', color: '#34D399' }, // Tailwind green-400
                { value: 'Closed lost', type: 'line', id: 'closedLost', color: '#F87171' }, // Tailwind red-400
            ]}
          />
          <defs>
            <linearGradient id="chartColorWon" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#34D399" stopOpacity={0.05}/>
            </linearGradient>
            <linearGradient id="chartColorLost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F87171" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#F87171" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="closedWon" stroke="#34D399" fillOpacity={1} fill="url(#chartColorWon)" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#34D399', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))' }} />
          <Area type="monotone" dataKey="closedLost" stroke="#F87171" fillOpacity={1} fill="url(#chartColorLost)" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: '#F87171', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))' }} />
        </AreaChart>
      );
    } else if (activeFilter === 'leadsCame') {
      return (
         <LineChart data={currentChartData as typeof leadsCameData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
          <YAxis tickFormatter={(value) => `${value}`} tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }} axisLine={false} tickLine={false} />
          <RechartsTooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}
            formatter={(value: number) => [value, 'Leads']}
          />
          <Line type="monotone" dataKey="leads" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))' }} />
        </LineChart>
      );
    } else if (activeFilter === 'totalDealsSize') {
      return (
        <LineChart data={currentChartData as typeof totalDealsSizeData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={true} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }} axisLine={{ stroke: 'hsl(var(--border))' }} tickLine={{ stroke: 'hsl(var(--border))' }} />
          <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} tick={{ fill: 'hsl(var(--secondary-text))', fontSize: 12 }} axisLine={false} tickLine={false} />
          <RechartsTooltip
            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Total Deal Size']}
          />
          <Line type="monotone" dataKey="size" stroke="hsl(var(--accent-secondary))" strokeWidth={2.5} dot={{ r: 4, strokeWidth: 2, fill: 'hsl(var(--accent-secondary))', stroke: 'hsl(var(--card))' }} activeDot={{ r: 6, strokeWidth: 2, stroke: 'hsl(var(--card))' }} />
        </LineChart>
      );
    }
    return null;
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <CardTitle className="text-lg font-semibold text-primaryText">Leads tracking</CardTitle>
            <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <p className="text-2xl font-bold text-primaryText">680 <span className="text-sm font-normal text-secondaryText">total closed</span></p>
                <p className="text-2xl font-bold text-primaryText">70 <span className="text-sm font-normal text-secondaryText">total lost</span></p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex shrink-0 items-center gap-2 text-secondaryText hover:text-primaryText">
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
        <div className="mt-4 flex space-x-1 rounded-md bg-muted p-1">
          {(['leadsCame', 'leadsConverted', 'totalDealsSize'] as FilterType[]).map((filter) => (
            <Button
              key={filter}
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 justify-center text-xs h-8 font-medium",
                activeFilter === filter
                  ? 'bg-background text-primaryText shadow-sm rounded-sm'
                  : 'text-secondaryText hover:bg-background/60 hover:text-primaryText rounded-sm'
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter === 'leadsCame' && 'Leads came'}
              {filter === 'leadsConverted' && 'Leads Converted'}
              {filter === 'totalDealsSize' && 'Total deals size'}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[300px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
