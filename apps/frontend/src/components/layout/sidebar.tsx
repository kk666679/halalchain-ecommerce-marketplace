'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  FileText,
  Users,
  ChevronLeft,
  ChevronRight,
  Search,
  Settings,
} from 'lucide-react';
import { getAccessibleModules } from '@/lib/rbac';
import { DashboardRole } from '@/types';

interface SidebarProps {
  role: DashboardRole;
  collapsed: boolean;
  onToggle: () => void;
}

const moduleIcons = {
  SEO: Search,
  CMS: FileText,
  CRM: Users,
};

const moduleRoutes = {
  SEO: '/dashboard/seo',
  CMS: '/dashboard/cms',
  CRM: '/dashboard/crm',
};

export function Sidebar({ role, collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const accessibleModules = getAccessibleModules(role);

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-card border-r transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="font-semibold">Dashboard</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {accessibleModules.map((module) => {
          const Icon = moduleIcons[module];
          const route = moduleRoutes[module];
          const isActive = pathname.startsWith(route);

          return (
            <Link key={module} href={route}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  collapsed ? 'px-2' : 'px-3',
                  isActive && 'bg-secondary'
                )}
              >
                <Icon className="h-4 w-4" />
                {!collapsed && (
                  <>
                    <span className="ml-2">{module}</span>
                    {role === 'Admin' && (
                      <Badge variant="outline" className="ml-auto text-xs">
                        Full
                      </Badge>
                    )}
                  </>
                )}
              </Button>
            </Link>
          );
        })}

        {/* Settings - Admin only */}
        {role === 'Admin' && (
          <Link href="/dashboard/settings">
            <Button
              variant={pathname === '/dashboard/settings' ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start',
                collapsed ? 'px-2' : 'px-3'
              )}
            >
              <Settings className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Settings</span>}
            </Button>
          </Link>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            Role: {role}
          </div>
        )}
      </div>
    </div>
  );
}
