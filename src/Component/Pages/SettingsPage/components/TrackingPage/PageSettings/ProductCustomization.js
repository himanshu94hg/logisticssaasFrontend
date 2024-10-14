import React, { useState } from 'react';
import './ProductCustomization.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProductCustomization = () => {
    const [settings, setSettings] = useState({
        show_footer: false,
        products: [
            { name: '', image: '', price: '', link: '' },
            { name: '', image: '', price: '', link: '' },
            { name: '', image: '', price: '', link: '' },
            { name: '', image: '', price: '', link: '' },
            { name: '', image: '', price: '', link: '' },
        ],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
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
        // Prevent deletion if there are 5 products left
        if (settings.products.length <= 5) {
            alert("At least 5 products should be there."); // Notification
            return; // Do nothing
        }

        const newProducts = settings.products.filter((_, i) => i !== index);
        setSettings((prevSettings) => ({
            ...prevSettings,
            products: newProducts,
        }));
    };

    return (
        <div className="customization-form">
            <label>
                <input
                    type="checkbox"
                    name="show_footer"
                    checked={settings.show_footer}
                    onChange={() => setSettings((prev) => ({ ...prev, show_footer: !prev.show_footer }))}
                />
                Add Products
            </label>
            {settings.show_footer && (
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
                                        Product Image URL:
                                        <input
                                            type="url"
                                            name="image"
                                            className='input-field'
                                            value={product.image}
                                            onChange={(e) => handleProductChange(index, e)}
                                        />
                                    </label>
                                </div>
                                <div className='d-flex gap-3'>
                                    <label>
                                        Product Price:
                                        <input
                                            type="number"
                                            name="price"
                                            className='input-field'
                                            value={product.price}
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
                                    <button className="btn add-more-products" type="button" onClick={addProduct}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductCustomization;
