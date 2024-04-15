import React, { useEffect, useState } from 'react'
import './LowBalancePop.css'
import AlertIconWhite from '../../../common/Icons/AlertIconWhite'
import { useSelector } from "react-redux";

const LowBalancePop = ({ setWalletRecharge }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleButtonClick = () => {
        setIsVisible(false);
        setWalletRecharge(true);
        localStorage.setItem('popupClosed', 'true');
    };

    const [temp, setTemp] = useState({
        var1: null,
        var2: null,
    });

    const paymentCard = useSelector(state => state?.paymentSectionReducer.paymentCard);
    const paymentSetCard = useSelector(state => state?.paymentSectionReducer?.paymentSetCard);

    useEffect(() => {
        setTemp((prev) => ({
            ...prev,
            var1: paymentCard,
            var2: paymentSetCard,
        }));
    }, [paymentCard, paymentSetCard]);

    useEffect(() => {
        const isPopupClosed = localStorage.getItem('popupClosed');
        if ((temp.var2?.balance || temp.var1?.balance) < 500) {
            setIsVisible(true); // Set visibility based on balance condition
        } else if (isPopupClosed === 'true') {
            setIsVisible(false);
        }
    }, [temp.var2?.balance, temp.var1?.balance]);

    return (
        <>
            {isVisible && (
                <>
                    <div className='low-balance-container'>
                        <div className='lb-header'>
                            <AlertIconWhite />
                        </div>
                        <div className='lb-body'>
                            <h2>Warning!</h2>
                            <p>Your wallet balance is low.</p>
                        </div>

                        <div className='lb-footer'>
                            <button onClick={handleButtonClick} className='btn'>
                                Recharge Now!
                            </button>
                        </div>
                    </div>
                    <div className={`backdrop`}></div>
                </>
            )}
        </>
    );
};

export default LowBalancePop