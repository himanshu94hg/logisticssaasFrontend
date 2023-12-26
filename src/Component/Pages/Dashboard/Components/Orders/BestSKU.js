import React from 'react'

const BestSKU = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10 best-sku-products">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Best SKU Products</h4>
                    </div>
                </div>
                <table>
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
    )
}

export default BestSKU