import React from 'react'

const InvoiceIcon = () => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={24}
                height={24}
                x={0}
                y={0}
                viewBox="0 0 64 64"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className=""
            >
                <g>
                    <linearGradient
                        id="a"
                        x1="8.159"
                        x2="55.841"
                        y1={32}
                        y2={32}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#1975c9" offset="0.4942084942084942" />
                        <stop stopOpacity={1} stopColor="#c5dcf1" offset={1} />
                    </linearGradient>
                    <path
                        fill="url(#a)"
                        d="M46.484 59.993H13.147a5.02 5.02 0 0 1-4.986-5.05l.022-2.347h36.901c.005 2.329-.33 5.59 1.4 7.397zm8.065-3.661a3.691 3.691 0 0 1-3.844 3.661 3.842 3.842 0 0 1-3.467-3.92V51.52a1.08 1.08 0 0 0-1.077-1.077H12.974l.044-41.456A5.012 5.012 0 0 1 18.014 4l37.827.065a5.784 5.784 0 0 0-1.303 3.672c.005 6.542.018 41.28.011 48.595zm-18.553-16.83-17.164.043a1.077 1.077 0 1 0 0 2.154l17.164-.044a1.077 1.077 0 0 0 0-2.153zm13.083-8.614-30.247.043a1.077 1.077 0 0 0 0 2.153l30.247-.043a1.077 1.077 0 0 0 0-2.153zM18.832 24.47l17.164-.043a1.077 1.077 0 0 0 0-2.154l-17.164.043a1.077 1.077 0 1 0 0 2.154zM49.08 13.659l-30.247.043a1.077 1.077 0 0 0 0 2.154l30.247-.043a1.077 1.077 0 0 0 0-2.154z"
                        opacity={1}
                        data-original="url(#a)"
                        className=""
                    />
                </g>
            </svg>

        </>
    )
}

export default InvoiceIcon