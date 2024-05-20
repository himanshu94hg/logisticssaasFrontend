import React from 'react'

const RtoIcon = () => {
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
                            d="M15.54 12.35L12 8.81 8.46 12.35a.5.5 0 1 1-.71-.71l4-4a.5.5 0 0 1 .71 0l4 4a.5.5 0 1 1-.71.71z"
                            fill=""
                            opacity={1}
                        />
                        <path
                            d="M11 16h2v-4h-2v4z"
                            fill=""
                            opacity={1}
                        />
                    </g>
                </g>
            </svg>
        </>
    )
}

export default RtoIcon
