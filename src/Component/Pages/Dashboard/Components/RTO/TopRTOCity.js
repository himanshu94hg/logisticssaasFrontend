import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { percentage } from '../../../../../customFunction/functionLogic';

const TopRTOCity = () => {
  const [error] = useState(null);
  const [loading] = useState(false);
  const {rtoTopCity}=useSelector(state=>state?.dashboardRtoReducer)
  const totalValue=rtoTopCity?.reduce((acc,value)=>acc+value.count,0)

  return (
    <>
      <div className="box-shadow shadow-sm p10">
        <h4 className="title">Top RTO - City</h4>
        <div className="row">
          <div className="col">
            <div className="progress-widget">
              {loading ? (
                <p>Loading data...</p>
              ) : error ? (
                <p>{error}</p>
              ) : Array.isArray(rtoTopCity) && rtoTopCity?.length !== undefined && rtoTopCity?.length !== null ? (
                rtoTopCity?.map((cityData, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between">
                      <p className="font12 bold-600 mb-10">{cityData.city_name}</p>
                      <p className="font12 bold-600 mb-10">
                        {cityData.count}
                        <span className="text-gray-light ">{percentage(cityData?.count,totalValue)}</span>
                      </p>
                    </div>
                    <div className="progress mb-15">
                      <div
                        style={{
                          backgroundColor: index % 2 === 0 ? '#1975C9' : '#1975C9',
                          width: `${cityData?.count/totalValue*100}%`,
                        }}
                        role="progressbar"
                        aria-valuenow={cityData?.count/totalValue*100}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopRTOCity;
