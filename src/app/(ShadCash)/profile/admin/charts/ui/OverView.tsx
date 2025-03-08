'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Order {
  id: string;
  total: number;
  createdAt: string;
}

interface OverviewProps {
  orders: Order[];
}

export function Overview({ orders }: OverviewProps) {
  const monthNames = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  const monthlyTotals = monthNames.map((name) => ({ name, total: 0 }));

  orders.forEach((order) => {
    const date = new Date(order.createdAt);
    const monthIndex = date.getMonth();
    monthlyTotals[monthIndex].total += order.total;
  });

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={monthlyTotals}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
