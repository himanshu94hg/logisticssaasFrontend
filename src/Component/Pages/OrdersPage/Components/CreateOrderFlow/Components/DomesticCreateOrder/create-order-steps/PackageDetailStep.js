import 'react-toggle/style.css';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';


export const PackageDetailStep = ({ onPrev, onNext, formData, setFormData }) => {
    const handleChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleChangeOrder = (e, field) => {
        const value = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            order_details: {
                ...prevData.order_details,
                [field]: value
            }
        }));
    };
    const handleChangeCharge = (e, field) => {
        const charge = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            charge_details: {
                ...prevData.charge_details,
                [field]: charge
            }
        }));
    };

    const handleChangeDimension = (e, field) => {
        const charge = e.target.value === '' ? null : e.target.value;
        setFormData(prevData => ({
            ...prevData,
            dimension_details: {
                ...prevData.dimension_details,
                [field]: charge
            }
        }));
    };

    const [finalWeight, setFinalWeight] = useState()

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
                                className='input-field'
                                type="text" value={formData.order_details.invoice_amount} onChange={(e) => handleChangeOrder(e, 'invoice_amount')} />
                        </label>

                        {/* COD Charges */}
                        <label className='col'>
                            COD Charges
                            <input
                                className='input-field'
                                type="text" value={formData.charge_details.cod_charges} onChange={(e) => handleChangeCharge(e, 'cod_charges')} />
                        </label>
                    </div>
                    <hr />
                    <div className=''>
                        <div className='fw-bold lh-base'>Dead Weight<br />
                            <input
                                className='input-field'
                                style={{ minWidth: '15    0px' }}
                                type="text" value={formData.dimension_details.weight}
                                onChange={(e) => handleChangeDimension(e, 'weight')} />
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
                                className='input-field'
                                type="text" value={formData.dimension_details.length}
                                onChange={(e) => handleChangeDimension(e, 'length')} />
                        </label>

                        {/* Breadth (cm) */}
                        <label className='col'>
                            Breadth (cm)
                            <input
                                className='input-field'
                                type="text" value={formData.dimension_details.breadth} onChange={(e) => handleChangeDimension(e, 'breadth')} />
                        </label>

                        {/* Height (cm) */}
                        <label className='col'>
                            Height (cm)
                            <input
                                className='input-field'
                                type="text" value={formData.dimension_details.height} onChange={(e) => handleChangeDimension(e, 'height')} />
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
                <button className='btn main-button ms-3' onClick={onNext}>Next</button>
            </div>
        </div>
    );
};