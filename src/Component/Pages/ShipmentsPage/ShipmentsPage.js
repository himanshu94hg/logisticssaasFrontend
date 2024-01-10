import React, { useState } from 'react';
import NavTabs from './Components/navTabs/NavTabs';
import ActionRequired from './Components/ActionRequired/ActionRequired';


const ShipmentsPage = () => {
    const [activeTab, setActiveTab] = useState("Action Required");

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
            <ActionRequired />
        </>
    )
}

export default ShipmentsPage