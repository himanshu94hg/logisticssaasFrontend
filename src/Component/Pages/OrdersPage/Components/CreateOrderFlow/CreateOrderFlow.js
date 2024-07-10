import './CreateOrderFlow.css'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import LoaderScreen from '../../../../LoaderScreen/LoaderScreen';
import BulkCreateOrder from './Components/BulkCreateOrder/BulkCreateOrder';
import QuickCreateOrder from './Components/QuickCreateOrder/QuickCreateOrder';
import DomesticCreateOrder from './Components/DomesticCreateOrder/DomesticCreateOrder';
import InternationalCreateOrders from './Components/InternationalCreateOrders/InternationalCreateOrders';


const CreateOrderFlow = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false)
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [activeTab, setActiveTab] = useState("DomesticCreateOrder");
    const { pathName } = useSelector(state => state?.authDataReducer)

    useEffect(() => {
        setLoader(true)
        if (activeTab) {
            setTimeout(() => {
                setLoader(false)
            }, 500);
        }
    }, [activeTab])


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

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='create-order-flow-container'>
                {/* All */}
                <div className={`${activeTab === "DomesticCreateOrder" ? "d-block" : "d-none"}`}>
                    <DomesticCreateOrder activeTab={activeTab} />
                </div>

                {/* All */}
                <div className={`non-active-flow ${activeTab === "InternationalCreateOrders" ? "d-block" : "d-none"}`}>
                    <InternationalCreateOrders />
                    <div className='not-active-message'>This service will be active shortly.</div>
                </div>

                {/* All */}
                <div className={`${activeTab === "BulkCreateOrder" ? "d-block" : "d-none"}`}>
                    <BulkCreateOrder />
                </div>

                {/* All */}
                <div className={`${activeTab === "QuickCreateOrder" ? "d-block" : "d-none"}`}>
                    <QuickCreateOrder />
                </div>
                <LoaderScreen loading={loader} />
            </div>
        </>
    )
}

export default CreateOrderFlow