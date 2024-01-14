import React, { useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ShippingCharges from './Components/ShippingCharges/ShippingCharges';
import RemittanceLogs from './Components/RemittanceLogs/RemittanceLogs';
import CreditReceipt from './Components/CreditReceipt/CreditReceipt';
import RechargeLogs from './Components/RechargeLogs/RechargeLogs';
import InvoicesTab from './Components/InvoicesTab/InvoicesTab';
import PassbookTab from './Components/PassbookTab/PassbookTab';


const BillingPage = () => {
    const [activeTab, setActiveTab] = useState("Shipping Charges");

    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />


            {/* Shipping Charges */}
            <div className={`${activeTab === "Shipping Charges" ? "d-block" : "d-none"}`}>
                <ShippingCharges />
            </div>

            {/* Remittance Logs */}
            <div className={`${activeTab === "Remittance Logs" ? "d-block" : "d-none"}`}>
                <RemittanceLogs />
            </div>

            {/* RechargeLogs */}
            <div className={`${activeTab === "Recharge Logs" ? "d-block" : "d-none"}`}>
                <RechargeLogs />
            </div>

            {/* Invoices */}
            <div className={`${activeTab === "Invoices" ? "d-block" : "d-none"}`}>
                <InvoicesTab />
            </div>

            {/* Invoices */}
            <div className={`${activeTab === "Passbook" ? "d-block" : "d-none"}`}>
                <PassbookTab />
            </div>

            {/* Credit Receipt */}
            <div className={`${activeTab === "Credit Receipt" ? "d-block" : "d-none"}`}>
                <CreditReceipt />
            </div>
            

           
        </>
    )
}

export default BillingPage