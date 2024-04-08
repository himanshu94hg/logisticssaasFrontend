import React from 'react'

const AddTagIcon = () => {
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
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                className="hovered-paths"
            >
                <g>
                    <linearGradient
                        id="a"
                        x1="255.983"
                        x2="255.983"
                        y1="515.55"
                        y2="8.96"
                        gradientTransform="matrix(1 0 0 -1 0 512)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity="0.7" stopColor="#91d8ff" offset={0} />
                        <stop stopOpacity="0.46" stopColor="#0149ed" offset={1} />
                    </linearGradient>
                    <path
                        fill="url(#a)"
                        d="M115.2.1c21.8 0 43.7-.4 65.5.1 30.4.6 57.1 11.2 78.7 32.5C298.9 71.5 337.8 110.9 377 150l120.7 120.6c9.7 9.7 15 21.3 14.1 35.2-.6 9.2-3.6 17.8-10.2 24.5-21.7 22.2-43.6 44.3-65.6 66.2-32.6 32.7-65.3 65.3-97.8 98.1-8.7 8.8-18.4 15.7-31 17-14.4 1.5-26.5-3.9-36.6-14.1-33.6-33.7-67.2-67.4-100.9-101.1-45-45.1-90.1-90.1-135.2-135.1-17.3-17-28.7-39.2-32.5-63.1C.8 191.1.1 184 .1 176.8 0 133.2 0 89.5.1 45.9c0-19.7 9-34.1 27.1-42C32.9 1.6 39 .4 45.2.4c23.3-.5 46.6-.3 70-.3zm-6.9 151.5c23.8-.1 43.6-20 43.3-43.7-.3-23.9-19.2-43.1-43.4-42.9-25.3.2-43.4 19.4-43.2 43.6.1 25 20.1 42.8 43.3 43z"
                        opacity={1}
                        data-original="url(#a)"
                        className="hovered-path"
                    />
                </g>
            </svg>

        </>
    )
}

export default AddTagIcon