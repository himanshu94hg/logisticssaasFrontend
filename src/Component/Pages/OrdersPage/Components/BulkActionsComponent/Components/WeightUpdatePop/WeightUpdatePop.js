import React from 'react'
import './WeightUpdatePop.css'

const WeightUpdatePop = ({ setUpdateWeight, UpdateWeight }) => {

    return (
        <>
            <div className={`ba-pop-show weight-update ${UpdateWeight ? 'open' : ''}`}>
                <div style={{ width: '100%', height: '400px' }} className='d-flex flex-column ws-nowrap '>
                    <div className="pop-heading">
                        <h4>Update Weight & Dimension</h4>
                    </div>
                    <div className='pop-content'>
                        <div className='d-flex flex-column'>
                            <div className='lbh-labels'>
                                <label>
                                    Dead Weight
                                    <input className='input-field' type="text" />
                                    <span className='unit'>KG</span>
                                </label>
                                <label>
                                    Length
                                    <input className='input-field' type="text" />
                                    <span className='unit'>CM</span>
                                </label>
                                <label>
                                    Breadth
                                    <input className='input-field' type="text" />
                                    <span className='unit'>CM</span>
                                </label>
                                <label>
                                    Height
                                    <input className='input-field' type="text" />
                                    <span className='unit'>CM</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end w-100 my-2 pe-2'>
                        <button onClick={() => setUpdateWeight(false)} className='btn cancel-button me-2'>Cancel</button>
                        <button onClick={() => setUpdateWeight(false)} className='btn main-button'>Apply</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WeightUpdatePop