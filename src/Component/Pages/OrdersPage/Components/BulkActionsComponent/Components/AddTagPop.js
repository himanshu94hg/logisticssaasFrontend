import React, { useState } from 'react'
import './AddTagPop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPlus } from '@fortawesome/free-solid-svg-icons'

const AddTagPop = ({ addTagShow }) => {
    const [addToggle, setaddToggle] = useState(false)

    const handleAddTag = () => {
        setaddToggle(false)
    }

    return (
        <>
            <div className={`ba-pop-show ${addTagShow ? 'open' : ''}`}>
                <div className='d-flex flex-column w-100 h-100'>
                    <div className="pop-heading">
                        <h4>Add Tags to Your Order</h4>
                    </div>
                    <div className='pop-content'>
                        <label>
                            <input type="checkbox" />
                            Amazon
                        </label>
                        <label>
                            <input type="checkbox" />
                            Shopify
                        </label>
                        <label>
                            <input type="checkbox" />
                            Manual
                        </label>
                        <label>
                            <input type="checkbox" />
                            Bulk Import
                        </label>


                        <div className='pop-footer'>
                            <label className={`${addToggle ? '' : 'invisible'}`}>
                                <input className='input-field' type="text" />
                                <span onClick={handleAddTag} className='text-sh-primary'><FontAwesomeIcon icon={faCircleCheck} className='font30' /></span>
                            </label>
                            <button onClick={() => setaddToggle(true)} className='btn text-sh-primary'><FontAwesomeIcon icon={faPlus} /> Create tag</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default AddTagPop