import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ActivityItem {
  id: string;
  type: 'seo' | 'cms' | 'crm';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface RecentActivityProps {
  module: 'SEO' | 'CMS' | 'CRM';
}

export function RecentActivity({ module }: RecentActivityProps) {
  const getActivitiesForModule = (): ActivityItem[] => {
    switch (module) {
      case 'SEO':
        return [
          {
            id: '1',
            type: 'seo',
            title: 'Keyword ranking improved',
            description: '"halal certification" moved from position 5 to 3',
            timestamp: '2 hours ago',
            user: { name: 'SEO Manager' },
          },
          {
            id: '2',
            type: 'seo',
            title: 'New backlink acquired',
            description: 'Backlink from islamicfinance.com',
            timestamp: '4 hours ago',
            user: { name: 'SEO Manager' },
          },
          {
            id: '3',
            type: 'seo',
            title: 'Site audit completed',
            description: 'Score improved to 85/100',
            timestamp: '1 day ago',
            user: { name: 'SEO Manager' },
          },
        ];
      case 'CMS':
        return [
          {
            id: '1',
            type: 'cms',
            title: 'Article published',
            description: '"Understanding Halal Certification" published',
            timestamp: '1 hour ago',
            user: { name: 'Content Editor' },
          },
          {
            id: '2',
            type: 'cms',
            title: 'Media uploaded',
            description: '3 new images added to media library',
            timestamp: '3 hours ago',
            user: { name: 'Content Editor' },
          },
          {
            id: '3',
            type: 'cms',
            title: 'Content scheduled',
            description: '"Islamic Finance Principles" scheduled for tomorrow',
            timestamp: '5 hours ago',
            user: { name: 'Content Editor' },
          },
        ];
      case 'CRM':
        return [
          {
            id: '1',
            type: 'crm',
            title: 'New deal created',
            description: 'Halal Certification Package - $5,000',
            timestamp: '30 minutes ago',
            user: { name: 'Sales Rep' },
          },
          {
            id: '2',
            type: 'crm',
            title: 'Contact updated',
            description: 'John Smith status changed to customer',
            timestamp: '2 hours ago',
            user: { name: 'Sales Rep' },
          },
          {
            id: '3',
            type: 'crm',
            title: 'Meeting scheduled',
            description: 'Demo with Global Foods Inc',
            timestamp: '4 hours ago',
            user: { name: 'Sales Rep' },
          },
        ];
      default:
        return [];
    }
  };

  const activities = getActivitiesForModule();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seo':
        return 'bg-blue-100 text-blue-800';
      case 'cms':
        return 'bg-green-100 text-green-800';
      case 'crm':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              {activity.user && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback>
                    {activity.user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium leading-none">
                    {activity.title}
                  </p>
                  <Badge variant="secondary" className={getTypeColor(activity.type)}>
                    {activity.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
