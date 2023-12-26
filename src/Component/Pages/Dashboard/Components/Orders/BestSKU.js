import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BestSKU from './BestSKU';

const ParentComponent = () => {
    const [bestSKUData, setBestSKUData] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/v1/top-product-sku/')
            .then(response => {
                console.log('Data:', response.data);
                setBestSKUData(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <>
            <div className="box-shadow shadow-sm p10 best-sku-products">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Best SKU Products</h4>
                    </div>
                </div>
                <table className="">

                    <tbody>
                        {bestSKUData.map((sku, index) => (
                            <tr key={index}>
                                <td>{sku.product_sku || 'N/A'}</td>
                                <td className="text-green">In Stock</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ParentComponent;
