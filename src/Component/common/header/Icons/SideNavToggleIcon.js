import React from 'react'

const SideNavToggleIcon = () => {
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
                        y1={5}
                        y2={19}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#1975c9" offset={0} />
                        <stop stopOpacity={1} stopColor="#c5dcf1" offset={1} />
                    </linearGradient>
                    <path
                        fill="url(#a)"
                        fillRule="evenodd"
                        d="M3 6a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1zm0 6a1 1 0 0 1 1-1h5a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1z"
                        clipRule="evenodd"
                        opacity={1}
                        data-original="url(#a)"
                    />
                </g>
            </svg>
        </>
    )
}

export default SideNavToggleIcon