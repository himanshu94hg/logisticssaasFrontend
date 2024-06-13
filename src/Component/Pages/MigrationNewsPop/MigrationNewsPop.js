import React from 'react'
import './MigrationNewsPop.css'

const MigrationNewsPop = () => {
    return (
        <>
            <div className='migration-news'>
                <div className="container">
                    <div className="welcome-banner">
                        <h1>Welcome to Shipease Seller Panel 2.0!</h1>
                        <p>Experience enhanced features and a seamless transition.</p>
                    </div>
                    <div className="section text-center">
                        <h4>Your Data Has Been Successfully Migrated</h4>
                        <p>
                            We are excited to announce that your old data has been successfully
                            migrated to Dashboard 2.0. This includes your wallet balance,
                            courier preferences, warehouse details, and channel integrations.
                        </p>
                    </div>
                    <div className="section text-center">
                        <h4>Upload Your Orders in 2.0 and Enjoy Shipping with New Features</h4>
                        <p>
                            You can now upload your orders in the new dashboard and start shipping
                            with our enhanced features.
                        </p>
                    </div>
                    <div className="section text-center">
                        <p>
                            Click the button below to move to Dashboard 2.0. Use your same
                            username with the default password provided.
                        </p>
                        <a href='#' className="button">
                            Click to Move to 2.0
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MigrationNewsPop