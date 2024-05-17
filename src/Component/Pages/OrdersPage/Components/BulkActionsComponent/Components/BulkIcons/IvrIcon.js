import React from 'react'

const IvrIcon = () => {
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
                            d="M15.5 11c.28 0 .5-.22.5-.5V9c0-1.65-1.35-3-3-3H11c-.28 0-.5.22-.5.5s.22.5.5.5h2c1.1 0 2 .9 2 2v1.5c0 .28.22.5.5.5zM9 6.5c0-.28-.22-.5-.5-.5H6c-1.65 0-3 1.35-3 3v2c0 .28.22.5.5.5s.5-.22.5-.5v-2c0-1.1.9-2 2-2h2c.28 0 .5-.22.5-.5zM18.5 17h-2c-1.1 0-2-.9-2-2v-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V15c0 1.65 1.35 3 3 3h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5zM7 14.5c0 .28.22.5.5.5H10c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H7.5c-.28 0-.5.22-.5.5z"
                            fill=""
                            opacity={1}
                        />
                    </g>
                </g>
            </svg>
        </>
    )
}

export default IvrIcon
