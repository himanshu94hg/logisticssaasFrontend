import 'react-toggle/style.css';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faChevronUp, faChevronDown, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const ProductDetailStep = ({ onPrev, onNext, formData, setFormData }) => {
    const [addFieldsStates, setAddFieldsStates] = useState([]);

    const handleChange = (e, field, index) => {
        const updatedProducts = [...formData.product_details];
        updatedProducts[index][field] = e.target.value;
        setFormData({ ...formData, product_details: updatedProducts });
    };

    const handleAddProduct = () => {
        setFormData({
            ...formData,
            product_details: [
                ...(formData.product_details || []),
                { product_name: '', order_type: 'Forward', price: '', product_qty: '1', sku: '', hsn_code: '', tax_rate: '', discount: '' },
            ],
        });
        setAddFieldsStates([...addFieldsStates, false]);
    };

    const handleRemoveProduct = (index) => {
        if (formData.product_details && formData.product_details.length > 1) {
            const updatedProducts = [...formData.products];
            updatedProducts.splice(index, 1);
            setFormData({ ...formData, product_details: updatedProducts });
            const updatedAddFieldsStates = [...addFieldsStates];
            updatedAddFieldsStates.splice(index, 1);
            setAddFieldsStates(updatedAddFieldsStates);
        }
    };

    const handleToggleAddFields = (index) => {
        const updatedAddFieldsStates = [...addFieldsStates];
        updatedAddFieldsStates[index] = !updatedAddFieldsStates[index];
        setAddFieldsStates(updatedAddFieldsStates);
    };

    // Ensure at least one product is initially present
    useEffect(() => {
        if (!formData.product_details || formData.product_details.length === 0) {
            handleAddProduct();
        } else {
            // Initialize addFieldsStates if it's not defined
            setAddFieldsStates((prevAddFieldsStates) =>
                prevAddFieldsStates.length === formData.product_details.length ? prevAddFieldsStates : Array(formData.product_details.length).fill(false)
            );
        }
    }, [formData.product_details]);

    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    <h3 className='mb-4'>Product Details</h3>
                    {formData.product_details?.map((product, index) => (
                        <div key={index}>
                            {formData.product_details.length === 1 ? '' : ''}
                            <div className='row'>
                                <label className='col'>
                                    Product Name
                                    <input
                                        className='input-field'
                                        placeholder="Enter or search your product name"
                                        type="text"
                                        value={product.product_name}
                                        onChange={(e) => handleChange(e, 'product_name', index)}
                                    />
                                </label>
                                <label className='col'>
                                    <span>Product Category <span className='text-gray'>(Optional)</span></span>
                                    <select
                                        className='select-field'
                                        value={product.order_type}
                                        onChange={(e) => handleChange(e, 'order_type', index)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Arts, Crafts & Sewing">Arts, Crafts & Sewing</option>
                                        <option value="Automotive">Automotive</option>
                                        <option value="Baby Products">Baby Products </option>
                                        <option value="Clothing, Shoes & Jewelry">Clothing, Shoes & Jewelry </option>
                                        <option value="Collectibles & Fine Art">Collectibles & Fine Art </option>
                                        <option value="Electronics">Electronics </option>
                                        <option value="Handmade Products">Handmade Products </option>
                                        <option value="Health & Household">Health & Household</option>
                                        <option value="Home & Kitchen">Home & Kitchen</option>
                                        <option value="Industrial & Scientific">Industrial & Scientific </option>
                                        <option value="Office Products">Office Products </option>
                                        <option value="Patio, Lawn & Garden">Patio, Lawn & Garden</option>
                                        <option value="Pet Supplies">Pet Supplies</option>
                                        <option value="Sports & Outdoors">Sports & Outdoors </option>
                                        <option value="Tools & Home Improvement">Tools & Home Improvement</option>
                                        <option value="Toys & Games">Toys & Games</option>
                                    </select>
                                </label>
                            </div>
                            <div className='row mt-3'>
                                {/* SKU */}
                                <label className='col'>
                                    Unit Price
                                    <input
                                        className='input-field'
                                        placeholder="Enter Unit Price"
                                        type="text" value={product.price} onChange={(e) => handleChange(e, 'price', index)} />
                                </label>



                                {/* Quantity */}
                                <label className='col'>
                                    Quantity
                                    <input
                                        className='input-field'
                                        placeholder='Enter Product Quantity'
                                        type="text" value={product.product_qty} onChange={(e) => handleChange(e, 'product_qty', index)} />
                                </label>
                                {/* Quantity */}
                                {/* <label className='col'>
                            Product Category
                            <input
                                className='input-field'
                                placeholder='Enter Product Quantity'
                                type="number" value={formData.product_qty || '1'} onChange={(e) => handleChange(e, 'product_qty')} />
                        </label> */}



                                <label className='col-3'>
                                    SKU
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.sku}
                                        onChange={(e) => handleChange(e, 'sku', index)}
                                        placeholder='Enter SKU'
                                    />
                                </label>
                            </div>

                            <div className="row mt-3">

                            </div>
                            <div className='row mt-4'>
                                <p onClick={() => handleToggleAddFields(index)} className='add-fields-text'>
                                    <span>+ Add HSN Code, Tax Rate and Discount</span>
                                    <span className='text-gray'> (Optional) <FontAwesomeIcon icon={addFieldsStates[index] ? faChevronUp : faChevronDown} /></span>
                                </p>
                            </div>

                            <div className={`row optional-fields ${!addFieldsStates[index] ? 'height-0' : 'open'}`}>
                                <label className='col'>
                                    HSN Code
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.hsn_code}
                                        onChange={(e) => handleChange(e, 'hsn_code', index)}
                                        placeholder='Enter HSN Code'
                                    />
                                </label>

                                <label className='col'>
                                    Tax Rate
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.tax_rate}
                                        onChange={(e) => handleChange(e, 'tax_rate', index)}
                                        placeholder='Enter Tax Rate'
                                    />
                                </label>

                                <label className='col'>
                                    Discount
                                    <input
                                        type="text"
                                        className='input-field'
                                        value={product.discount}
                                        onChange={(e) => handleChange(e, 'discount', index)}
                                        placeholder='Enter Product Discount'
                                    />
                                </label>
                            </div>
                            {formData.product_details.length === 1 ? (<hr />) :
                                (<>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button className='btn delete-btn' onClick={() => handleRemoveProduct(index)}>
                                            <FontAwesomeIcon icon={faTrashCan} title='Delete' />
                                        </button>
                                    </div>
                                    <hr className='mt-2' />
                                </>)}
                        </div>
                    ))}
                    <div className='d-flex justify-content-end'>
                        <div className='add-product-onclick' onClick={handleAddProduct}>
                            <FontAwesomeIcon icon={faPlus} /> Add Product
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex justify-content-end my-3'>
                {/* Add more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={onNext}>Next</button>

            </div>
        </div>
    );
};