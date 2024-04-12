import React, { useState } from 'react';
import './CustomTooltip.css'; // Styles for the tooltip

const CustomTooltip = ({ triggerComponent, tooltipComponent, addClassName }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    const handleMouseEnter = () => {
        setShowTooltip(true);
    };

    const handleMouseLeave = () => {
        setShowTooltip(false);
    };

    return (
        <div className="tooltip-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className='cursor-pointer'>{triggerComponent}</div>
            {showTooltip &&
                <div className={`tooltip ${addClassName}`}>{tooltipComponent}</div>
            }
        </div>
    );
};

export default CustomTooltip;
