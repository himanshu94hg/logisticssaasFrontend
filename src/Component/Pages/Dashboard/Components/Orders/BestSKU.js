import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ParentComponent = () => {
    const [selectedOption, setSelectedOption] = useState('unitsSold');
    const { skuProductData } = useSelector(state => state?.dashboardOrderReducer)

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const getSortedProducts = () => {
        if (selectedOption === 'unitsSold') {
            return skuProductData?.sort((a, b) => b?.count - a?.count);
        } else if (selectedOption === 'revenue') {
            return skuProductData?.sort((a, b) => b?.count - a?.count);
        }
    };

    return (
        <>
            <div className="box-shadow shadow-sm p10 top-selling-page dashboard-table">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="title mb-0">Best SKU Products</h4>
                    <label>
                        <select value={selectedOption} onChange={handleSelectChange} className="select-field">
                            <option value="unitsSold">Units Sold</option>
                            <option value="revenue">Revenue</option>
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
                            {Array.isArray(skuProductData) && skuProductData?.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.sku}</td>
                                    <td>{selectedOption === 'unitsSold' ? product.count : "₹ " + product.count}</td>
                                    <td className={product.count > 0 ? 'text-success' : 'text-danger'}>
                                        {product.count > 0 ? 'In Stock' : 'Out Of Stock'}
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
