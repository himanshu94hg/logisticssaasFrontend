import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const SidePanel = (props) => {
    return (
        <>
            <div id='sidePanel' className="side-panel">
                <div id='sidepanel-closer' onClick={props.CloseSidePanel}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>
                <section className='sidepanel-header'>
                    <h4>Explore Additional Filters</h4>
                    <p>Fine-Tune Your Search</p>
                </section>
            </div>
        </>
    )
}

export default SidePanel