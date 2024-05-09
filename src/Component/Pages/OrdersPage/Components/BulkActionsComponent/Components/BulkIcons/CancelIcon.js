import React from 'react'

const CancelIcon = () => {
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
                className="hovered-paths"
            >
                <g>
                    <linearGradient
                        id="a"
                        x1={3}
                        x2={3}
                        y1={3}
                        y2={21}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#c5dcf1" offset={0} />
                        <stop stopOpacity={1} stopColor="#1975c9" offset="0.5405405405405406" />
                    </linearGradient>
                    <path
                        fill="url(#a)"
                        d="M17 3H7a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4zm-2 11a.75.75 0 0 1 0 1 .75.75 0 0 1-1 0l-2-2-2 2a.75.75 0 0 1-1 0 .75.75 0 0 1 0-1l2-2-2-2a.75.75 0 0 1 0-1 .74.74 0 0 1 1 0l2 2 2-2a.74.74 0 0 1 1 0 .75.75 0 0 1 0 1l-2 2z"
                        opacity={1}
                        data-original="url(#a)"
                        className="hovered-path"
                    />
                </g>
            </svg>


        </>
    )
}

export default CancelIcon