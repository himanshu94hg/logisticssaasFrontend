import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const ShipmentPerformance = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const data = [
    { week: 1, FAT: { total: 100, prepaid: 80, cod: 20 }, FAD: { total: 80, prepaid: 65, cod: 15 }, SAD: { total: 70, prepaid: 55, cod: 15 }, TAD: { total: 150, prepaid: 120, cod: 30 }, TD: { total: 120, prepaid: 100, cod: 20 } },
    { week: 2, FAT: { total: 110, prepaid: 90, cod: 20 }, FAD: { total: 85, prepaid: 70, cod: 15 }, SAD: { total: 72, prepaid: 58, cod: 14 }, TAD: { total: 155, prepaid: 124, cod: 31 }, TD: { total: 125, prepaid: 105, cod: 20 } },
    { week: 3, FAT: { total: 120, prepaid: 96, cod: 24 }, FAD: { total: 90, prepaid: 72, cod: 18 }, SAD: { total: 75, prepaid: 60, cod: 15 }, TAD: { total: 160, prepaid: 128, cod: 32 }, TD: { total: 130, prepaid: 110, cod: 20 } },
    { week: 4, FAT: { total: 115, prepaid: 92, cod: 23 }, FAD: { total: 88, prepaid: 70, cod: 18 }, SAD: { total: 73, prepaid: 58, cod: 15 }, TAD: { total: 158, prepaid: 126, cod: 32 }, TD: { total: 128, prepaid: 106, cod: 22 } },
    { week: 5, FAT: { total: 105, prepaid: 84, cod: 21 }, FAD: { total: 82, prepaid: 66, cod: 16 }, SAD: { total: 68, prepaid: 54, cod: 14 }, TAD: { total: 145, prepaid: 116, cod: 29 }, TD: { total: 115, prepaid: 96, cod: 19 } },
  ];

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className="box-shadow shadow-sm p10 dashboard-table">
      <div className="row">
        <div className="col">
          <h4 className="title">Weight Profile in Kgs</h4>
          <div className="table-responsive">
            <table className="custom-table w-100">
              <thead>
                <tr>
                  <th>Counter</th>
                  {data.map((weekData) => (
                    <th key={weekData.week}>Week {weekData.week}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {['FAT', 'FAD', 'SAD', 'TAD', 'TD'].map((counter, counterIndex) => (
                  <React.Fragment key={counterIndex}>
                    <tr onClick={() => handleRowClick(counterIndex)}>
                      <td>
                        {expandedRow === counterIndex ? <FaAngleUp /> : <FaAngleDown />}
                        <span className='ms-2'>{counter}</span>
                      </td>
                      {data.map((weekData, weekIndex) => (
                        <td key={weekData.week}>
                          {expandedRow === counterIndex ? weekData[counter].prepaid : weekData[counter].total} &#40;{Math.floor((weekData[counter].total / weekData.TD.total) * 100)}%&#41;
                        </td>
                      ))}
                    </tr>
                    {expandedRow === counterIndex && (
                      <>
                        <tr className="prepaid-row">
                          <td>Prepaid</td>
                          {data.map((weekData) => (
                            <td key={weekData.week} className="prepaid-cell">
                              {weekData[counter].prepaid} &#40;{Math.floor((weekData[counter].prepaid / weekData.TD.total) * 100)}%&#41;
                            </td>
                          ))}
                        </tr>
                        <tr className="cod-row">
                          <td>COD</td>
                          {data.map((weekData) => (
                            <td key={weekData.week} className="cod-cell">
                              {weekData[counter].cod} &#40;{Math.floor(((weekData[counter].cod) / weekData.TD.total) * 100)}%&#41;
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
