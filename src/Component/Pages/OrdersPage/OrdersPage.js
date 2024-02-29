import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './OrdersPage.css'
import Unprocessable from './Components/Unprocessable/Unprocessable';
import Processing from './Components/Processing/Processing';
import ReadyToShip from './Components/ReadyToShip/ReadyToShip';
import Manifest from './Components/Manifest/Manifest';
import ReturnOrders from './Components/ReturnOrders/ReturnOrders';
import AllOrders from './Components/AllOrders/AllOrders';
import axios from 'axios';
import Cookies from 'js-cookie';


const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("Processing");

    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [orders,setOrders]=useState([])

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const sellerData=Cookies.get("user_id")
    let authToken=Cookies.get("access_token")

    let allOrders=`http://65.2.38.87:8083/orders-api/orders/?seller_id=${sellerData}`
    let unprocessable=`http://65.2.38.87:8083/orders-api/orders/?seller_id=${sellerData}&courier_status=Unprocessable`
    let processing=`http://65.2.38.87:8083/orders-api/orders/?seller_id=${sellerData}&courier_status=Processing`
    let readyToShip=`http://65.2.38.87:8083/orders-api/orders/?seller_id=${sellerData}&courier_status=Ready_to_ship`
    let returnOrders=`http://65.2.38.87:8083/orders-api/orders/?seller_id=${sellerData}&courier_status=return`
    let manifest=`http://65.2.38.87:8083/orders-api/orders/?seller_id=${sellerData}&courier_status=manifest`


    useEffect(() => {
        axios
            .get(`${activeTab=="All Orders"?allOrders:activeTab=="Unprocessable"?unprocessable:activeTab=="Processing"?processing:activeTab=="Ready to Ship"?readyToShip:activeTab=="Manifest"?manifest:activeTab==="Returns"?returnOrders:""}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(response => {
                console.log('Data is data:', response.data.results);
                setOrders(response.data.results);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [activeTab]);


    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />


            {/* All Orders */}
            <div className={`${activeTab === "All Orders" ? "d-block" : "d-none"}`}>
                <AllOrders activeTab={activeTab} orders={orders} />
            </div>
            
            {/* Unprocessable */}
            <div className={`${activeTab === "Unprocessable" ? "d-block" : "d-none"}`}>
                <Unprocessable activeTab={activeTab} orders={orders}/>
            </div>

             {/* Processing */}
             <div className={`${activeTab === "Processing" ? "d-block" : "d-none"}`}>
                <Processing activeTab={activeTab} orders={orders}/>
            </div>

             {/* ReadyToShip */}
             <div className={`${activeTab === "Ready to Ship" ? "d-block" : "d-none"}`}>
                <ReadyToShip activeTab={activeTab} orders={orders}/>
            </div>

             {/* Manifest */}
             <div className={`${activeTab === "Manifest" ? "d-block" : "d-none"}`}>
                <Manifest activeTab={activeTab} />
            </div>

             {/* Returns */}
             <div className={`${activeTab === "Returns" ? "d-block" : "d-none"}`}>
                <ReturnOrders activeTab={activeTab} orders={orders}/>
            </div>

           
        </>
    )
}

export default OrdersPage