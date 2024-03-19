import React from 'react'
import './TotalProfitAndLoss.css'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TotalProfitAndLoss = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10 pnl-dash" style={{ height: '284px' }}>
                <h4 className="title">Profit and Loss</h4>
                <div className='pnl-card-body'>
                    <div className='d-flex flex-column align-items-center'>
                        <p className='font13 mb-1 text-gray'>Net Income</p>
                        <h3>₹ 00.00</h3>
                    </div>
                    <div className='pnl-income-expense'>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='pnl-arrows mb-3 text-green bg-green-light'>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            <p className='font13 mb-1 text-gray'>Income</p>
                            <h5>₹ 00.0</h5>
                        </div>
                        <div className='d-flex flex-column align-items-center'>
                            <div className='pnl-arrows mb-3 text-red bg-red-light'>
                                <FontAwesomeIcon icon={faArrowUp} />
                            </div>
                            <p className='font13 mb-1 text-gray'>Expenses</p>
                            <h5>₹ 00.0</h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TotalProfitAndLoss