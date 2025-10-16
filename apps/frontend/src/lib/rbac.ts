import { MarketplaceRole, Permission } from '@/types';

export const rolePermissions: Record<MarketplaceRole, Permission[]> = {
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

export const hasPermission = (role: MarketplaceRole, module: 'SEO' | 'CMS' | 'CRM', action: string): boolean => {
  const permissions = rolePermissions[role];
  const modulePermission = permissions.find(p => p.module === module);
  return modulePermission ? modulePermission.actions.includes(action) : false;
};

export const getAccessibleModules = (role: MarketplaceRole): ('SEO' | 'CMS' | 'CRM')[] => {
  return rolePermissions[role].map(p => p.module);
};
