import React, { useEffect, useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import './MoreOnOrders.css'
import { useDispatch, useSelector } from 'react-redux';
import MergeOrder from './Components/MergeOrder/MergeOrder';
import SplitOrder from './Components/SplitOrder/SplitOrder';
import ReverseOrder from './Components/ReverseOrder/ReverseOrder';
import ReassignOrder from './Components/ReassignOrder/ReassignOrder';
import axios from 'axios';
import Cookies from 'js-cookie';


const MoreOnOrders = () => {
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState("Domestic");
    const [activeTab, setActiveTab] = useState("Merge Order");
    const [isOpen, setIsOpen] = useState(false);
    const [orders,setOrders]=useState([])
    const [searchValue,setSearchValue]=useState("")

    const sellerData=Cookies.get("user_id")
    let authToken=Cookies.get("access_token")

    let reassign=`https://dev.shipease.in/orders-api/orders/reassign/`
    let merge=`https://dev.shipease.in/orders-api/orders/merge-order/`
    let split=`https://dev.shipease.in/orders-api/orders/split-order/`
    let reverse=`https://dev.shipease.in/orders-api/orders/reverse-order/`


    useEffect(() => {
        let apiUrl = '';
        switch (activeTab) {
            case "Reassign Order":
                apiUrl = reassign;
                break;
            case "Merge Order":
                apiUrl = merge;
                break;
            case "Split Order":
                apiUrl = split;
                break;
            case "Ready to Ship":
                apiUrl = reverse;
                break;
            default:
                apiUrl = '';
        }

        if (apiUrl) {
            if (searchValue?.trim() !== '' && searchValue?.length>=3) {
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
    }, [activeTab, authToken, sellerData, searchValue, reassign, merge, split, reverse]);

    const handleSearch=(value)=>{
        setSearchValue(value)
    }

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />


            {/* reassign */}
            <div className={`${activeTab === "Reassign Order" ? "d-block" : "d-none"}`}>
                <ReassignOrder activeTab={activeTab} orders={orders}  handleSearch={handleSearch}/>
            </div>

            {/* merge */}
            <div className={`${activeTab === "Merge Order" ? "d-block" : "d-none"}`}>
                <MergeOrder activeTab={activeTab} orders={orders}  handleSearch={handleSearch}/>
            </div>

            {/* split */}
            <div className={`${activeTab === "Split Order" ? "d-block" : "d-none"}`}>
                <SplitOrder activeTab={activeTab} orders={orders} handleSearch={handleSearch}/>
            </div>

            {/* reverse */}
            <div className={`${activeTab === "Reverse Order" ? "d-block" : "d-none"}`}>
                <ReverseOrder activeTab={activeTab} orders={orders}  handleSearch={handleSearch}/>
            </div>


        </>
    )
}

export default MoreOnOrders