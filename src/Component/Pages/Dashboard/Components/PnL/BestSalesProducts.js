import React from 'react';

const BestSalesProducts = () => {
    // Dummy data for demonstration
    const products = [
        { id: 1, name: 'Product 1', sales: 100 },
        { id: 2, name: 'Product 2', sales: 80 },
        { id: 3, name: 'Product 3', sales: 70 },
        { id: 4, name: 'Product 4', sales: 60 },
        { id: 5, name: 'Product 5', sales: 50 },
        { id: 6, name: 'Product 6', sales: 50 },
        { id: 7, name: 'Product 7', sales: 50 },
        { id: 8, name: 'Product 8', sales: 50 },
        { id: 9, name: 'Product 9', sales: 50 },
        { id: 10, name: 'Product 10', sales: 50 },
    ];

    return (
        <div className="box-shadow shadow-sm p10 dashboard-table">
            <h4 className="title">Best Sales Products</h4>
            <div className="table-responsive">
                <table className="custom-table w-100">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Sales (Last 30 days)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.sales}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BestSalesProducts;
