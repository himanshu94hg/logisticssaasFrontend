import React, { useState } from 'react'
import './AddTagPop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

const AddTagPop = ({ addTagShow, setaddTagShow }) => {
    const [addToggle, setAddToggle] = useState(false)
    const [newLabel, setNewLabel] = useState('')
    const [labels, setLabels] = useState([])

    const handleAddTag = () => {
        if (newLabel.trim() !== '') {
            setLabels([...labels, newLabel.trim()])
            setNewLabel('')
            setAddToggle(false)
        }
    }

    return (
        <>
            <div className={`ba-pop-show ${addTagShow ? 'open' : ''}`}>
                <div className='d-flex flex-column w-100 h-100'>
                    <div className="pop-heading">
                        <h4>Add Tags to Your Order</h4>
                    </div>
                    <div className='pop-content'>
                        <div className='pop-footer'>
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
                        <div style={{ maxHeight: '200px', overflow: 'auto' }} className='d-flex gap-2 flex-column mt-3'>
                            {labels.map((label, index) => (
                                <label key={index}>
                                    <input type="checkbox" />
                                    <span className='label-name'>{label}</span>
                                </label>
                            ))}
                        </div>

                        <div className='d-flex justify-content-end w-100'>
                            <button onClick={() => setaddTagShow(false)} className='btn main-button'>Apply</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTagPop
