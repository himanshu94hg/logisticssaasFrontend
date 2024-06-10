import React, { useState } from 'react';

const OthersView = () => {
    const integrations = [
     
       
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

export default OthersView;
