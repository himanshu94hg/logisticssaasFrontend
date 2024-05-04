import React from 'react'

const LabelIcon = () => {
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
                viewBox="0 0 48 48"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                fillRule="evenodd"
                className=""
            >
                <g>
                    <linearGradient
                        id="a"
                        x1={0}
                        x2={1}
                        y1={0}
                        y2={0}
                        gradientTransform="matrix(47 47 -47 47 217 0)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#1975c9" offset="0.2471042471042471" />
                        <stop stopOpacity={1} stopColor="#c5dcf1" offset={1} />
                    </linearGradient>
                    <path
                        fill="url(#a)"
                        d="M254 4.5a2.5 2.5 0 0 0-2.5-2.5h-23a2.5 2.5 0 0 0-2.5 2.5v39a2.499 2.499 0 0 0 3.548 2.27l10.242-4.728a.505.505 0 0 1 .42 0l10.242 4.728A2.502 2.502 0 0 0 254 43.5z"
                        transform="translate(-216)"
                        opacity={1}
                        data-original="url(#a)"
                        className=""
                    />
                </g>
            </svg>

        </>
    )
}

export default LabelIcon