import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  FileSpreadsheet,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Icon as LucideIcon,
  Briefcase // Placeholder for 'DO' logo
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const mainNavigationItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/customers', label: 'Customers', icon: User },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: FileSpreadsheet },
  { href: '/items', label: 'Items', icon: ShoppingCart },
  { href: '/mail', label: 'Mail', icon: Mail },
  { href: '/shoebox', label: 'Shoebox', icon: Archive },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
];

const secondaryNavigationItems: NavItem[] = [
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
  // The image shows two 'Help' items, adding the second one as per visual
  { href: '/support', label: 'Support', icon: HelpCircle }, 
];

interface SidebarProps {
  className?: string;
  onLinkClick?: () => void; // To close mobile sidebar on navigation
  activePath?: string; // To determine active link, e.g., from router
}

const Sidebar: React.FC<SidebarProps> = ({ className, onLinkClick, activePath = '/dashboard' }) => {
  const NavLink: React.FC<{ item: NavItem; isActive: boolean; onClick?: () => void }> = ({ item, isActive, onClick }) => (
    <a
      href={item.href}
      onClick={onClick}
      className={cn(
        'flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium',
        isActive
          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
          : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:bg-sidebar-accent focus:text-sidebar-accent-foreground'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
      <span>{item.label}</span>
    </a>
  );

  return (
    <div className={cn('flex h-full flex-col bg-sidebar text-sidebar-foreground', className)}>
      {/* Logo/Header */} 
      <div className="flex h-16 flex-shrink-0 items-center border-b border-sidebar-border px-4">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8 text-sidebar-primary" />
          <span className="text-xl font-semibold text-sidebar-foreground">LeadsCo</span>
        </div>
      </div>

      {/* Navigation */} 
      <nav className="flex-1 space-y-1 overflow-y-auto p-4" aria-label="Sidebar">
        <div className="space-y-1">
          {mainNavigationItems.map((item) => (
            <NavLink key={item.label} item={item} isActive={activePath === item.href} onClick={onLinkClick} />
          ))}
        </div>
      </nav>

      {/* Footer Navigation (Help, Settings) */} 
      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="space-y-1">
          {secondaryNavigationItems.map((item) => (
            <NavLink key={item.label} item={item} isActive={activePath === item.href} onClick={onLinkClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
