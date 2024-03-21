import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ShippingCharges from './Components/ShippingCharges/ShippingCharges';
import RemittanceLogs from './Components/RemittanceLogs/RemittanceLogs';
import CreditReceipt from './Components/CreditReceipt/CreditReceipt';
import RechargeLogs from './Components/RechargeLogs/RechargeLogs';
import InvoicesTab from './Components/InvoicesTab/InvoicesTab';
import PassbookTab from './Components/PassbookTab/PassbookTab';
import { useDispatch, useSelector } from 'react-redux';
import './BillingPage.css';

const BillingPage = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Shipping Charges");
    const [selectedOption, setSelectedOption] = useState("Domestic");

    useEffect(() => {
        const fetchData = async () => {
            switch (activeTab) {
                case "Shipping Charges":
                    await dispatch({ type: "BILLING_SHIPING_DATA_ACTION" });
                    break;
                case "Remittance Logs":
                    await dispatch({ type: "BILLING_SHIPING_REMITANCE_DATA_ACTION" });
                    break;
                case "Recharge Logs":
                    await dispatch({ type: "BILLING_SHIPING_RECHARGE_DATA_ACTION" });
                    break;
                case "Invoices":
                    await dispatch({ type: "BILLING_SHIPING_INVOICE_DATA_ACTION" });
                    break;
                case "Passbook":
                    await dispatch({ type: "BILLING_DATA_ACTION" });
                    break;
                case "Credit Receipt":
                    await dispatch({ type: "BILLING_SHIPING_RECEIPT_DATA_ACTION" });
                    break;
                default:
                    break;
            }
        };

        fetchData();
    }, [dispatch, activeTab]);

    const billingSectionReducer = useSelector(state => state?.billingSectionReducer);
    const { billingCard, billingShipingCard, billingShipingRemitanceCard, billingShipingRechargeCard, billingShipingInvoiceCard, billingShipingReceiptCard } = billingSectionReducer;

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
            {activeTab === "Shipping Charges" && <ShippingCharges billingCard={billingShipingCard} />}

            {/* Remittance Logs */}
            {activeTab === "Remittance Logs" && <RemittanceLogs billingCard={billingShipingRemitanceCard} />}

            {/* RechargeLogs */}
            {activeTab === "Recharge Logs" && <RechargeLogs billingCard={billingShipingRechargeCard} />}

            {/* Invoices */}
            {activeTab === "Invoices" && <InvoicesTab billingCard={billingShipingInvoiceCard} />}

            {/* Passbook */}
            {activeTab === "Passbook" && <PassbookTab billingCard={billingCard} />}

            {/* Credit Receipt */}
            {activeTab === "Credit Receipt" && <CreditReceipt billingCard={billingShipingReceiptCard} />}
        </>
    );
}

export default BillingPage;
