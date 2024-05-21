import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'

const ProductDetailStep = ({ onPrev, onNext, formData, setFormData, errors, setErrors }) => {
    const [addFieldsStates, setAddFieldsStates] = useState([]);


    /* const onNextClicked = () => {
         if (validateFormData()) {
             if (formData.product_details && formData.product_details.length > 0) {
                 onNext();
             }
         }
     };*/

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

    const handleProductNameChange = (e, index) => {
        const updatedProducts = [...formData.product_details];
        const newProductName = e.target.value;

        updatedProducts[index].product_name = newProductName;

        if (updatedProducts[index].skuCheckboxChecked) {
            updatedProducts[index].sku = newProductName;
        }

        setFormData({ ...formData, product_details: updatedProducts });
    };

    const handleSkuCheckboxChange = (e, index) => {
        const updatedProducts = [...formData.product_details];
        const isChecked = e.target.checked;
        updatedProducts[index].skuCheckboxChecked = isChecked;

        if (isChecked) {
            updatedProducts[index].sku = updatedProducts[index].product_name;
        } else {
            updatedProducts[index].sku = '';
        }

        setFormData({ ...formData, product_details: updatedProducts });
    };



    return (
        <div>
            <div className='box-shadow p10 w-100'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* <h3 className='mb-4'>Product Details</h3> */}
                    {formData.product_details?.map((product, index) => (
                        <div key={index}>
                            {formData.product_details.length === 1 ? '' : ''}
                            <div className='row gap-2'>
                                {/* Name */}
                                <label className='col'>
                                    <span>Product Name <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors[`product_name_${index}`] ? 'input-field-error' : ''}`}
                                        placeholder="Enter your product name"
                                        type="text"
                                        value={product.product_name}
                                        onChange={(e) => handleProductNameChange(e, index)}
                                    />
                                    {errors[`product_name_${index}`] && <span className="custom-error">{errors[`product_name_${index}`]}</span>}
                                </label>
                                {/* Quantity */}
                                <label className='col'>
                                    <span>Quantity <span className='mandatory'>*</span></span>
                                    <input
                                        className={`input-field ${errors[`quantity_${index}`] ? 'input-field-error' : ''}`}
                                        placeholder='Enter Product Quantity'
                                        pattern="[0-9]{4}"
                                        onBlur={(e) => handlePriceValidation(e.target.value, index)}
                                        type="text" value={product.quantity} onChange={(e) => handleChange(e, 'quantity', index) || "1"}
                                        onKeyPress={(e) => {
                                            if (!/\d/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                    {errors[`quantity_${index}`] && <span className="custom-error">{errors[`quantity_${index}`]}</span>}
                                </label>
                                {/* SKU */}
                                <label className='col'>
                                    <span>SKU <span className='mandatory'>*</span></span>
                                    <input
                                        type="text"
                                        className={`input-field ${errors[`sku_${index}`] ? 'input-field-error' : ''}`}
                                        value={product.sku}
                                        onChange={(e) => handleChange(e, 'sku', index)}
                                        placeholder='Enter SKU'
                                    />
                                    {errors[`sku_${index}`] && <span className="custom-error" style={{ display: "block" }}>{errors[`sku_${index}`]}</span>}
                                    <span className='sku-checkbox'>
                                        <input
                                            type="checkbox"
                                            checked={product.skuCheckboxChecked}
                                            onChange={(e) => handleSkuCheckboxChange(e, index)}
                                            style={{ display: "inline" }}
                                        />  Product name as SKU
                                    </span>
                                </label>
                            </div>
                            <div key={index}>
                                {/* Render delete button only if there are more than one product details */}
                                {formData.product_details.length > 1 && (
                                    <>
                                        {/* Conditionally render delete button based on index */}
                                        {index > 0 && (
                                            <div className='d-flex justify-content-end mt-3'>
                                                <button className='btn delete-btn' onClick={() => handleRemoveProduct(index)}>
                                                    <FontAwesomeIcon icon={faTrashCan} title='Delete' />
                                                </button>
                                            </div>
                                        )}
                                        <hr className='mt-4' />
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                    {
                        formData.product_details.length === 1 ? (<hr className='mt-5' />) : ''
                    }
                    <div className='d-flex justify-content-end mt-4'>
                        <div className='add-product-onclick' onClick={handleAddProduct}>
                            <FontAwesomeIcon icon={faPlus} /> Add Product
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetailStep