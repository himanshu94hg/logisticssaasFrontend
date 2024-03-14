import React from 'react';

const TopVendorsStats = () => {
    // Assuming vendorsData is an array of objects with vendor information and sales data
    const vendorsData = [
        { id: 1, name: 'Vendor 1', sales: 800 },
        { id: 2, name: 'Vendor 2', sales: 800 },
        { id: 3, name: 'Vendor 3', sales: 800 },
        { id: 4, name: 'Vendor 4', sales: 800 },
        { id: 5, name: 'Vendor 5', sales: 800 },
        { id: 6, name: 'Vendor 6', sales: 800 },
        { id: 7, name: 'Vendor 7', sales: 800 },
        { id: 8, name: 'Vendor 8', sales: 800 },
        { id: 9, name: 'Vendor 9', sales: 800 },
        { id: 10, name: 'Vendor 10', sales: 800 },
        // Add more vendor data as needed
    ];

    return (
        <div className="box-shadow shadow-sm p10 dashboard-table">
            <h4 className="title">Top Vendors</h4>
            <div className="table-responsive">
                <table className="custom-table w-100">
                    <thead>
                        <tr>
                            <th>Vendor Name</th>
                            <th>Sales (Last 30 Days)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendorsData.map(vendor => (
                            <tr key={vendor.id}>
                                <td>{vendor.name}</td>
                                <td>{vendor.sales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TopVendorsStats;
