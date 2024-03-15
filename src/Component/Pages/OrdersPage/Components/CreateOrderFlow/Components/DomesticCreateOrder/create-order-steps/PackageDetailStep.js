import 'react-toggle/style.css';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';


export const PackageDetailStep = ({ onPrev, onNext, formData, setFormData }) => {
    const [errors, setErrors] = useState({});

    console.log(formData.order_details.payment_type, "Payment Type");

    const handleValidation = () => {
        const { cod_charges } = formData?.charge_details;
        const { invoice_amount, } = formData?.order_details;
        const { weight, length, breadth, height } = formData?.dimension_details;

        const errorsObj = {};

        if (!invoice_amount) {
            errorsObj.invoice_amount = "Invoice Amount is required!";
        }
        if(formData.order_details.payment_type === "COD")
        {
            if (!cod_charges) {
                errorsObj.cod_charges = "COD Charges is required!";
            }
        }
        if (!weight) {
            errorsObj.weight = "Dead Weight is required!";
        }
        if (!length) {
            errorsObj.length = "Length is required!";
        }
        if (!breadth) {
            errorsObj.breadth = "Breadth is required!";
        }
        if (!height) {
            errorsObj.height = "Height is required!";
        }
        setErrors(errorsObj);
        console.log("Package Details Data",Object.keys(errorsObj));
        return Object.keys(errorsObj).length === 0;
    };

    const handleNext = () => {
        const isValid = handleValidation();
        console.log("Package Details",isValid)
        if (isValid) {
            onNext();
        }
    };

    const handleChangeOrder = (e, field) => {
        const value = e.target.value.trim();
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                [field]: value
            }
        }));
    };
    const handleChangeCharge = (e, field) => {
        const charge = e.target.value.trim();
        setFormData(prevData => ({
            ...prevData,
            charge_details: {
                ...prevData.charge_details,
                [field]: charge
            }
        }));
    };

    const handleChangeDimension = (e, field) => {
        const charge = e.target.value.trim();
        setFormData(prevData => ({
            ...prevData,
            dimension_details: {
                ...prevData.dimension_details,
                [field]: charge
            }
        }));
    };

    const [finalWeight, setFinalWeight] = useState(0)

    const vol_data = formData.dimension_details.length * formData.dimension_details.breadth * formData.dimension_details.height / 5000;
    const chargedWeight = formData?.dimension_details.weight;

    useEffect(() => {
        if (vol_data && chargedWeight) {
            if (vol_data >= chargedWeight) {
                setFinalWeight(vol_data);
            } else {
                setFinalWeight(chargedWeight);
            }
        } else if (vol_data) {
            setFinalWeight(vol_data);
        } else if (chargedWeight) {
            setFinalWeight(chargedWeight);
        }
    }, [vol_data, chargedWeight]);


    return (
        <div>
            <div className='box-shadow shadow-sm p10 w-100 form-box-h'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 4 content */}
                    <h3 className='mb-4'>Package Details</h3>
                    <div className='row'>
                        {/* Invoice Amount */}
                        <label className='col'>
                            Invoice Amount
                            <input
                                className={`input-field ${errors.invoice_amount && 'input-field-error'}`}
                                type="text" value={formData.order_details.invoice_amount} onChange={(e) => handleChangeOrder(e, 'invoice_amount')} 
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}    
                            />
                            {errors.invoice_amount && <span className="custom-error">{errors.invoice_amount}</span>}
                        </label>

                        {/* COD Charges */}
                        <label className='col'>
                            <span>COD Charges <span className='text-gray'>(Optional)</span></span>
                            <input
                                className={`input-field ${formData.order_details.payment_type === "COD" && errors.cod_charges ? 'input-field-error' : ''}`}
                                type="text" value={formData.charge_details.cod_charges} onChange={(e) => handleChangeCharge(e, 'cod_charges')} 
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                                {formData.order_details.payment_type === "COD" && errors.cod_charges && <span className="custom-error">{errors.cod_charges}</span>}
                        </label>
                    </div>
                    <hr />
                    <div className=''>
                        <div className='fw-bold lh-base'>Dead Weight<br />
                            {errors.weight && <span className="custom-error">{errors.weight}</span>}
                            <input
                                // className='input-field'
                                className={`input-field ${errors.cod_charges && 'input-field-error'}`}
                                style={{ minWidth: '15    0px' }}
                                type="text" value={formData.dimension_details.weight}
                                onChange={(e) => handleChangeDimension(e, 'weight')} 
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}/>
                            <br />
                            <span className="font12 fw-normal">Dead Weight is physical Weight
                            </span>
                        </div>
                        <label className='col'>

                        </label>
                    </div>
                    <div className='mt-4'>
                        <p className='fw-bold lh-base'>Volumetric Weight<br />
                            <span className="font12 fw-normal">Enter packages dimensions to calculate Volumetric Weight
                            </span>
                        </p>
                    </div>
                    <div className="row">

                        {/* Length (cm) */}
                        <label className='col'>
                            Length (cm)
                            <input
                                className={`input-field ${errors.length && 'input-field-error'}`}
                                type="text" value={formData.dimension_details.length}
                                onChange={(e) => handleChangeDimension(e, 'length')} 
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}/>
                            {errors.length && <span className="custom-error">{errors.length}</span>}

                        </label>

                        {/* Breadth (cm) */}
                        <label className='col'>
                            Breadth (cm)
                            <input
                                className={`input-field ${errors.breadth && 'input-field-error'}`}
                                type="text" value={formData.dimension_details.breadth} onChange={(e) => handleChangeDimension(e, 'breadth')} 
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}/>
                            {errors.breadth && <span className="custom-error">{errors.breadth}</span>}
                        </label>

                        {/* Height (cm) */}
                        <label className='col'>
                            Height (cm)
                            <input
                                className={`input-field ${errors.height && 'input-field-error'}`}
                                type="text" value={formData.dimension_details.height} onChange={(e) => handleChangeDimension(e, 'height')} 
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}/>
                            {errors.height && <span className="custom-error">{errors.height}</span>}
                        </label>
                    </div>
                    <div className="volumetric-weight">
                        <p>Charged Weight:&nbsp; {finalWeight} Kg</p>
                    </div>

                </div>
            </div>
            <div className='d-flex justify-content-end my-3'>
                {/* Add more input fields as needed */}
                <button className='btn main-button-outline' onClick={onPrev}>Previous</button>
                <button className='btn main-button ms-3' onClick={handleNext}>Next</button>
            </div>
        </div>
    );
};