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
  const [prefData, setPrefData] = useState([]);
  const apiData = {
    "one_day": 100,
    "one_week": 333,
    "one_month": 444,
    "three_month": 222,
    "six_month": 344,
    "one_year": 82926
  };

  useEffect(() => {
   
    axios.get('http://127.0.0.1:8000/api/v1/daily-prefrences/')
      .then(response => {
        setPrefData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <>
      <h1 className="chart-heading">Daily Preference</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart
          data={apiData}
          width={200}
          height={100}
          margin={{ top: 5, right: 300, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={'preserveStartEnd'}
            tickFormatter={(value) => value + ' Programming'}
          />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: 'yellow' }} />
          <Legend />
          <Line type="monotone" dataKey="student" stroke="red" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="fees" stroke="green" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default DailyPreferences;
