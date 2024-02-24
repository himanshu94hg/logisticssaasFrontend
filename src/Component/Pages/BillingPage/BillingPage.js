import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ShippingCharges from './Components/ShippingCharges/ShippingCharges';
import RemittanceLogs from './Components/RemittanceLogs/RemittanceLogs';
import CreditReceipt from './Components/CreditReceipt/CreditReceipt';
import RechargeLogs from './Components/RechargeLogs/RechargeLogs';
import InvoicesTab from './Components/InvoicesTab/InvoicesTab';
import PassbookTab from './Components/PassbookTab/PassbookTab';
import { useDispatch, useSelector } from 'react-redux';
import './BillingPage.css'


const BillingPage = () => {
   const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Shipping Charges");
    const [selectedOption, setSelectedOption] = useState("Domestic");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };



    useEffect(()=>{
        dispatch({type:"BILLING_DATA_ACTION"})
    },[])

    const {billingCard}=useSelector(state=>state?.billingSectionReducer)

    console.log(billingCard,"billingCardbillingCard")

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />


            {/* Shipping Charges */}
            <div className={`${activeTab === "Shipping Charges" ? "d-block" : "d-none"}`}>
                <ShippingCharges billingCard={billingCard}/>
            </div>

            {/* Remittance Logs */}
            <div className={`${activeTab === "Remittance Logs" ? "d-block" : "d-none"}`}>
                <RemittanceLogs  billingCard={billingCard} />
            </div>

            {/* RechargeLogs */}
            <div className={`${activeTab === "Recharge Logs" ? "d-block" : "d-none"}`}>
                <RechargeLogs  billingCard={billingCard} />
            </div>

            {/* Invoices */}
            <div className={`${activeTab === "Invoices" ? "d-block" : "d-none"}`}>
                <InvoicesTab  billingCard={billingCard}/>
            </div>

            {/* Invoices */}
            <div className={`${activeTab === "Passbook" ? "d-block" : "d-none"}`}>
                <PassbookTab  billingCard={billingCard}/>
            </div>

            {/* Credit Receipt */}
            <div className={`${activeTab === "Credit Receipt" ? "d-block" : "d-none"}`}>
                <CreditReceipt  billingCard={billingCard}/>
            </div>
            

           
        </>
    )
}

export default BillingPage