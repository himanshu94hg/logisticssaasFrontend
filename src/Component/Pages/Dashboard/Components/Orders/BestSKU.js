import React, { useState } from 'react';

const ParentComponent = () => {
    // Dummy data for products including unit sold and revenue
    const dummyData = [
        { name: 'Ethnic School bag for children (24L)', unitSold: 150, revenue: 3000, inStock: true },
        { name: 'Leather jacket for men (S,M,L,XL)', unitSold: 200, revenue: 6000, inStock: true },
        { name: 'Childrens Teddy toy of high quality', unitSold: 80, revenue: 1600, inStock: false },
        { name: 'Orange smart watch dial (24mm)', unitSold: 50, revenue: 1000, inStock: false },
        { name: 'Orange smart watch dial (24mm)', unitSold: 50, revenue: 1500, inStock: false },
        { name: 'Wooden dining table with chairs', unitSold: 120, revenue: 8000, inStock: true },
        { name: 'Wireless headphones with noise cancellation', unitSold: 180, revenue: 9000, inStock: true },
        { name: 'Fitness tracker with heart rate monitor', unitSold: 100, revenue: 2500, inStock: true },
        { name: 'Professional chef knife set', unitSold: 90, revenue: 4000, inStock: true },
        { name: 'Smartphone with latest features', unitSold: 300, revenue: 15000, inStock: true },
        { name: 'Gaming laptop with high-performance specs', unitSold: 250, revenue: 20000, inStock: true },
        { name: 'Stainless steel water bottle', unitSold: 70, revenue: 700, inStock: false },
        { name: 'Portable Bluetooth speaker', unitSold: 120, revenue: 3000, inStock: true },
        { name: 'Indoor plant with decorative pot', unitSold: 60, revenue: 1000, inStock: false },
        { name: 'Leather wallet with RFID blocking', unitSold: 110, revenue: 2200, inStock: true },
        { name: 'Professional camera with lenses', unitSold: 180, revenue: 18000, inStock: true },
        { name: 'Designer sunglasses with UV protection', unitSold: 80, revenue: 1200, inStock: false },
        { name: 'Digital watch with fitness tracking', unitSold: 150, revenue: 3500, inStock: true },
        { name: 'Portable power bank for charging devices', unitSold: 200, revenue: 4000, inStock: true },
        { name: 'Artificial intelligence voice assistant speaker', unitSold: 120, revenue: 5000, inStock: true }
    ];

    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState('unitsSold');

    // Function to handle select change
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Function to sort products based on selected option
    const getSortedProducts = () => {
        if (selectedOption === 'unitsSold') {
            return dummyData.sort((a, b) => b.unitSold - a.unitSold);
        } else if (selectedOption === 'revenue') {
            return dummyData.sort((a, b) => b.revenue - a.revenue);
        }
    };

    return (
        <>
            <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="title mb-0">Best SKU Products</h4>
                    <label>
                        <select value={selectedOption} onChange={handleSelectChange} className="select-field">
                            <option value="unitsSold">Show Top Products by Units Sold</option>
                            <option value="revenue">Show Top Products by Revenue</option>
                        </select>
                    </label>
                </div>
                <div className="table-responsive">
                    <table className="custom-table w-100">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>{selectedOption === 'unitsSold' ? 'Units Sold' : 'Revenue'}</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getSortedProducts().map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{selectedOption === 'unitsSold' ? product.unitSold : "₹ " + product.revenue}</td>
                                    <td className={product.inStock ? 'text-success' : 'text-danger'}>
                                        {product.inStock ? 'In Stock' : 'Out Of Stock'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ParentComponent;
