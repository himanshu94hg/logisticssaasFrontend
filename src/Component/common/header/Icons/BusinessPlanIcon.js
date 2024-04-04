import React from 'react'

const BusinessPlanIcon = () => {
    return (
        <>
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={28}
                height={28}
                x={0}
                y={0}
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className=""
            >
                <g>
                    <ellipse
                        cx={256}
                        cy={256}
                        fill="#1975c9"
                        rx={245}
                        ry={256}
                        opacity={1}
                        data-original="#e88102"
                        className=""
                    />
                    <circle
                        cx={256}
                        cy="242.5"
                        r="242.5"
                        fill="#60a9eb"
                        opacity={1}
                        data-original="#fdd835"
                        className=""
                    />
                    <g fill="#fff">
                        <path
                            d="M352.8 20.1 33.6 339.2c-10.7-24.5-17.4-51.1-19.4-79L273.7.6c27.9 2.1 54.5 8.8 79.1 19.5zM467.3 123.5 137 453.8c-20.6-11.6-39.2-26.1-55.5-43L424.4 68c16.8 16.2 31.3 34.9 42.9 55.5zM414.5 58.9l-342 342c-5.3-6.2-10.4-12.7-15.1-19.4L395.1 43.8c6.7 4.7 13.2 9.8 19.4 15.1zM490.9 182 195.5 477.4c-8.9-2.3-17.6-5.1-26.1-8.3l313.2-313.2c3.2 8.5 6 17.2 8.3 26.1z"
                            opacity={1}
                            fill="#ffffff50"
                            data-original="#ffffff50"
                            className=""
                        />
                        <path
                            d="M498.5 242.5c0 1.7 0 3.3-.1 5C495.8 115.9 388.3 10 256 10S16.2 115.9 13.6 247.5c0-1.7-.1-3.3-.1-5C13.5 108.6 122.1 0 256 0s242.5 108.6 242.5 242.5z"
                            opacity={1}
                            fill="#ffffff50"
                            data-original="#ffffff50"
                            className=""
                        />
                        <path
                            d="M453 253c0 104.9-85.1 190-190 190-58.9 0-111.6-26.9-146.5-69 34.7 37.5 84.3 61 139.5 61 104.9 0 190-85.1 190-190 0-46-16.3-88.1-43.5-121 31.3 33.9 50.5 79.2 50.5 129z"
                            opacity={1}
                            fill="#ffffff50"
                            data-original="#ffffff50"
                            className=""
                        />
                    </g>
                    <circle
                        cx={256}
                        cy={245}
                        r={190}
                        fill="#c5dcf1"
                        opacity={1}
                        data-original="#f39e09"
                        className=""
                    />
                    <path
                        fill="#1975c9"
                        d="M400 121c-33.3-28.7-76.6-46-124-46-104.9 0-190 85.1-190 190 0 47.4 17.3 90.7 46 124-40.4-34.9-66-86.4-66-144 0-104.9 85.1-190 190-190 57.5 0 109.1 25.6 144 66z"
                        opacity={1}
                        data-original="#e88102"
                        className=""
                    />
                    <path
                        fill="#1975c9"
                        d="M349.3 132v-15l-17.4 15H174.8l-11.9 35.2v15h49.9c15.8.5 26.4 6.6 31.9 18.4h-71.8l-10.2 24.1v15h83.4c-5.2 16.2-16.6 24.5-34.3 24.8H168l.2 35.8L253.4 402h69.7v-15l-12.4-3-62.9-77.1c19-5.8 33.7-14.1 44-25s16.9-24.9 19.8-42.1h27.3l10.2-39.1v-15l-14.4 15H312c-1.6-10.9-5.1-20.8-10.6-29.5H339z"
                        opacity={1}
                        data-original="#db6704"
                        className=""
                    />
                    <path
                        fill="#60a9eb"
                        d="M339.1 156.1h-37.6c5.4 8.7 9 18.6 10.6 29.5h37.1L339 224.7h-27.3c-2.9 17.2-9.4 31.2-19.8 42.1-10.3 10.9-25 19.2-44 25l75.3 92.4v2.8h-69.7l-85.1-101.6-.2-35.8H212c17.7-.4 29.1-8.6 34.3-24.9h-83.4l10.2-39.1h71.8c-5.4-11.7-16.1-17.9-31.9-18.4h-49.9L175 117h174.5z"
                        opacity={1}
                        data-original="#fdd835"
                        className=""
                    />
                    <g fill="#fff">
                        <path
                            d="M172.9 185.6h14.3l-19.3 19.3zM255.8 117l-50.2 50.2h-42.7l11.9-50.2zM339.1 156.1h-2.9l3.9-3.8zM349.1 185.6l-10.2 39.1h-27.3c-2.8 17.2-9.4 31.2-19.8 42.1-10.3 10.9-25 19.2-44 25l23 28.1-40 40-44.9-53.6L311.2 181c.3 1.5.6 3 .8 4.5zM211.9 249.6c5.4-.1 10.3-1 14.5-2.6l-49.1 49.1-9-10.7-.1-14.7 21.1-21.1zM349.3 117l-2.5 9.6-29.5 29.5h-15.8c2.1 3.3 3.9 6.8 5.4 10.5l-62.1 62.1c.5-1.2 1-2.6 1.4-3.9h-32L321.9 117zM307.6 365.2 285.9 387h-32.5l-.9-1.1 39.7-39.7z"
                            opacity={1}
                            fill="#ffffff50"
                            data-original="#ffffff50"
                            className=""
                        />
                        <path
                            d="M414.5 140.1c-123 43.2-221.8 138.1-270.2 258.6-4.2-3.1-8.3-6.3-12.3-9.8-28.7-33.3-46-76.6-46-123.9 0-104.9 85.1-190 190-190 47.4 0 90.7 17.3 123.9 46 5.3 6.1 10.1 12.5 14.6 19.1z"
                            opacity={1}
                            fill="#ffffff25"
                            data-original="#ffffff25"
                            className=""
                        />
                    </g>
                </g>
            </svg> */}
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={28}
                height={28}
                x={0}
                y={0}
                viewBox="0 0 682.667 682.667"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className=""
            >
                <g>
                    <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                            <path
                                d="M0 512h512V0H0Z"
                                fill="#1975c9"
                                opacity={1}
                                data-original="#000000"
                                className=""
                            />
                        </clipPath>
                    </defs>
                    <g clipPath="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                        <path
                            d="M0 0c0-135.31-109.69-245-245-245-71.33 0-135.54 30.48-180.31 79.13a246.05 246.05 0 0 0-31.03 41.85C-477.73-87.64-490-45.25-490 0c0 135.31 109.69 245 245 245 45.26 0 87.65-12.27 124.02-33.67a244.914 244.914 0 0 0 41.84-31.03C-30.49 135.55 0 71.33 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(502 257.27)"
                            fill="#c5dcf1"
                            data-original="#f0cd00"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="M0 0c0-132.26-104.79-240.04-235.88-244.83C-366.97-240.04-471.76-132.26-471.76 0c0 132.26 104.79 240.04 235.88 244.83C-104.79 240.04 0 132.26 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(502 257.27)"
                            fill="#c5dcf1"
                            data-original="#ffde50"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="m0 0-346.17-346.17a246.05 246.05 0 0 0-31.03 41.85L-41.84 31.03A244.914 244.914 0 0 0 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(422.86 437.57)"
                            fill="#c5dcf1"
                            data-original="#ffea94"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="m0 0-317.68-317.68a244.67 244.67 0 0 0-62.03 35.64L-35.63 62.04A244.227 244.227 0 0 0 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(485.1 346.84)"
                            fill="#c5dcf1"
                            data-original="#ffea94"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="M0 0c0-105.14-85.24-190.38-190.38-190.38-36.62 0-70.82 10.34-99.85 28.26A190.856 190.856 0 0 0-325-134.61a190.677 190.677 0 0 0-21.02 24.94 189.778 189.778 0 0 0-21.5 39.78c-8.28 20.95-12.94 43.73-13.22 67.55-.02.78-.02 1.56-.02 2.34 0 105.14 85.23 190.38 190.38 190.38.78 0 1.57 0 2.35-.02 23.82-.28 46.59-4.95 67.54-13.22a190.24 190.24 0 0 0 39.78-21.5c8.91-6.3 17.25-13.33 24.94-21.02a190.515 190.515 0 0 0 27.51-34.77C-10.34 70.82 0 36.62 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(447.38 257.27)"
                            fill="#ffffff"
                            data-original="#faa300"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="m0 0-269.23-269.23a190.677 190.677 0 0 0-21.02 24.94 189.778 189.778 0 0 0-21.5 39.78c-8.28 20.95-12.94 43.73-13.22 67.55-.02.78-.02 1.56-.02 2.34 0 105.14 85.23 190.38 190.38 190.38.78 0 1.57 0 2.35-.02 23.82-.28 46.59-4.95 67.54-13.22a190.24 190.24 0 0 0 39.78-21.5C-16.03 14.72-7.69 7.69 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(391.61 391.89)"
                            fill="#ffffff"
                            data-original="#ffbd00"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="M0 0c0-105.14-85.24-190.38-190.38-190.38-3.61 0-7.19.1-10.75.3C-100.99-184.51-21.51-101.53-21.51 0c0 101.53-79.48 184.51-179.62 190.08 3.56.2 7.14.3 10.75.3C-85.24 190.38 0 105.14 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(447.375 257.27)"
                            fill="#c5dcf1"
                            data-original="#f68e00"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="M0 0c0 135.31-109.69 245-245 245S-490 135.31-490 0s109.69-245 245-245S0-135.31 0 0z"
                            style={{
                                strokeWidth: 15,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 10,
                                strokeDasharray: "none",
                                strokeOpacity: 1
                            }}
                            transform="translate(501.997 257.269)"
                            fill="none"
                            stroke="#1975c9"
                            strokeWidth={15}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                            strokeDasharray="none"
                            strokeOpacity=""
                            data-original="#000000"
                            opacity={1}
                            className=""
                        />
                        <path
                            d="M0 0c-8.544 21.638-13.238 45.216-13.238 69.891 0 105.143 85.235 190.378 190.378 190.378 105.144 0 190.379-85.235 190.379-190.378 0-105.143-85.235-190.379-190.379-190.379-69.557 0-130.402 37.303-163.62 92.995"
                            style={{
                                strokeWidth: 15,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 10,
                                strokeDasharray: "none",
                                strokeOpacity: 1
                            }}
                            transform="translate(79.856 187.378)"
                            fill="none"
                            stroke="#1975c9"
                            strokeWidth={15}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                            strokeDasharray="none"
                            strokeOpacity=""
                            data-original="#000000"
                            opacity={1}
                            className=""
                        />
                        <path
                            d="M0 0h-33.339a80.45 80.45 0 0 1-8.65 20.931H0c11.046 0 20 8.954 20 20C20 51.976 11.046 60.93 0 60.93h-188.954c-11.046 0-20-8.954-20-19.999 0-11.046 8.954-20 20-20h77.191c15.307 0 28.671-8.453 35.691-20.931h-112.882c-11.046 0-20-8.954-20-20s8.954-20 20-20h112.882c-7.02-12.478-20.384-20.93-35.691-20.93h-77.191a20 20 0 0 1-14.557-33.715l108.769-115.451a19.947 19.947 0 0 1 14.561-6.285c4.919 0 9.848 1.804 13.711 5.443 8.039 7.574 8.416 20.232.842 28.272l-77.005 81.736h30.87c37.724 0 69.498 25.947 78.424 60.93H0c11.046 0 20 8.954 20 20S11.046 0 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(332.634 315.57)"
                            fill="#c5dcf1"
                            data-original="#f68e00"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="M0 0h-33.338a80.453 80.453 0 0 1-8.651 20.931H0c11.046 0 20 8.954 20 20C20 51.976 11.046 60.93 0 60.93h-188.954c-11.046 0-20-8.954-20-19.999 0-11.046 8.954-20 20-20h77.191c15.307 0 28.672-8.453 35.691-20.931h-112.882c-11.046 0-20-8.954-20-20s8.954-20 20-20h112.882c-7.02-12.478-20.384-20.93-35.691-20.93h-77.191a20 20 0 0 1-14.557-33.715l108.769-115.451a19.947 19.947 0 0 1 14.561-6.285c4.919 0 9.848 1.804 13.711 5.443 8.039 7.574 8.416 20.232.842 28.272l-77.005 81.736h30.87c37.724 0 69.498 25.947 78.425 60.93H0c11.046 0 20 8.954 20 20S11.046 0 0 0"
                            style={{ fillOpacity: 1, fillRule: "nonzero", stroke: "none" }}
                            transform="translate(357.635 315.57)"
                            fill="#c5dcf1"
                            data-original="#ffea94"
                            className=""
                            opacity={1}
                        />
                        <path
                            d="M0 0h-107.171c-11.046 0-20-8.954-20-20s8.954-20 20-20h77.191c15.307 0 28.671-8.452 35.691-20.93h-112.882c-11.046 0-20-8.955-20-20 0-11.046 8.954-20 20-20H5.711c-7.02-12.478-20.384-20.931-35.691-20.931h-77.191a20 20 0 0 1-14.557-33.714l108.769-115.451a19.943 19.943 0 0 1 14.561-6.285 19.93 19.93 0 0 1 13.711 5.443c8.039 7.574 8.416 20.232.842 28.272l-77.006 81.735h30.871c37.724 0 69.498 25.947 78.424 60.931h33.339c11.046 0 20 8.954 20 20 0 11.045-8.954 20-20 20H48.444A80.395 80.395 0 0 1 39.794-40h41.989c11.046 0 20 8.954 20 20s-8.954 20-20 20H30.002"
                            style={{
                                strokeWidth: 15,
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeMiterlimit: 10,
                                strokeDasharray: "none",
                                strokeOpacity: 1
                            }}
                            transform="translate(275.853 376.5)"
                            fill="none"
                            stroke="#1975c9"
                            strokeWidth={15}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeMiterlimit={10}
                            strokeDasharray="none"
                            strokeOpacity=""
                            data-original="#000000"
                            opacity={1}
                            className=""
                        />
                    </g>
                </g>
            </svg> */}
            {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={28}
                height={28}
                x={0}
                y={0}
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className="hovered-paths"
            >
                <circle r={256} cx={256} cy={256} fill="#bac8d3" shape="circle" />
                <g transform="matrix(0.7,0,0,0.7,76.79999542236328,76.7699935913086)">
                    <linearGradient
                        id="a"
                        x1="119.69"
                        x2="453.41"
                        y1="463.895"
                        y2="130.175"
                        gradientTransform="matrix(1 0 0 -1 0 511.24)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity="0.15" stopColor="#1975c9" offset={0} />
                        <stop stopOpacity={1} stopColor="#1975c9" offset={1} />
                    </linearGradient>
                    <path
                        fill="url(#a)"
                        d="M388.5 103h-60.1c8.7 13.9 14.3 29.6 16.9 47h59.2l-16.3 62.4h-43.5c-4.5 27.4-15 49.8-31.5 67.2s-39.9 30.7-70.3 39.9L363 466.8v4.4H251.9l-135.8-162-.3-57.1h69.8c28.2-.6 46.5-13.8 54.7-39.6H107.2l16.3-62.4H238c-8.7-18.7-25.6-28.5-50.9-29.3h-79.6l18.9-80.2h278.4z"
                        opacity={1}
                        data-original="url(#a)"
                        className="hovered-path"
                    />
                </g>
            </svg> */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width={30}
                height={30}
                x={0}
                y={0}
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className="hovered-paths"
            >
                <g>
                    <linearGradient
                        id="a"
                        x1="74.98"
                        x2="437.02"
                        y1="74.98"
                        y2="437.02"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#1975c9" offset={0} />
                        <stop stopOpacity={1} stopColor="#c5dcf1" offset={1} />
                    </linearGradient>
                    <g data-name={8}>
                        <rect
                            width={512}
                            height={512}
                            fill="url(#a)"
                            rx={256}
                            opacity={1}
                            data-original="url(#a)"
                            className="hovered-path"
                        />
                        <path
                            fill="#ffffff"
                            d="M348.31 149.48h-41.83c6.04 9.69 9.96 20.61 11.74 32.76h41.21l-11.33 43.48h-30.29c-3.16 19.1-10.48 34.69-21.94 46.77-11.47 12.09-27.78 21.36-48.94 27.82l83.65 102.62v3.08h-77.47L158.54 293.1l-.21-39.77h48.63c19.64-.41 32.35-9.61 38.12-27.61h-92.72l11.33-43.48h79.74c-6.05-13.05-17.86-19.85-35.44-20.4h-55.43L165.75 106h193.89z"
                            opacity={1}
                            data-original="#ffffff"
                            className=""
                        />
                    </g>
                </g>
            </svg>



        </>
    )
}

export default BusinessPlanIcon