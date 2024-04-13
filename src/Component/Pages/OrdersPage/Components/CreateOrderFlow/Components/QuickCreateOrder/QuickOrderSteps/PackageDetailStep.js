import React, { useEffect, useState } from 'react'

const PackageDetailStep = ({ onPrev, onNext, formData, setFormData, errors, setErrors }) => {
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
                [field]: charge,
                vol_weight: vol_data.toFixed(2)
            }
        }));
    };

    console.log(vol_data, "this is vol_data")

    return (
        <div>
            <div className='box-shadow p10 w-100'>
                <div className='inputs-container mx-auto mb-3'>
                    {/* Step 4 content */}
                    {/* <h3 className='mb-4'>Package Details</h3> */}
                    <div className='row'>
                        {/* Invoice Amount */}
                        <label className='col'>
                            <span>Invoice Amount (₹)<span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.invoice_amount && 'input-field-error'}`}
                                type="text" value={formData.order_details.invoice_amount} onChange={(e) => handleChangeOrder(e, 'invoice_amount')}
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder='Enter invoice amount'
                            />
                            {errors.invoice_amount && <span className="custom-error">{errors.invoice_amount}</span>}
                        </label>

                        {/* COD Charges */}
                        <label className='col'>
                            <span>COD Charges (₹) <span className='text-gray'>(Optional)</span></span>
                            <input
                                className='input-field'
                                type="text" value={formData.charge_details.cod_charges} onChange={(e) => handleChangeCharge(e, 'cod_charges')}
                                onKeyPress={(e) => {
                                    if (!/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder='Enter COD charges'
                            />
                            {/*formData.order_details.payment_type === "COD" && errors.cod_charges && <span className="custom-error">{errors.cod_charges}</span>*/}
                        </label>
                    </div>
                    <div className='mt-3'>
                        <div className='fw-bold lh-base'>Dead Weight <span className='mandatory'>*</span><br />
                            {errors.weight && <span className="custom-error">{errors.weight}</span>}
                            <label>
                                <input
                                    // className='input-field'
                                    className={`input-field ${errors.cod_charges && 'input-field-error'}`}
                                    style={{ minWidth: '15    0px' }}
                                    type="text" value={formData.dimension_details.weight}
                                    onChange={(e) => handleChangeDimension(e, 'weight')}
                                    onKeyPress={(e) => {
                                        const allowedCharacters = /^[0-9\b.]+$/;
                                        if (!allowedCharacters.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    placeholder='Enter dead weight' />
                                <span class="unit">KG</span>
                            </label>
                            <br />
                            <span className="font12 fw-normal">Dead Weight is physical Weight
                            </span>
                        </div>
                        <label className='col'>

                        </label>
                    </div>
                    <div className='mt-4'>
                        <p className='fw-bold lh-base'>Volumetric Weight <span className='mandatory'>*</span><br />
                            <span className="font12 fw-normal">Enter packages dimensions to calculate Volumetric Weight
                            </span>
                        </p>
                    </div>
                    <div className="row gap-2">

                        {/* Length (cm) */}
                        <label className='col'>
                            <span>Length <span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.length && 'input-field-error'}`}
                                type="text" value={formData.dimension_details.length}
                                onChange={(e) => handleChangeDimension(e, 'length')}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[0-9\b.]+$/;
                                    if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder='Enter length'
                            />
                            <span class="unit pd-lbh">CM</span>
                            {errors.length && <span className="custom-error">{errors.length}</span>}

                        </label>

                        {/* Breadth (cm) */}
                        <label className='col'>
                            <span>Breadth <span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.breadth && 'input-field-error'}`}
                                type="text" value={formData.dimension_details.breadth} onChange={(e) => handleChangeDimension(e, 'breadth')}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[0-9\b.]+$/;
                                    if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder='Enter breadth'
                            />
                            <span class="unit pd-lbh">CM</span>
                            {errors.breadth && <span className="custom-error">{errors.breadth}</span>}
                        </label>

                        {/* Height (cm) */}
                        <label className='col'>
                            <span>Height <span className='mandatory'>*</span></span>
                            <input
                                className={`input-field ${errors.height && 'input-field-error'}`}
                                type="text" value={formData.dimension_details.height} onChange={(e) => handleChangeDimension(e, 'height')}
                                onKeyPress={(e) => {
                                    const allowedCharacters = /^[0-9\b.]+$/;
                                    if (!allowedCharacters.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                placeholder='Enter height'
                            />
                            <span class="unit pd-lbh">CM</span>
                            {errors.height && <span className="custom-error">{errors.height}</span>}
                        </label>
                    </div>
                    <div className="volumetric-weight">
                        <label>
                            Chargeable Weight
                            <input className='input-field' type="text" value={finalWeight > 0 ? finalWeight : ''} placeholder='...' />
                            <span class="unit">KG</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageDetailStep