import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const StatusBarChart = () => {
    const { ndrStatus } = useSelector(state => state?.dashboardNdrReducer)
    const [weekNumbers, setWeekNumbers] = useState([]);
    const [delivered, setDelivered] = useState([]);
    const [rto, setRTO] = useState([]);
    const [lost, setLost] = useState([]);
    const [pending, setPending] = useState([]);
  
    useEffect(() => {
      const extractedWeekNumbers = [];
      const extractedDelivered = [];
      const extractedRTO = [];
      const extractedLost = [];
      const extractedPending = [];
      ndrStatus?.forEach(item => {
        extractedWeekNumbers.push("Week "+item.week_number);
        extractedDelivered.push(item.delivered);
        extractedRTO.push(item.rto);
        extractedPending.push(item.pending);
        extractedLost.push(item.lost);
      });
      setWeekNumbers(extractedWeekNumbers);
      setDelivered(extractedDelivered);
      setRTO(extractedRTO);
      setLost(extractedLost);
      setPending(extractedPending);
    }, [ndrStatus]); 
  
    
    const seriesData = [{
        name: 'Delivered',
        data:delivered
    },
    {
        name: 'RTO',
        data:rto
    },
    {
        name: 'Pending',
        data: pending
    },
    {
        name: 'Reattempt',
        data: lost
    },
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            stackType: '100%'
        },
        plotOptions: {
            bar: {
                horizontal: true,
            },
        },
        stroke: {
            width: 1,
            colors: ['#fff']
        },
        title: {
            text: '',
            style: {
                color: '#333'
            }
        },
        xaxis: {
            categories:weekNumbers,
        },
        tooltip: {
            enabled: true,
            style: {
                fontSize: '12px', 
                color: '#333'     
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40,
            labels: {
                colors: '#333'
            }
        },
        colors: ['#8ec2f1', '#9fe0a7', '#ffeb80', '#fdd7da', '#ac9ce2']
    };

    return (
        <div id="chart">
            <ReactApexChart options={options} series={seriesData} type="bar" height={350} />
        </div>
    );
};
const chartStyles = `
    .apexcharts-datalabel {
        fill: #333 !important; // Change text color here
    }
`;

const NDRStatus = () => {
    useEffect(() => {
        const styleTag = document.createElement('style');
        styleTag.innerHTML = chartStyles;
        document.head.appendChild(styleTag);
    }, []);
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">NDR Status</h4>
                        <StatusBarChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default NDRStatus