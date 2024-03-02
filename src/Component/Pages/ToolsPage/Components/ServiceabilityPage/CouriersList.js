import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CouriersList = () => {
    const [openPanelIndex, setOpenPanelIndex] = useState(null);


    const { serviceAbility } = useSelector(state => state?.toolsSectionReducer)

    console.log(serviceAbility, "serviceAbility")

    const togglePanel = (index) => {
        setOpenPanelIndex(openPanelIndex === index ? null : index);
    };


    return (
        <div className='row mx-0 mb-4 gap-3'>
            {serviceAbility?.map((panel, index) => (
                <div key={index} className='col-md-4 box-shadow shadow-sm'>
                    <div className='p-2'>
                        <div
                            onClick={() => togglePanel(index)}
                            className='first'
                        >
                          <span>{panel.title}</span>
                           <span> Mode: {panel.mode}</span>
                        </div>
                        <div className='second'>
                            <ul>
                                <li>Prepaid Delivery {panel.mps_enabled ? "" : <span>&#10003;</span>}</li>
                                <li>Cash On Delivery {panel.mps_enabled ? "" : <span>&#10003;</span>}</li>
                                <li>Pickups {panel.mps_enabled ? "" : <span>&#10003;</span>}</li>
                                <li>Reverse Pickups {panel.mps_enabled ? "" : <span>&#10003;</span>}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CouriersList;
