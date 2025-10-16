import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Search, FileText, Users, BarChart3, Settings } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  variant?: 'default' | 'outline' | 'secondary';
}

interface QuickActionsProps {
  module: 'SEO' | 'CMS' | 'CRM';
  onAction: (action: string) => void;
}

export function QuickActions({ module, onAction }: QuickActionsProps) {
  const getActionsForModule = (): QuickAction[] => {
    switch (module) {
      case 'SEO':
        return [
          {
            title: 'Add Keywords',
            description: 'Track new keywords',
            icon: <Plus className="h-4 w-4" />,
            action: () => onAction('add-keyword'),
          },
          {
            title: 'Run Audit',
            description: 'Check site health',
            icon: <Search className="h-4 w-4" />,
            action: () => onAction('run-audit'),
          },
          {
            title: 'View Reports',
            description: 'SEO performance',
            icon: <BarChart3 className="h-4 w-4" />,
            action: () => onAction('view-reports'),
          },
        ];
      case 'CMS':
        return [
          {
            title: 'New Article',
            description: 'Create content',
            icon: <Plus className="h-4 w-4" />,
            action: () => onAction('new-article'),
          },
          {
            title: 'Upload Media',
            description: 'Add images/videos',
            icon: <FileText className="h-4 w-4" />,
            action: () => onAction('upload-media'),
          },
          {
            title: 'Content Calendar',
            description: 'Plan publishing',
            icon: <BarChart3 className="h-4 w-4" />,
            action: () => onAction('content-calendar'),
          },
        ];
      case 'CRM':
        return [
          {
            title: 'Add Contact',
            description: 'New lead/customer',
            icon: <Plus className="h-4 w-4" />,
            action: () => onAction('add-contact'),
          },
          {
            title: 'Create Deal',
            description: 'New opportunity',
            icon: <Users className="h-4 w-4" />,
            action: () => onAction('create-deal'),
          },
          {
            title: 'Schedule Meeting',
            description: 'Plan interaction',
            icon: <BarChart3 className="h-4 w-4" />,
            action: () => onAction('schedule-meeting'),
          },
        ];
      default:
        return [];
    }
  };

  const actions = getActionsForModule();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'outline'}
              className="h-auto p-4 flex flex-col items-start space-y-2"
              onClick={action.action}
            >
              <div className="flex items-center space-x-2 w-full">
                {action.icon}
                <span className="font-medium">{action.title}</span>
              </div>
              <span className="text-xs text-muted-foreground text-left">
                {action.description}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
