import React from 'react'

const ExportIcon = () => {
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
                            d="M6.623 4.508c-1.471.027-2.318.151-2.89.725C3 5.965 3 7.143 3 9.5v5c0 2.357 0 3.536.732 4.268.573.573 1.42.698 2.891.725-.123-.918-.123-2.064-.123-3.394V7.902c0-1.33 0-2.477.123-3.394z"
                            fill=""
                            opacity={1}
                        />
                        <path
                            fillRule="evenodd"
                            d="M8.879 2.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121S11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879S21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121S17.828 2 15 2h-1c-2.828 0-4.243 0-5.121.879zm6.151 4.59a.75.75 0 0 0-1.06 0l-2.5 2.5a.75.75 0 1 0 1.06 1.061l1.22-1.22V16a.75.75 0 0 0 1.5 0V9.81l1.22 1.22a.75.75 0 1 0 1.06-1.06z"
                            clipRule="evenodd"
                            fill=""
                            opacity={1}
                        />
                    </g>
                </g>
            </svg>

        </>
    )
}

export default ExportIcon