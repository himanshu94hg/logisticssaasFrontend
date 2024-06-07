import React, { useState } from 'react';

const ChannelsView = () => {
    const integrations = [
        {
            id: 1,
            storeName: 'Store 1',
            channelID: 'Channel_001',
            salesChannel: 'Shopify',
            syncInfo: '2023-01-01',
            connectionStatus: 'Connected',
            channelStatus: 'Active',
            logoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 2,
            storeName: 'Store 2',
            channelID: 'Channel_002',
            salesChannel: 'Amazon',
            syncInfo: '2023-02-15',
            connectionStatus: 'Disconnected',
            channelStatus: 'Inactive',
            logoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 3,
            storeName: 'Store 3',
            channelID: 'Channel_003',
            salesChannel: 'woocommerce',
            syncInfo: '2023-03-01',
            connectionStatus: 'Connected',
            channelStatus: 'Active',
            logoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 4,
            storeName: 'Store 4',
            channelID: 'Channel_004',
            salesChannel: 'Shopify',
            syncInfo: '2023-04-15',
            connectionStatus: 'Disconnected',
            channelStatus: 'Inactive',
            logoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 5,
            storeName: 'Store 5',
            channelID: 'Channel_005',
            salesChannel: 'Amazon',
            syncInfo: '2023-05-01',
            connectionStatus: 'Connected',
            channelStatus: 'Active',
            logoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 6,
            storeName: 'Store 6',
            channelID: 'Channel_006',
            salesChannel: 'woocommerce',
            syncInfo: '2023-06-15',
            connectionStatus: 'Disconnected',
            channelStatus: 'Inactive',
            logoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 7,
            storeName: 'Store 7',
            channelID: 'Channel_007',
            salesChannel: 'Shopify',
            syncInfo: '2023-07-01',
            connectionStatus: 'Connected',
            channelStatus: 'Active',
            logoUrl: 'https://via.placeholder.com/50'
        },
        {
            id: 8,
            storeName: 'Store 8',
            channelID: 'Channel_008',
            salesChannel: 'Amazon',
            syncInfo: '2023-08-15',
            connectionStatus: 'Disconnected',
            channelStatus: 'Inactive',
            logoUrl: 'https://via.placeholder.com/50'
        },
    ];

    return (
        <>
            <div className='view-integration-page'>
                <div className="position-relative">
                    <div className='table-container'>
                        <table className="w-100">
                            <thead className="sticky-header">
                                <tr className="table-row box-shadow">
                                    <th>Store Name/Channel ID</th>
                                    <th>Sales Channel</th>
                                    <th>Sync Info.</th>
                                    <th>Connection Status</th>
                                    <th>Channel Status</th>
                                </tr>
                                <tr className="blank-row"><td></td></tr>
                            </thead>
                            <tbody>
                                {integrations?.map((row, index) => (
                                    <React.Fragment key={row?.id}>
                                        {index > 0 && <tr className="blank-row"><td colSpan="6"></td></tr>}
                                        <tr className='table-row box-shadow'>
                                            <td>
                                                <strong>{row?.storeName}</strong><br />
                                                {row?.channelID}
                                            </td>
                                            <td>
                                                <img src={row?.logoUrl} alt={`${row?.storeName} logo`} width={50} height={50} className='integration-logo me-2' />
                                                {row?.salesChannel}
                                            </td>
                                            <td>
                                                Last sync: {row?.syncInfo}
                                            </td>
                                            <td>
                                                {row?.connectionStatus}
                                            </td>
                                            <td>
                                                {row?.channelStatus}
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

export default ChannelsView;
