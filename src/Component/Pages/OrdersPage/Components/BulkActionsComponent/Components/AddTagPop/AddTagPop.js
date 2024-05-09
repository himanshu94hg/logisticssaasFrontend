import React, { useEffect, useState } from 'react';
import './AddTagPop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const AddTagPop = ({ addTagShow, setaddTagShow, selectedRows,setSelectedRows,setBulkActionShow }) => {
    const dispatch = useDispatch();
    const [addToggle, setAddToggle] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [labels, setLabels] = useState([]);
    const [activeLabels, setActiveLabels] = useState([]); 
    const { tagListData } = useSelector(state => state?.orderSectionReducer);

    useEffect(() => {
        let temp = [];
        if (tagListData) {
            temp = tagListData.map((item) => ({ id: item.id, name: item.name })); 
        }
        setLabels(temp);
    }, [tagListData]);

    const handleAddTag = () => {
        if (newLabel.trim() !== '') {
            setLabels([...labels, { id: labels.length + 1, name: newLabel.trim() }]); // Add new label with auto-incremented ID
            setNewLabel('');
            setAddToggle(false);
        }
       dispatch({type:"CREATE_ORDERS_TAG_ACTION",payload:{
        name:newLabel
       }})
    };

    const handleLabelClick = (label) => {
        const index = activeLabels.indexOf(label.id); // Find index of label ID
        if (index === -1) {
            setActiveLabels([...activeLabels, label.id]);
        } else {
            const updatedLabels = [...activeLabels];
            updatedLabels.splice(index, 1);
            setActiveLabels(updatedLabels);
        }
    };

    const handleLabelDelete = (label) => {
        const updatedLabels = labels.filter(item => item !== label);
        setLabels(updatedLabels);
    };

    useEffect(() => {
        if(addTagShow){
            dispatch({ type: "ORDERS_TAG_LIST_API_ACTION" });
        }
    }, [addTagShow]);

    return (
        <>
            <div className={`ba-pop-show ${addTagShow ? 'open' : ''}`}>
                <div style={{ width: '500px', height: '400px' }} className='d-flex flex-column ws-nowrap '>
                    <div className="pop-heading">
                        <h4>Add Tags to Your Order</h4>
                    </div>
                    <div className='pop-content'>
                        <div>
                            <div className='pop-footer my-3'>
                                {addToggle ?
                                    (
                                        <label>
                                            <input className='input-field' type="text" value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
                                            <span onClick={handleAddTag} className='text-sh-primary'><FontAwesomeIcon icon={faCircleCheck} className='font30' /></span>
                                        </label>
                                    )
                                    :
                                    (
                                        <button onClick={() => setAddToggle(true)} className='btn main-button-outline'><FontAwesomeIcon icon={faPlus} /> Create tag</button>
                                    )
                                }
                            </div>
                            <div style={{ maxHeight: '225px', overflow: 'auto' }} className='Labels-pool'>
                                {labels.map((label, index) => (
                                    <div key={index} className={`label-button-container ${activeLabels.includes(label.id) ? 'active' : ''}`}>
                                        <button
                                            className={`label-button`}
                                            onClick={() => handleLabelClick(label)}
                                        >
                                            {label.name}
                                        </button>
                                        <span className="delete-label" onClick={() => handleLabelDelete(label)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='d-flex justify-content-end w-100 my-2'>
                            <button onClick={() => setaddTagShow(false)} className='btn cancel-button me-2'>Cancel</button>
                            <button onClick={() => {
                                setaddTagShow(false);
                                setActiveLabels([])
                                setSelectedRows([])
                                setBulkActionShow(false)
                                dispatch({
                                    type: "BULK_ADD_ORDER_TAG_ACTION", payload: {
                                        order_ids: selectedRows,
                                        tag_ids: activeLabels
                                    }
                                });
                            }} className='btn main-button'>Apply</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTagPop;
