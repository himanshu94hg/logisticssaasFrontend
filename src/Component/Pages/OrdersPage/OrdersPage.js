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
import { useLocation } from 'react-router';
import EditOrder from './Components/EditOrder/EditOrder';
import Pagination from './Components/Pagination/Pagination';


const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState("Processing");

    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [orderId, setOrderId] = useState(null)
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);



    const [EditOrderSection, setEditOrderSection] = useState(false)


    const location = useLocation()

    console.log(currentPage,"locationlocationlocation")

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const sellerData = Cookies.get("user_id")
    let authToken = Cookies.get("access_token")

    let allOrders = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&page_size=${itemsPerPage}&page=${currentPage}`;
    let unprocessable = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Unprocessable&page_size=${itemsPerPage}&page=${currentPage}`;
    let processing = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Processing&page_size=${itemsPerPage}&page=${currentPage}`;
    let readyToShip = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Ready_to_ship&page_size=${itemsPerPage}&page=${currentPage}`;
    let returnOrders = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=Returns&page_size=${itemsPerPage}&page=${currentPage}`;
    let manifest = `https://dev.shipease.in/orders-api/orders/?seller_id=${sellerData}&courier_status=manifest&page_size=${itemsPerPage}&page=${currentPage}`;



    useEffect(() => {
        let apiUrl = '';
        switch (activeTab) {
            case "All Orders":
                apiUrl = allOrders;
                break;
            case "Unprocessable":
                apiUrl = unprocessable;
                break;
            case "Processing":
                apiUrl = processing;
                break;
            case "Ready to Ship":
                apiUrl = readyToShip;
                break;
            case "Manifest":
                apiUrl = manifest;
                break;
            case "Returns":
                apiUrl = returnOrders;
                break;
            default:
                apiUrl = '';
        }

        if (apiUrl) {
            // Add search parameter if searchValue is not empty
            if (searchValue?.trim() !== '' && searchValue?.length >= 3) {
                apiUrl += `&q=${encodeURIComponent(searchValue.trim())}`;
            }

            axios.get(apiUrl, {
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
        }
    }, [activeTab, authToken, sellerData, searchValue, allOrders, unprocessable, processing, readyToShip, manifest, returnOrders]);

    const handleSearch = (value) => {
        setSearchValue(value)
    }

    let totalItems = 500;

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className='orders-section-tabs'>
                {/* All Orders */}
                <div className={`${activeTab === "All Orders" ? "d-block" : "d-none"}`}>
                    <AllOrders activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* Unprocessable */}
                <div className={`${activeTab === "Unprocessable" ? "d-block" : "d-none"}`}>
                    <Unprocessable activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* Processing */}
                <div className={`${activeTab === "Processing" ? "d-block" : "d-none"}`}>
                    <Processing
                        activeTab={activeTab} orders={orders}
                        handleSearch={handleSearch}
                        setEditOrderSection={setEditOrderSection}
                        setOrderId={setOrderId}
                    />
                </div>

                {/* ReadyToShip */}
                <div className={`${activeTab === "Ready to Ship" ? "d-block" : "d-none"}`}>
                    <ReadyToShip activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* Manifest */}
                <div className={`${activeTab === "Manifest" ? "d-block" : "d-none"}`}>
                    <Manifest activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>

                {/* Returns */}
                <div className={`${activeTab === "Returns" ? "d-block" : "d-none"}`}>
                    <ReturnOrders activeTab={activeTab} orders={orders} handleSearch={handleSearch} />
                </div>
                <Pagination
                    totalItems={totalItems}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

            <EditOrder setEditOrderSection={setEditOrderSection} EditOrderSection={EditOrderSection} orderId={orderId} />

        </>
    )
}

export default OrdersPage