import React, { useState } from 'react';
import './AddTagPop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const AddTagPop = ({ addTagShow, setaddTagShow }) => {
    const [addToggle, setAddToggle] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [labels, setLabels] = useState([]);
    const [activeLabels, setActiveLabels] = useState([]); // Declare activeLabels state variable

    const handleAddTag = () => {
        if (newLabel.trim() !== '') {
            setLabels([...labels, newLabel.trim()]);
            setNewLabel('');
            setAddToggle(false);
        }
    };

    const handleLabelClick = (label) => { // Define handleLabelClick function
        const index = activeLabels.indexOf(label);
        if (index === -1) {
            setActiveLabels([...activeLabels, label]);
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
                                    <div key={index} className={`label-button-container ${activeLabels.includes(label) ? 'active' : ''}`}>
                                        <button
                                            className={`label-button`}
                                            onClick={() => handleLabelClick(label)}
                                        >
                                            {label}
                                        </button>
                                        <span className="delete-label" onClick={() => handleLabelDelete(label)}>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='d-flex justify-content-end w-100 my-2'>
                            <button onClick={() => setaddTagShow(false)} className='btn main-button'>Apply</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddTagPop;
