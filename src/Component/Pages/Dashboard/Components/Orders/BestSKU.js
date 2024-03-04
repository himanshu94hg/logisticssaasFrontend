import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BestSKU from './BestSKU';

const ParentComponent = () => {
    const [bestSKUData, setBestSKUData] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get('http://dev.shipease.in:8088/api/v1/top-product-sku/')
    //         .then(response => {
    //             console.log('Data:', response.data);
    //             setBestSKUData(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }, []);

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
                        <tr>
                            <td>Ethnic School bag for children (24L)</td>
                            <td className='text-green'>In Stock</td>
                        </tr>
                        <tr>
                            <td>Leather jacket for men (S,M,L,XL)</td>
                            <td className='text-purple'>In Stock</td>
                        </tr>
                        <tr>
                            <td>Childrens Teddy toy of high quality</td>
                            <td className='text-red'>Out Of Stock</td>
                        </tr>
                        <tr>
                            <td>Orange smart watch dial (24mm)</td>
                            <td>Out Of Stock</td>
                        </tr>
                        <tr>
                            <td>Orange smart watch dial (24mm)</td>
                            <td>Out Of Stock</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ParentComponent;
