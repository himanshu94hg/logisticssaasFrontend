import React, { useState } from 'react';
import NavTabs from './navTabs/NavTabs';

const ViewIntegrations = () => {
    const [activeTab, setActiveTab] = useState("Channel");

    const integrations = {
        Channel: [
            {
                id: 1,
                name: 'Channel Integration 1',
                description: 'Description for Channel Integration 1',
                storeName: 'Store Name',
                date: '2023-01-01',
                status: 'Active',
                logoUrl: 'https://via.placeholder.com/50'
            },
            {
                id: 2,
                name: 'Channel Integration 2',
                description: 'Description for Channel Integration 2',
                storeName: 'Store Name',
                date: '2023-02-15',
                status: 'Inactive',
                logoUrl: 'https://via.placeholder.com/50'
            }
        ],
        OMS: [
            {
                id: 3,
                name: 'OMS Integration 1',
                description: 'Description for OMS Integration 1',
                storeName: 'Store Name',
                date: '2023-03-01',
                status: 'Active',
                logoUrl: 'https://via.placeholder.com/50'
            },
            {
                id: 4,
                name: 'OMS Integration 2',
                description: 'Description for OMS Integration 2',
                storeName: 'Store Name',
                date: '2023-04-15',
                status: 'Inactive',
                logoUrl: 'https://via.placeholder.com/50'
            }
        ],
        Courier: [
            {
                id: 5,
                name: 'Courier Integration 1',
                description: 'Description for Courier Integration 1',
                storeName: 'Store Name',
                date: '2023-05-01',
                status: 'Active',
                logoUrl: 'https://via.placeholder.com/50'
            },
            {
                id: 6,
                name: 'Courier Integration 2',
                description: 'Description for Courier Integration 2',
                storeName: 'Store Name',
                date: '2023-06-15',
                status: 'Inactive',
                logoUrl: 'https://via.placeholder.com/50'
            }
        ],
        Other: [
            {
                id: 7,
                name: 'Other Integration 1',
                description: 'Description for Other Integration 1',
                storeName: 'Store Name',
                date: '1 July 2023',
                status: 'Active',
                logoUrl: 'https://via.placeholder.com/50'
            },
            {
                id: 8,
                name: 'Other Integration 2',
                description: 'Description for Other Integration 2',
                storeName: 'Store Name',
                date: '15 August 2023',
                status: 'Inactive',
                logoUrl: 'https://via.placeholder.com/50'
            }
        ]
    };

    const filteredIntegrations = integrations[activeTab] || [];

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='view-integration-page'>
                <div className="position-relative">
                    <div className='table-container'>
                        <table className="w-100">
                            <tbody>
                                {filteredIntegrations?.map((row, index) => (
                                    <React.Fragment key={row?.id}>
                                        {index > 0 && <tr className="blank-row"><td colSpan="5"></td></tr>}
                                        <tr className='table-row box-shadow'>
                                            <td>
                                                <img src={row?.logoUrl} alt={`${row?.name} logo`} width={50} height={50} className='integration-logo' />
                                            </td>
                                            <td>
                                                <strong>{row?.name}</strong>
                                            </td>
                                            <td>
                                                {row?.description}
                                            </td>
                                            <td>
                                                {row?.date}
                                            </td>
                                            <td>
                                                {row?.status}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewIntegrations;
