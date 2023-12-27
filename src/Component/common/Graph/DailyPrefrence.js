import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const pdata = [
  {
    name: 'Python',
    student: 13,
    fees: 10
  },
  {
    name: 'Javascript',
    student: 15,
    fees: 12
  },
  {
    name: 'PHP',
    student: 5,
    fees: 10
  },
  {
    name: 'Java',
    student: 10,
    fees: 5
  },
  {
    name: 'C#',
    student: 9,
    fees: 4
  },
  {
    name: 'C++',
    student: 10,
    fees: 8
  },
];

function DailyPrefrences() {
  return (
    <>
      {/* <h1 className="chart-heading">Daily Prefrence</h1> */}
      <ResponsiveContainer width="100%" aspect={1}>
        <LineChart data={pdata}>
          <CartesianGrid stroke="#ccc" strokeDasharray="10 10" />
          <XAxis dataKey="name" interval={'preserveStartEnd'} tickFormatter={(value) => value} />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: '#E5E3F4', color: '#093A5A' }} />
          <Legend />
          <Line type="monotone" dataKey="student" strokeWidth="3" stroke="#093A5A" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default DailyPrefrences;