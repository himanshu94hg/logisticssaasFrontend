import React from 'react';
import "./nodata.css"
import noDataFound from '../../../assets/image/noDataFound.png'

const NoData = ({ label }) => {

    return (
        <div style={{}}>
            <div className='nodata-box'>
                {label === undefined || "" || null ?
                    <img src={noDataFound} alt="noDataFound" />
                    : label}
            </div>
        </div>
    );
};

export default NoData;
