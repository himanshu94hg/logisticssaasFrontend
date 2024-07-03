import React, { useState, useEffect } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ChannelsView from './Components/ChannelsView';
import './ViewIntegrations.css'
import OMSView from './Components/OMSView';
import OthersView from './Components/OthersView';
import CourierView from './Components/CourierView';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ViewIntegrations = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("Channel")
    const [channelData,setChannelData] = useState([]);

    const channelGetCard = useSelector(state => state?.channelSectionReducer?.channelGetCard)

    useEffect(() => {
        if(activeTab === "Channel")
        {
            dispatch({ type: "CHANNEL_GET_DATA_ACTION" });
        }
    }, [dispatch,activeTab])

    useEffect(() => {
        if (channelGetCard?.count > 0) {
            setChannelData(channelGetCard?.results);
        }
    }, [channelGetCard?.results]);


    useEffect(() => {
        if (location.state?.tabState) {
            setActiveTab(location.state.tabState);
        }
    }, [location.state]);

    return (
        <>
            <NavTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className='view-integrations-page'>
                <div className={`${activeTab === "Channel" ? "d-block" : "d-none"}`}>
                    <ChannelsView channelData={channelData}/>
                </div>

                <div className={`${activeTab === "OMS" ? "d-block" : "d-none"}`}>
                    <OMSView />
                </div>

                <div className={`${activeTab === "Other" ? "d-block" : "d-none"}`}>
                    <OthersView />
                </div>

                <div className={`${activeTab === "Courier" ? "d-block" : "d-none"}`}>
                    <CourierView />
                </div>
            </div>

        </>
    );
}

export default ViewIntegrations;
