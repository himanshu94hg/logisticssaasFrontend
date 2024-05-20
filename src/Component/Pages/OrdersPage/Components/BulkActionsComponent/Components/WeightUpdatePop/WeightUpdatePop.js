import React, { useEffect, useState } from 'react';
import './WeightUpdatePop.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const WeightUpdatePop = ({ setUpdateWeight, UpdateWeight, selectedRows }) => {
    const dispatch = useDispatch();
    const [dimension, setDimension] = useState([]);
    const { dimensionData } = useSelector(state => state?.orderSectionReducer);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (selectedRows?.length > 0) {
            dispatch({ type: "BULK_GET_DIMENSION_DETAILS_ACTION", payload: selectedRows.join(",") });
        }
    }, [dispatch, selectedRows]);

    useEffect(() => {
        if (dimensionData) {
            const convertedData = dimensionData.map(item => ({
                ...item,
                weight: parseFloat(item.weight / 1000)
            }));
            setDimension(convertedData)
        }
    }, [dimensionData])


    const handleInputChange = (index, field, value) => {
        const newData = [...dimension];
        if (field === 'weight') {
            newData[index][field] = value;
        } else {
            newData[index][field] = value;
        }
        setDimension(newData);
    };

    const validateFormData = () => {
        const newErrors = dimension.map(item => ({}));

        dimension.forEach((item, index) => {
            const errorsAtIndex = {};

            if (!item.weight) {
                errorsAtIndex.weight = 'Weight is required!';
            }
            if (!item.length) {
                errorsAtIndex.length = 'Length is required!';
            }
            if (!item.breadth) {
                errorsAtIndex.breadth = 'Breadth is required!';
            }
            if (!item.height) {
                errorsAtIndex.height = 'Height is required!';
            }
            newErrors[index] = errorsAtIndex;
        });

        setErrors(newErrors);
        return newErrors.every(error => Object.keys(error).length === 0);
    };

    const handleDimension = () => {
       if(validateFormData()){
        setUpdateWeight(false);
        dispatch({ type: "BULK_DIMESION_DETAILS_UPDATE_ACTION", payload: dimension });
       }
    };

    const handleCancel = () => {
        setUpdateWeight(false)
        if (dimensionData) {
            const convertedData = dimensionData.map(item => ({
                ...item,
                weight: parseFloat(item.weight / 1000)
            }));
            setDimension(convertedData)
        }
    }

    return (
        <>
            <div className={`ba-pop-show weight-update ${UpdateWeight ? 'open' : ''}`}>
                <div style={{ width: '100%', height: '400px' }} className='d-flex flex-column ws-nowrap '>
                    <div className="pop-heading">
                        <h4>Update Weight & Dimension</h4>
                        <label htmlFor="">
                            <input type="checkbox" checked />
                            Copy To All
                        </label>
                    </div>
                    <div className='pop-content'>
                        <div className='d-flex flex-column'>
                            {dimension && dimension.length > 0 && dimension.map((data, index) => (
                                <div key={index} className='lbh-labels'>
                                    <label>
                                        Order Number
                                        <input className='input-field' value={dimension[index].order} />
                                    </label>
                                    <label>
                                        Dead Weight
                                        <input
                                            className={`input-field ${errors[index]?.weight && "input-field-error"} `}
                                            type="text"
                                            value={dimension[index].weight}
                                            onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                                        />
                                        {/*(errors[index]?.weight) && <div className="custom-error">{errors[index]?.weight}</div>*/}
                                        <span className='unit'>KG</span>  
                                    </label>
                                    <label>
                                        Length
                                        <input
                                            className={`input-field ${errors[index]?.length && "input-field-error"} `}
                                            type="text"
                                            value={dimension[index].length}
                                            onChange={(e) => handleInputChange(index, 'length', e.target.value)}
                                        />
                                        <span className='unit'>CM</span>
                                    </label>
                                    <label>
                                        Breadth
                                        <input
                                            className={`input-field ${errors[index]?.breadth && "input-field-error"} `}
                                            type="text"
                                            value={dimension[index].breadth}
                                            onChange={(e) => handleInputChange(index, 'breadth', e.target.value)}
                                        />
                                        <span className='unit'>CM</span>
                                    </label>
                                    <label>
                                        Height
                                        <input
                                            className={`input-field ${errors[index]?.height && "input-field-error"} `}
                                            type="text"
                                            value={dimension[index].height}
                                            onChange={(e) => handleInputChange(index, 'height', e.target.value)}
                                        />
                                        <span className='unit'>CM</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='d-flex justify-content-end w-100 my-2 pe-2'>
                        <button onClick={handleCancel} className='btn cancel-button me-2'>Cancel</button>
                        <button onClick={() => handleDimension()} className='btn main-button'>Apply</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WeightUpdatePop;
