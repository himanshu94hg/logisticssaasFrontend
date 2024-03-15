import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';

const ForwardReverseOrder = () => {
   const[data1,setData1]=useState([])
   const[data2,setData2]=useState([])
   const[data3,setData3]=useState([])
    const { assignPick } = useSelector(state => state?.dashboardOrderReducer)





    console.log(assignPick, "assignPickassignPick")
    const [series] = useState([
        {
            name: 'Assigned Orders',
            data: data2
        },
        {
            name: 'Picked Orders',
            data: data3
        }
    ]);

    const [options] = useState({
        chart: {
            height: 'auto',
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            type: 'category',
            categories: data1
        },
        colors: ['#1975c9', '#FF5733'], // Change colors for each series
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 300
                    }
                }
            }
        ],
        grid: {
            padding: {
                bottom: 10 // Adjust the bottom padding to accommodate negative margin
            }
        }
    });

    useEffect(() => {
        if (assignPick) {
            const categories = assignPick?.map(item => `Week ${item.week_number}`);
            const assignedData = assignPick?.map(item => item.assigned);
            const pickedData = assignPick?.map(item => item.picked);

            setData1(categories)
            setData2(assignedData)
            setData3(pickedData)
        }
    }, [assignPick])

    return (
        <div className="box-shadow shadow-sm p10">
            <div className="row">
                <div className="col">
                    <h3 className="title">Assigned Orders vs Picked Orders</h3>
                    <div id="chart">
                        <ReactApexChart options={options} series={series} type="bar" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForwardReverseOrder;
