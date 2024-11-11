import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "./ServiceabilityPage.css"

const CouriersList = () => {
    const [openPanelIndex, setOpenPanelIndex] = useState(null);


    const { serviceAbility } = useSelector(state => state?.toolsSectionReducer)


    const togglePanel = (index) => {
        setOpenPanelIndex(openPanelIndex === index ? null : index);
    };


    return (
        <div className='serviceability-data-card'>
            {serviceAbility?.map((item, index) => (
                <div key={index} className='serviceability-data-card-box box-shadow shadow-sm my-2'>
                    <div className='p-2'>
                        <div
                            onClick={() => togglePanel(index)}
                            className='first'
                        >
                            <img src={item?.image} width={"40px"} height={"40px"} alt="" className='rounded-circle border border-1' />
                            <span className='ps-2'><strong>{item?.title}</strong></span>
                            {/* <span> Mode: {item?.mode}</span> */}
                        </div>
                        <div className='second'>
                            <ul>
                                <li>Prepaid Delivery {<span>&#10003;</span>}</li>
                                <li>Cash On Delivery {item?.reverse_enabled ? <span>&#10007;</span> : <span>&#10003;</span>}</li>
                                <li>Pickups  {<span>&#10003;</span>}</li>
                                <li>Reverse Pickups {item?.reverse_enabled ? <span>&#10003;</span> : <span>&#10007;</span>}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CouriersList;
