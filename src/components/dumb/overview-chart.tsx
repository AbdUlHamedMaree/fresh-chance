'use client';

import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type ChartData = {
  name: string;
  total: number;
};

export type OverviewChartProps = {
  data: ChartData[];
};

export const OverviewChart = ({ data }: OverviewChartProps) => {
  return (
    <Card className='col-span-4'>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[350px]'>
          <ResponsiveBar
            data={data}
            keys={['total']}
            indexBy='name'
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            padding={0.3}
            colors={{ scheme: 'paired' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: '#888888',
                    fontSize: 12,
                  },
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
