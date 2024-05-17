import React from 'react'

const ReAttemptIcon = () => {
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
                viewBox="0 0 24 24"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className=""
            >
                <g>
                    <linearGradient
                        id="a"
                        x1={12}
                        x2={12}
                        y1={2}
                        y2={22}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#c5dcf1" offset={0} />
                        <stop stopOpacity={1} stopColor="#1975c9" offset="0.5096525096525096" />
                    </linearGradient>
                    <g fill="url(#a)">
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                            fill=""
                            opacity={1}
                        />
                        <path
                            d="M16.24 7.76a.75.75 0 0 1 0 1.06L12.81 12l3.43 3.18a.75.75 0 1 1-1.02 1.1l-4-3.75a.75.75 0 0 1 0-1.1l4-3.75a.75.75 0 0 1 1.02 0zM8.76 7.76a.75.75 0 0 1 1.02 0l4 3.75a.75.75 0 0 1 0 1.1l-4 3.75a.75.75 0 0 1-1.02-1.1l3.43-3.18L8.76 8.82a.75.75 0 0 1 0-1.06z"
                            fill=""
                            opacity={1}
                        />
                    </g>
                </g>
            </svg>
        </>
    )
}

export default ReAttemptIcon
