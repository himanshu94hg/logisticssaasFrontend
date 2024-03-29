import React, { useEffect, useState } from 'react';
import './CreateOrderFlow.css'
import NavTabs from './Components/navTabs/NavTabs';
import DomesticCreateOrder from './Components/DomesticCreateOrder/DomesticCreateOrder';
import InternationalCreateOrders from './Components/InternationalCreateOrders/InternationalCreateOrders';
import QuickCreateOrder from './Components/QuickCreateOrder/QuickCreateOrder';
import BulkCreateOrder from './Components/BulkCreateOrder/BulkCreateOrder';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const CreateOrderFlow = () => {

    const location = useLocation();
    const [activeTab, setActiveTab] = useState("DomesticCreateOrder");

    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const { pathName } = useSelector(state => state?.authDataReducer)

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };


    useEffect(() => {
        if (location.pathname === "/create-order" && location.state && location.state.orderType === "BulkCreateOrder") {
            setActiveTab("BulkCreateOrder");
        }
        else if (location.pathname === "/create-order" && location.state && location.state.orderType === "normalOrder") {
            setActiveTab("DomesticCreateOrder");
        }
        else if (pathName === "Quick Order" || location.pathname === "/create-order" && location.state && location.state.orderType === "quickOrder") {
            setActiveTab("QuickCreateOrder");
        }
        else if (pathName === "Reverse Order") {
            setActiveTab("DomesticCreateOrder");
        }
        // else if(location.pathname === "/Orders"){
        //     setActiveTab("DomesticCreateOrder");
        // }
    }, [location, pathName, location?.state?.orderType]);

    console.log(location.pathname, location.state?.orderType, "location.pathnamelocation.pathname")
    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* All Orders */}
            <div className={`${activeTab === "DomesticCreateOrder" ? "d-block" : "d-none"}`}>
                <DomesticCreateOrder />
            </div>

            {/* All Orders */}
            <div className={`${activeTab === "InternationalCreateOrders" ? "d-block" : "d-none"}`}>
                <InternationalCreateOrders />
            </div>

            {/* All Orders */}
            <div className={`${activeTab === "BulkCreateOrder" ? "d-block" : "d-none"}`}>
                <BulkCreateOrder />
            </div>

            {/* All Orders */}
            <div className={`${activeTab === "QuickCreateOrder" ? "d-block" : "d-none"}`}>
                <QuickCreateOrder />
            </div>
        </>
    )
}

export default CreateOrderFlow