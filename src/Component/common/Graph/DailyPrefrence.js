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
import './DailyPrefrence.css'

function DailyPreferences() {
  const [prefData, setPrefData] = useState({});
  
  // useEffect(() => {
  //   axios.get('http://65.2.38.87:8088/api/v1/daily-prefrences/')
  //     .then(response => {
  //       setPrefData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []); 
  // Empty dependency array ensures the effect runs once on component mount

  // const chartData = Object.entries(prefData).map(([key, value]) => ({ name: key, delevery: value }));
  const chartData = Object.entries(prefData).map(([key, value]) => ({ name: key, LateDeliveries: value }));


  return (
    <>
      {/* <h1 className="chart-heading">Daily Preference</h1> */}
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart data={chartData} width={200}>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="name" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#CEDBF2', color: '#0F3C5B' , border:'none', borderRadius:'4px', fontSize:'12px'}} />
          <Legend />
          <Line type="monotone" dataKey="LateDeliveries" strokeWidth="2" stroke="#F31429" activeDot={{ r: 8 }} style={{fontSize:'12px'}} />
          {/* <Line type="monotone" dataKey="LateDeliveries" strokeWidth="2" stroke="#1975C9" activeDot={{ r: 8 }} /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default DailyPreferences;
