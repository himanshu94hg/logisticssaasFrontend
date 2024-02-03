import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';

const pdata = [
  {
    name: 'Python',
    student: 13,
    fees: 10,
  },
  {
    name: 'Javascript',
    student: 15,
    fees: 12,
  },
  {
    name: 'PHP',
    student: 5,
    fees: 10,
  },
  {
    name: 'Java',
    student: 10,
    fees: 5,
  },
  {
    name: 'C#',
    student: 9,
    fees: 4,
  },
  {
    name: 'C++',
    student: 10,
    fees: 8,
  },
];

function CombinedChart() {
  return (
    <ResponsiveContainer width="70%" aspect={3}>
      <ComposedChart
        width={400}
        height={200}
        data={pdata}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
        <Legend />

        {/* Bar chart */}
        <Bar dataKey="student" fill="#8884d8" barSize={20} />
        <Bar dataKey="fees" fill="#82ca9d" barSize={20} />

        {/* Line chart */}
        <Line type="monotone" dataKey="student" stroke="red" strokeWidth={2} />
        {/* <Line type="monotone" dataKey="fees" stroke="green" strokeWidth={2} /> */}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default CombinedChart;
