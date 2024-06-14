import React from 'react'
import './MigrationNewsPop.css'

const MigrationNewsPop = () => {
    return (
        <>
            <div className='migration-news'>
                <div className="container">
                    <div className="welcome-banner">
                        <div className='d-flex gap-3 justify-content-center align-items-center'>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                width={80}
                                height={80}
                                x={0}
                                y={0}
                                viewBox="0 0 512 512"
                                style={{ enableBackground: "new 0 0 512 512" }}
                                xmlSpace="preserve"
                                className=""
                            >
                                <g>
                                    <linearGradient
                                        id="a"
                                        x1={256}
                                        x2={256}
                                        y1="486.129"
                                        y2="25.871"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset={0} stopColor="#1751ff" />
                                        <stop offset={1} stopColor="#17a0ff" />
                                    </linearGradient>
                                    <path
                                        fill="url(#a)"
                                        fillRule="evenodd"
                                        d="M340.698 149.699c9.419 2.521 17.268 8.518 22.098 16.887 9.323 16.149 4.802 36.551-9.839 47.392l-36.131-62.568c7.482-3.245 15.812-3.871 23.872-1.712zM115.469 385.997l50.42-29.108-66.425-114.892-50.348 29.074c-15.272 8.817-26.22 23.135-30.819 40.311-4.609 17.181-2.29 35.056 6.527 50.323 12.283 21.264 34.632 33.167 57.583 33.167 11.247 0 22.638-2.859 33.061-8.875zm105.188 65.909-42.341-73.328-39.52 22.816 42.331 73.333c6.301 10.895 20.281 14.64 31.181 8.35 5.24-3.027 9-7.954 10.591-13.864 1.581-5.915.786-12.057-2.242-17.306zM378.106 307.54 248.377 82.851c-2.7-4.686-7.14-7.255-12.51-7.255-.101 0-.207.005-.308.005-5.51.101-9.969 2.839-12.553 7.713-4.56 8.605-8.957 17.788-13.609 27.512-19.577 40.889-41.588 86.855-88.489 118.3l66.839 115.635c50.632-24.856 101.433-20.941 146.608-17.451 10.765.834 20.922 1.615 30.665 1.972 5.52.212 10.109-2.285 12.949-7.009 2.849-4.725 2.892-9.96.14-14.732zM345.494 76.835c-3.447 5.978-1.398 13.623 4.58 17.075a12.391 12.391 0 0 0 6.233 1.678c4.319 0 8.528-2.242 10.837-6.252l25.825-44.712c3.447-5.978 1.398-13.623-4.58-17.075-5.983-3.451-13.623-1.403-17.07 4.575l-25.825 44.712zm150.522 137.101c0-6.898-5.592-12.5-12.534-12.5l-51.615.005c-6.898 0-12.5 5.597-12.5 12.5s5.602 12.5 12.5 12.5l51.615-.005c6.942 0 12.534-5.592 12.534-12.5zm-29.889-107.01c-3.471-5.978-11.088-8.026-17.065-4.575l-45.806 26.437c-5.983 3.457-8.031 11.097-4.58 17.08a12.5 12.5 0 0 0 17.08 4.575l45.792-26.442c5.978-3.452 8.051-11.097 4.58-17.075z"
                                        opacity={1}
                                        data-original="url(#a)"
                                        className=""
                                    />
                                </g>
                            </svg>
                            <h1>Welcome to Shipease Seller Panel 2.0!</h1>
                        </div>
                        <p>Experience enhanced features and a seamless transition.</p>
                    </div>
                    <div className="section text-center">
                        <h4>Your Data Has Been Successfully Migrated</h4>
                        <p>
                            We are excited to announce that your data has been successfully
                            migrated to Dashboard 2.0. This includes your wallet balance,
                            courier preferences, warehouse details, channel integrations and all your other information.
                        </p>
                    </div>
                    <div className="section text-center">
                        <h4>Fetch Your Orders in 2.0 and Enjoy Shipping with New Features</h4>
                        <p>
                            You can now fetch, upload or create your orders in the new dashboard and start shipping
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