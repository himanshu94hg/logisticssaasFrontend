import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function DailyPreferences() {
  const [prefData, setPrefData] = useState({});
  
  useEffect(() => {
    axios.get('http://35.154.133.143/api/v1/daily-prefrences/')
      .then(response => {
        setPrefData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once on component mount

  const chartData = Object.entries(prefData).map(([key, value]) => ({ name: key, delevery: value }));

  return (
    <>
      <h1 className="chart-heading">Daily Preference</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={chartData} width={200} height={100} margin={{ top: 5, right: 300, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#E5E3F4', color: '#093A5A' }} />
          <Legend />
          <Line type="monotone" dataKey="delevery" strokeWidth="3" stroke="#093A5A" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default DailyPreferences;
