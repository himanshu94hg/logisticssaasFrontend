import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CouriersList = () => {
    const [openPanelIndex, setOpenPanelIndex] = useState(null);


    const { serviceAbility } = useSelector(state => state?.toolsSectionReducer)


    const togglePanel = (index) => {
        setOpenPanelIndex(openPanelIndex === index ? null : index);
    };


    return (
        <div className='row mx-0 my-4 gap-0 '>
            {serviceAbility?.map((item, index) => (
                <div key={index} className='col-md-4 box-shadow shadow-sm my-2'>
                    <div className='p-2'>
                        <div
                            onClick={() => togglePanel(index)}
                            className='first'
                        >
                           <span><strong>{item.title}</strong></span>
                           {/* <span> Mode: {item.mode}</span> */}
                        </div>
                        <div className='second'>
                            <ul>
                                <li>Prepaid Delivery {item.mps_enabled ? "" : <span>&#10003;</span>}</li>
                                <li>Cash On Delivery {item.mps_enabled ? "" : <span>&#10003;</span>}</li>
                                <li>Pickups {item.mps_enabled ? "" : <span>&#10003;</span>}</li>
                                <li>Reverse Pickups {item.mps_enabled ? "" : <span>&#10003;</span>}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CouriersList;
