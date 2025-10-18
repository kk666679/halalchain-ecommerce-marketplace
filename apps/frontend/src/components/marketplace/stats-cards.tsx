import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Users, FileText, BarChart3, DollarSign } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  description?: string;
}

function StatsCard({ title, value, change, icon, description }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <div className="flex items-center text-xs text-muted-foreground">
            {change > 0 ? (
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
            )}
            <span className={change > 0 ? 'text-green-500' : 'text-red-500'}>
              {Math.abs(change)}%
            </span>
            <span className="ml-1">from last month</span>
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  module: 'SEO' | 'CMS' | 'CRM';
}

export function StatsCards({ module }: StatsCardsProps) {
  const getStatsForModule = () => {
    switch (module) {
      case 'SEO':
        return [
          {
            title: 'Avg. Position',
            value: '4.2',
            change: -12,
            icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
            description: 'Across tracked keywords',
          },
          {
            title: 'Organic Traffic',
            value: '24.5K',
            change: 8,
            icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            description: 'Monthly visitors',
          },
          {
            title: 'Backlinks',
            value: 142,
            change: 15,
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            description: 'Active backlinks',
          },
        ];
      case 'CMS':
        return [
          {
            title: 'Published Articles',
            value: 47,
            change: 5,
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
            description: 'This month',
          },
          {
            title: 'Page Views',
            value: '89.2K',
            change: 12,
            icon: <BarChart3 className="h-4 w-4 text-muted-foreground" />,
            description: 'Total views',
          },
          {
            title: 'Avg. Read Time',
            value: '3m 24s',
            change: 3,
            icon: <TrendingUp className="h-4 w-4 text-muted-foreground" />,
            description: 'Per article',
          },
        ];
      case 'CRM':
        return [
          {
            title: 'Total Contacts',
            value: 1234,
            change: 7,
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
            description: 'Active leads & customers',
          },
          {
            title: 'Revenue',
            value: '$45.2K',
            change: 23,
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
            description: 'This quarter',
          },
          {
            title: 'Conversion Rate',
            value: '12.5%',
            change: -2,
            icon: <TrendingDown className="h-4 w-4 text-muted-foreground" />,
            description: 'Lead to customer',
          },
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForModule();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}
