import React, { useState } from 'react';

const CouriersList = () => {
    const [openPanelIndex, setOpenPanelIndex] = useState(null);

    const togglePanel = (index) => {
        setOpenPanelIndex(openPanelIndex === index ? null : index);
    };

    const panels = [
        {
            title: 'Xpressbees',
            mode: 'Surface',
            pointers: {
                L1: { label: 'Prepaid Delivery', status: true },
                L2: { label: 'Cash On Delivery', status: true },
                L3: { label: 'Pickups', status: true },
                L4: { label: 'Reverse Pickups', status: true }
            }
        },
        {
            title: 'Delhivery',
            mode: 'Surface',
            pointers: {
                L1: { label: 'Prepaid Delivery', status: true },
                L2: { label: 'Cash On Delivery', status: true },
                L3: { label: 'Pickups', status: true },
                L4: { label: 'Reverse Pickups', status: true }
            }
        },
        {
            title: 'Ecom Express',
            mode: 'Surface',
            pointers: {
                L1: { label: 'Prepaid Delivery', status: true },
                L2: { label: 'Cash On Delivery', status: true },
                L3: { label: 'Pickups', status: true },
                L4: { label: 'Reverse Pickups', status: true }
            }
        }
    ];

    return (
        <div className='row p0 mx-0 gap-3'>
            {panels.map((panel, index) => (
                <div key={index} className='col box-shadow shadow-sm'>
                    <div className=''>
                        <div
                            onClick={() => togglePanel(index)}
                            className='first'
                        >
                            {panel.title}
                            Mode: {panel.mode}
                        </div>
                        {/* {openPanelIndex === index && ( */}
                        <div className='second'>
                            <ul>
                                {Object.entries(panel.pointers).map(([pointerKey, pointer]) => (
                                    <li key={pointerKey}>
                                        {pointer.label} - &#10003;
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* )} */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CouriersList;
