import React from 'react';
import { useSelector } from 'react-redux';
import ReactApexChart from 'react-apexcharts';


const ResponseComparisonChart = () => {
  const ndrResponse =useSelector(state=>state?.dashboardNdrReducer?.responseStatus)
  const ivrData = ndrResponse?.map(data => data?.ivr);
  const whatsappData = ndrResponse?.map(data => data?.whatsapp);
  const manualData = ndrResponse?.map(data => data?.manual);

  const series = [
    {
      name: 'IVR',
      data: ivrData ?? []
    },
    {
      name: 'WhatsApp',
      data: whatsappData ?? []
    },
    {
      name: 'Manual',
      data: manualData ?? []
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'], // Weeks
    },
    yaxis: {
      title: {
        text: 'Orders'
      }
    },
    fill: {
      opacity: 1
    }
  };

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={350} />
      </div>
    </div>
  );
}

const NDRResponse = () => {
  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <div className="row">
          <div className="col">
            <h4 className="title">NDR Response</h4>
            <ResponseComparisonChart />
          </div>
        </div>
      </div>
    </>
  )
}

export default NDRResponse