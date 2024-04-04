import React from 'react'

const UserImageIcon = () => {
    return (
        <>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={36}
                height={36}
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
                        x1="38.65"
                        x2="473.35"
                        y1="38.65"
                        y2="473.35"
                        gradientTransform="rotate(-90 256 256)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity="0.58" stopColor="#1975c9" offset={0} />
                        <stop stopOpacity={1} stopColor="#1975c9" offset={1} />
                    </linearGradient>
                    <linearGradient
                        id="b"
                        x1="194.89"
                        x2="449.96"
                        y1="241.66"
                        y2="496.73"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#42445a" offset={0} />
                        <stop stopOpacity={1} stopColor="#1975c9" offset={1} />
                    </linearGradient>
                    <g data-name="Layer 2">
                        <g data-name="03.User">
                            <rect
                                width={512}
                                height={512}
                                fill="url(#a)"
                                rx="131.96"
                                transform="rotate(90 256 256)"
                                opacity={1}
                                data-original="url(#a)"
                                className=""
                            />
                            <path
                                fill="url(#b)"
                                d="M512 330.94V380a132 132 0 0 1-132 132H237.39l-110-110 130-113.51-54.73-54.72 106.15-106.03z"
                                opacity={1}
                                data-original="url(#b)"
                                className=""
                            />
                            <g fill="#fff" data-name="03.User">
                                <path
                                    d="M256 261.86a131.84 131.84 0 0 1 131.83 131.83 12.3 12.3 0 0 1-12.3 12.3H136.47a12.3 12.3 0 0 1-12.3-12.3A131.84 131.84 0 0 1 256 261.86z"
                                    fill="#ffffff"
                                    opacity={1}
                                    data-original="#ffffff"
                                    className=""
                                />
                                <circle
                                    cx={256}
                                    cy={181}
                                    r={75}
                                    fill="#ffffff"
                                    opacity={1}
                                    data-original="#ffffff"
                                    className=""
                                />
                            </g>
                        </g>
                    </g>
                </g>
            </svg>

        </>
    )
}

export default UserImageIcon