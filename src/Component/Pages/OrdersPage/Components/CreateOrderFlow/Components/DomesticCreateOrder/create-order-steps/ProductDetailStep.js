import 'react-toggle/style.css';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const ProductDetailStep = ({ onPrev, onNext, formData, setFormData }) => {
    const [addFieldsStates, setAddFieldsStates] = useState([]);
    const [errors, setErrors] = useState({});
    const validateFormData = () => {
        const newErrors = {};
        formData?.product_details?.forEach((product, index) => {
            if (!product?.product_name?.trim()) {
                newErrors[`product_name_${index}`] = 'Product Name is required!';
            }
            if (typeof product?.quantity !== 'string' || !product?.quantity.trim()) {
                newErrors[`quantity_${index}`] = 'Product Quantity is required!';
            }
            if (!product?.sku?.trim()) {
                newErrors[`sku_${index}`] = 'SKU is required!';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onNextClicked = () => {
        if (validateFormData()) {
            onNext();
        }
    };

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
                { product_name: '', order_type: 'Forward', price: '', quantity: '', sku: '', hsn_code: '', tax_rate: '', discount: '' },
            ],
        });
        setAddFieldsStates([...addFieldsStates, false]);
    };

    const handleRemoveProduct = (index) => {
        if (formData.product_details && formData.product_details.length > 1) {
            const updatedProducts = [...formData.product_details];
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

    useEffect(() => {
        if (!formData.product_details || formData.product_details.length === 0) {
            handleAddProduct();
        } else {
            setAddFieldsStates((prevAddFieldsStates) =>
                prevAddFieldsStates.length === formData.product_details.length ? prevAddFieldsStates : Array(formData.product_details.length).fill(false)
            );
        }
    }, [formData.product_details]);

    const handlePriceValidation = (value, index) => {
        const regex = /^\d{1,4}$/;
        if (!regex.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, [`quantity_${index}`]: 'Please enter(up to 4 digits).' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, [`quantity_${index}`]: '' }));
        }
    };


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
                                        className={`input-field ${errors[`product_name_${index}`] ? 'input-field-error' : ''}`}
                                        placeholder="Enter or search your product name"
                                        type="text"
                                        value={product.product_name}
                                        onChange={(e) => handleChange(e, 'product_name', index)}
                                    />
                                    {errors[`product_name_${index}`] && <span className="custom-error">{errors[`product_name_${index}`]}</span>}
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
                                        <option value="Other">Other</option>
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
                                        type="number" value={product.price} onChange={(e) => handleChange(e, 'price', index)} />
                                </label>
                                {/* Quantity */}
                                <label className='col'>
                                    Quantity
                                    <input
                                        className={`input-field ${errors[`quantity_${index}`] ? 'input-field-error' : ''}`}
                                        placeholder='Enter Product Quantity'
                                        pattern="[0-9]{4}"
                                        onBlur={(e) => handlePriceValidation(e.target.value, index)}
                                        type="number" value={product.quantity} onChange={(e) => handleChange(e, 'quantity', index)} />
                                    {errors[`quantity_${index}`] && <span className="custom-error">{errors[`quantity_${index}`]}</span>}
                                </label>
                                <label className='col-3'>
                                    SKU
                                    <input
                                        type="text"
                                        className={`input-field ${errors[`sku_${index}`] ? 'input-field-error' : ''}`}
                                        value={product.sku}
                                        onChange={(e) => handleChange(e, 'sku', index)}
                                        placeholder='Enter SKU'
                                    />
                                    {errors[`sku_${index}`] && <span className="custom-error">{errors[`sku_${index}`]}</span>}
                                </label>
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
                                        type="number"
                                        className='input-field'
                                        value={product.tax_rate}
                                        onChange={(e) => handleChange(e, 'tax_rate', index)}
                                        placeholder='Enter Tax Rate'
                                    />
                                </label>

                                <label className='col'>
                                    Discount
                                    <input
                                        type="number"
                                        className='input-field'
                                        value={product.discount}
                                        onChange={(e) => handleChange(e, 'discount', index)}
                                        placeholder='Enter Product Discount'
                                    />
                                </label>
                            </div>
                            {formData.product_details.length === 1 ? (
                                <hr />
                            ) : (
                                <>
                                    <div className='d-flex justify-content-end mt-3'>
                                        <button className='btn delete-btn' onClick={() => handleRemoveProduct(index)}>
                                            <FontAwesomeIcon icon={faTrashCan} title='Delete' />
                                        </button>
                                    </div>
                                    <hr className='mt-2' />
                                </>
                            )}
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
                <button className='btn main-button ms-3' onClick={onNextClicked}>Next</button>

            </div>
        </div>
    );
};