import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  onToggleSidebar?: () => void;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ onToggleSidebar, className }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-6",
        className
      )}
    >
      <div className="flex items-center">
        {onToggleSidebar && (
          <Button variant="ghost" size="icon" className="mr-4 lg:hidden" onClick={onToggleSidebar}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        )}
        <h1 className="text-2xl font-semibold text-primaryText">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Customer</DropdownMenuItem>
            <DropdownMenuItem>New Proposal</DropdownMenuItem>
            <DropdownMenuItem>New Invoice</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
