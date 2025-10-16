import { DashboardRole, Permission } from '@/types';

export const rolePermissions: Record<DashboardRole, Permission[]> = {
  Admin: [
    { module: 'SEO', actions: ['read', 'write', 'delete'] },
    { module: 'CMS', actions: ['read', 'write', 'delete'] },
    { module: 'CRM', actions: ['read', 'write', 'delete'] },
  ],
  'SEO Manager': [
    { module: 'SEO', actions: ['read', 'write', 'delete'] },
    { module: 'CMS', actions: ['read'] },
  ],
  'Content Editor': [
    { module: 'CMS', actions: ['read', 'write', 'delete'] },
  ],
  'Sales Rep': [
    { module: 'CRM', actions: ['read', 'write', 'delete'] },
  ],
};

export const hasPermission = (role: DashboardRole, module: 'SEO' | 'CMS' | 'CRM', action: string): boolean => {
  const permissions = rolePermissions[role];
  const modulePermission = permissions.find(p => p.module === module);
  return modulePermission ? modulePermission.actions.includes(action) : false;
};

export const getAccessibleModules = (role: DashboardRole): ('SEO' | 'CMS' | 'CRM')[] => {
  return rolePermissions[role].map(p => p.module);
};
