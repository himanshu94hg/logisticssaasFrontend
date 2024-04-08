import React, { useEffect, useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const ShipmentPerformance = () => {
  const [data, setData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const { performanceMetrix } = useSelector(state => state?.dashboardShipmentReducer)

  const transformData = (data) => {
    return data.map((zoneData, i) => ({
      week: i,
      FAD: {
        tooltip: 'FAD',
        total: zoneData.fad_orders.fad_orders,
        prepaid: zoneData.fad_orders.prepaid_fad_orders,
        cod: zoneData.fad_orders.cod_fad_orders
      },
      FAT: {
        tooltip: 'FAD',
        total: zoneData.fat_orders.fat_orders,
        prepaid: zoneData.fat_orders.prepaid_fat_orders,
        cod: zoneData.fat_orders.cod_fat_orders
      },

      SAD: {
        tooltip: 'FAD',
        total: zoneData.sad_orders.sad_orders,
        prepaid: zoneData.sad_orders.prepaid_sad_orders,
        cod: zoneData.sad_orders.cod_sad_orders
      },
      TAD: {
        tooltip: 'FAD',
        total: zoneData.tad_orders.tad_orders,
        prepaid: zoneData.tad_orders.prepaid_tad_orders,
        cod: zoneData.tad_orders.cod_tad_orders
      }
    }));
  };


  useEffect(() => {
    if (performanceMetrix) {
      setData(transformData(performanceMetrix));
    }
  }, [performanceMetrix]);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };


  const [keyName, setKeyName] = useState([])

  useEffect(() => {
    if (performanceMetrix && performanceMetrix.length > 0) {
      const capitalizedKeyNames = Object.keys(performanceMetrix[0])
        .filter(key => key !== "zone")
        .map(key => key.replace('_orders', '').split('_').join(' ').toUpperCase());
      setKeyName(capitalizedKeyNames);
    }
  }, [performanceMetrix]);


  return (
    <div className="box-shadow shadow-sm p10 dashboard-table">
      <div className="row">
        <div className="col">
          <h4 className="title">Performance Metrics</h4>
          <div className="table-responsive">
            <table className="custom-table w-100">
              <thead>
                <tr>
                  <th>Counter</th>
                  {performanceMetrix?.map((weekData) => (
                    <th key={weekData.zone}>Zone {weekData.zone}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {keyName?.map((counter, counterIndex) => (
                  <React.Fragment key={counterIndex}>
                    <tr onClick={() => handleRowClick(counterIndex)}>
                      <td>
                        {expandedRow === counterIndex ? <FaAngleUp /> : <FaAngleDown />}
                        <span className='ms-2'>{counter}</span>
                      </td>
                      {data?.map((weekData, weekIndex) => (
                        <td key={weekData.week}>
                          {console.log(data, "this is data")}
                          {weekData[counter]?.total}
                        </td>
                      ))}
                    </tr>
                    {expandedRow === counterIndex && (
                      <>
                        <tr className="prepaid-row">
                          <td>Prepaid</td>
                          {data.map((weekData) => (
                            <td key={weekData.week} className="prepaid-cell">
                              {weekData[counter].prepaid} &#40;{Math.floor((weekData[counter].prepaid / weekData[counter].total) * 100) || 0}%&#41;
                            </td>
                          ))}
                        </tr>
                        <tr className="cod-row">
                          <td>COD</td>
                          {data.map((weekData) => (
                            <td key={weekData.week} className="cod-cell">
                              {weekData[counter].cod} &#40;{Math.floor(((weekData[counter].cod) / weekData[counter].total) * 100) || 0}%&#41;
                            </td>
                          ))}
                        </tr>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentPerformance;
