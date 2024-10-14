import React, { useState } from 'react';
import './ProductCustomization.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getFileData, uploadImageData } from '../../../../../../awsUploadFile';
import { awsAccessKey } from '../../../../../../config';
import { customErrorFunction } from '../../../../../../customFunction/errorHandling';

const ProductCustomization = ({ settings, setSettings }) => {

    const handleFileUpload = async (e, index) => {
        try {
            const responseData = await getFileData(`brandedTracking/${e.target.files[0].name.replace(/\s/g, "")}`);
            const awsUrl = responseData.data.url.url
            const formData = new FormData();
            formData.append('key', responseData.data.url.fields.key);
            formData.append('file', e.target.files[0]);
            formData.append('AWSAccessKeyId', awsAccessKey);
            formData.append('policy', responseData.data.url.fields.policy);
            formData.append('signature', responseData.data.url.fields["x-amz-signature"]);
            const additionalData = await uploadImageData(awsUrl, formData);
            if (additionalData?.status == 204) {
                const imageUrl = responseData?.data?.url?.url + "brandedTracking/" + e.target.files[0]?.name.replace(/\s/g, "")
                setSettings((prevSettings) => {
                    const updatedProducts = [...prevSettings.products];
                    updatedProducts[index] = {
                        ...updatedProducts[index],
                        image_url: imageUrl
                    };
                    return {
                        ...prevSettings,
                        products: updatedProducts,
                    };
                });
            }
        } catch (error) {
            customErrorFunction(error)
        }
    };

    const handleProductChange = (index, e) => {
        const { name, value } = e.target;
        const newProducts = [...settings.products];
        newProducts[index][name] = value;
        setSettings((prevSettings) => ({
            ...prevSettings,
            products: newProducts,
        }));
    };

    const addProduct = () => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            products: [...prevSettings.products, { name: '', image: '', price: '', link: '' }],
        }));
    };

    const deleteProduct = (index) => {
        if (settings.products.length <= 5) {
            alert("At least 5 products should be there.");
            return;
        }

        const newProducts = settings.products.filter((_, i) => i !== index);
        setSettings((prevSettings) => ({
            ...prevSettings,
            products: newProducts,
        }));
    };

    const handleCheckBoxChange = (e) => {
        setSettings((prev) => ({ ...prev, show_product: !prev.show_product }))
        if (!e.target.checked) {
            setSettings((prev) => ({
                ...prev,
                products: []
            }))
        }
    }

    return (
        <div className="customization-form">
            <label>
                <input
                    type="checkbox"
                    name="show_product"
                    checked={settings.show_product}
                    onChange={handleCheckBoxChange}
                />
                Add Products
            </label>
            {settings.show_product && (
                <>
                    <div className="product-fields">
                        {settings.products.map((product, index) => (
                            <div key={index} className="product-item">
                                <div className='d-flex gap-3'>
                                    <label>
                                        Product Name:
                                        <input
                                            type="text"
                                            name="name"
                                            className='input-field'
                                            value={product.name}
                                            onChange={(e) => handleProductChange(index, e)}
                                        />
                                    </label>
                                    <label>
                                        Product Image:
                                        <input
                                            type="file"
                                            name="image_url"
                                            className='form-control input-field'
                                            onChange={(e) => handleFileUpload(e, index)}
                                        />
                                        {product?.image_url && <p style={{ fontSize: 12 }}>Selected File: <span className='text-success'> {product?.image_url?.slice(54)}</span></p>}

                                    </label>
                                </div>
                                <div className='d-flex gap-3'>
                                    <label>
                                        Product Price:
                                        <input
                                            type="number"
                                            name="amount"
                                            className='input-field'
                                            value={product.amount}
                                            onChange={(e) => handleProductChange(index, e)}
                                        />
                                    </label>
                                    <label>
                                        Product Link:
                                        <input
                                            type="url"
                                            name="link"
                                            className='input-field'
                                            value={product.link}
                                            onChange={(e) => handleProductChange(index, e)}
                                        />
                                    </label>
                                </div>
                                <div className='d-flex justify-content-end gap-3'>
                                    <button className='btn delete-product' type="button" onClick={() => deleteProduct(index)}>
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className='d-flex justify-content-end gap-3'>
                            <button className="btn add-more-products" type="button" onClick={addProduct}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductCustomization;
