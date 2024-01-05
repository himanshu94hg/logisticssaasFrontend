import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SidePanel = () => {
    return (
        <>
            <div id='sidePanel' className="side-panel">
                <div className='sidepanel-closer'>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
            </div>
        </>
    )
}

export default SidePanel