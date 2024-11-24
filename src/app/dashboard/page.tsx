import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react';
import { OverviewChart } from '@/components/dumb/overview-chart';
import { SalesChart } from '@/components/dumb/sales-chart';

const mockChartData = [
  { name: 'Jan', total: 2400 },
  { name: 'Feb', total: 1398 },
  { name: 'Mar', total: 9800 },
  { name: 'Apr', total: 3908 },
  { name: 'May', total: 4800 },
  { name: 'Jun', total: 3800 },
  { name: 'Jul', total: 4300 },
];

const mockActivityData = [
  { user: 'John Doe', action: 'Created new project', time: '2 hours ago' },
  { user: 'Jane Smith', action: 'Updated dashboard', time: '5 hours ago' },
  { user: 'Mike Johnson', action: 'Completed task', time: '1 day ago' },
  { user: 'Sarah Wilson', action: 'Added new team member', time: '2 days ago' },
];

export default function DashboardPage() {
  return (
    <div className='flex-1 space-y-4 p-8 pt-6'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>$45,231.89</div>
            <p className='text-xs text-muted-foreground'>+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Users</CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+2350</div>
            <p className='text-xs text-muted-foreground'>+180.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Sales</CardTitle>
            <CreditCard className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+12,234</div>
            <p className='text-xs text-muted-foreground'>+19% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Active Now</CardTitle>
            <Activity className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>+573</div>
            <p className='text-xs text-muted-foreground'>+201 since last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <OverviewChart data={mockChartData} />
        <SalesChart data={mockChartData} />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-8'>
            {mockActivityData.map((item, index) => (
              <div key={index} className='flex items-center'>
                <div className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>{item.user}</p>
                  <p className='text-sm text-muted-foreground'>{item.action}</p>
                </div>
                <div className='ml-auto text-sm text-muted-foreground'>{item.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
