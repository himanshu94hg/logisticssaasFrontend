import React from 'react'

const MergeIcon = () => {
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
                viewBox="0 0 32 32"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
                fillRule="evenodd"
                className="hovered-paths"
            >
                <defs>
                    <linearGradient id="mergeGradient" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0.386" stopColor="#1975c9" stopOpacity="1" />
                        <stop offset="1" stopColor="#c5dcf1" stopOpacity="1" />
                    </linearGradient>
                </defs>
                <g>
                    <path
                        d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16 16-7.163 16-16S24.837 0 16 0zm3.707 18.707L16 21.414l-3.707-3.707 1.414-1.414L15 17.586V10h2v7.586l1.293-1.293 1.414 1.414zM10 8h12v2H10V8z"
                        fill="url(#mergeGradient)"
                        className="hovered-path"
                    />
                </g>
            </svg>
        </>
    )
}

export default MergeIcon
