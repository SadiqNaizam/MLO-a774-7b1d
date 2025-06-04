import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown } from 'lucide-react';

interface HeaderProps {
  pageTitle: string;
  onToggleSidebar: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, onToggleSidebar, className }) => {
  return (
    <header
      className={cn(
        'flex h-16 items-center justify-between border-b border-border bg-background px-4 md:px-6 shrink-0',
        className
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-4 lg:hidden" onClick={onToggleSidebar}>
          <Menu className="h-6 w-6 text-primaryText" />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
        <h1 className="text-2xl font-semibold text-primaryText">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-3">
        {/* You can add more header items here, like notifications or user profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
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

export default Header;
