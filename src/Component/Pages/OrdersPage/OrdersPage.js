import React, { useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './OrdersPage.css'
import Unprocessable from './Components/Unprocessable/Unprocessable';
import Processing from './Components/Processing/Processing';
import ReadyToShip from './Components/ReadyToShip/ReadyToShip';
import Manifest from './Components/Manifest/Manifest';
import ReturnOrders from './Components/ReturnOrders/ReturnOrders';
import AllOrders from './Components/AllOrders/AllOrders';


const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("All Orders");

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


            {/* All Orders */}
            <div className={`${activeTab === "All Orders" ? "d-block" : "d-none"}`}>
                <AllOrders />
            </div>
            
            {/* Unprocessable */}
            <div className={`${activeTab === "Unprocessable" ? "d-block" : "d-none"}`}>
                <Unprocessable />
            </div>

             {/* Processing */}
             <div className={`${activeTab === "Processing" ? "d-block" : "d-none"}`}>
                <Processing />
            </div>

             {/* ReadyToShip */}
             <div className={`${activeTab === "Ready to Ship" ? "d-block" : "d-none"}`}>
                <ReadyToShip />
            </div>

             {/* Manifest */}
             <div className={`${activeTab === "Manifest" ? "d-block" : "d-none"}`}>
                <Manifest />
            </div>

             {/* Returns */}
             <div className={`${activeTab === "Returns" ? "d-block" : "d-none"}`}>
                <ReturnOrders />
            </div>

           
        </>
    )
}

export default OrdersPage