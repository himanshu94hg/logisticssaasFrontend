import React from 'react';

const NoData = ({ label }) => {

    console.log(label, "labellabellabel")

    return (
        <div style={{}}>
            <div style={{ padding: 25, textAlign: 'center', backgroundColor: '#f8d7da', color: '#721c24', fontWeight: "bold", borderRadius: 5 }}>
                <p>{label === undefined || "" || null ? "No data Found!" : label}</p>
            </div>
        </div>
    );
};

export default NoData;
