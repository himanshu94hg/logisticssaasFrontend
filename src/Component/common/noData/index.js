import React from 'react';
import "./nodata.css"
const NoData = ({ label }) => {

    return (
        <div style={{}}>
            <div className='nodata-box' style={{ padding: 25, textAlign: 'center', fontWeight: "bold", borderRadius: 5 }}>
                <p>{label === undefined || "" || null ? "No data Found!" : label}</p>
            </div>
        </div>
    );
};

export default NoData;
