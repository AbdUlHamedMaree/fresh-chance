'use client';

import { ResponsiveLine } from '@nivo/line';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface ChartData {
  name: string;
  total: number;
}

export const SalesChart = ({ data }: { data: ChartData[] }) => {
  const lineData = [
    {
      id: 'total',
      data: data.map(item => ({
        x: item.name,
        y: item.total,
      })),
    },
  ];

  return (
    <Card className='col-span-3'>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='h-[350px]'>
          <ResponsiveLine
            data={lineData}
            margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear' }}
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
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
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
