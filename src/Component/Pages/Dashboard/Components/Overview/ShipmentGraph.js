import axios from 'axios';
import Cookies from 'js-cookie';
import Chart from 'react-apexcharts';
import React, { useEffect, useState } from 'react';
import { BASE_URL_ORDER } from '../../../../../axios/config';
import { customErrorFunction } from '../../../../../customFunction/errorHandling';
import { DUMMY_SHIPMENT_GRAPH } from '../../../../../mockData/dashboardDummyData';

const ShipmentGraph = ({ activeTab }) => {
    const [series, setSeries] = useState([])
    const [options, setOptions] = useState({})
    const authToken = Cookies.get("access_token")
    const isLocalBypass = process.env.REACT_APP_BYPASS_LOGIN === 'true';

    const setChartData = (data, dateLabels) => {
        setSeries(data);
        setOptions(prev => ({
            ...prev,
            chart: { type: 'bar', height: 350 },
            plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
            dataLabels: { enabled: false },
            stroke: { show: true, width: 2, colors: ['transparent'] },
            xaxis: { categories: dateLabels },
            yaxis: { title: { text: 'Count' } },
            fill: { opacity: 1 },
            tooltip: { shared: true, intersect: false, y: { formatter: (val) => val } },
            colors: ['#0A3C66', '#4A9BE3', '#145F9F', '#1975C9', '#9FC4F6', '#7AAEF1', '#0F4A7D'],
        }));
    };

    const fetchData = async () => {
        if (isLocalBypass) {
            setChartData(DUMMY_SHIPMENT_GRAPH.data, DUMMY_SHIPMENT_GRAPH.date);
            return;
        }
        try {
            const response = await axios.get(`${BASE_URL_ORDER}/orders-api/dashboard/overview/shipment-five-days-counter/`, {
                headers: { Authorization: `Bearer ${authToken}` }
            });
            if (response.status == 200) {
                setChartData(response?.data?.data, response?.data?.date);
            }
        } catch (error) {
            customErrorFunction(error)
        }
    };
    
    useEffect(() => {
        if(authToken && activeTab==="Overview"){
            fetchData();
        }
    }, [activeTab]);

    return (
        <>
            <div className='box-shadow shadow-sm p10' style={{ maxHeight: '500px' }}>
                <h4 className='title'>Shipment Overview</h4>
                <div id="chart">

                    <Chart options={options} series={series} type="bar" height={350} />

                </div>
            </div>
        </>
    );
};

export default ShipmentGraph;
