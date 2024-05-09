import React from 'react'

const DeleteIcon = () => {
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
                <g>
                    <linearGradient
                        id="a"
                        x1={0}
                        x2={1}
                        y1={0}
                        y2={0}
                        gradientTransform="matrix(23.242 0 0 27.823 3.879 64.088)"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopOpacity={1} stopColor="#1975c9" offset="0.3861003861003861" />
                        <stop stopOpacity={1} stopColor="#c5dcf1" offset={1} />
                    </linearGradient>
                    <path
                        fill="url(#a)"
                        d="m12.744 54.289-8.865 2.21.242.97 2.396-.597.802 16.842A4.5 4.5 0 0 0 11.814 78h8.372a4.5 4.5 0 0 0 4.495-4.286l.818-17.19A.499.499 0 0 0 25 56H10.015l17.106-4.265-.242-.97-6.548 1.632-.915-1.934a.5.5 0 0 0-.573-.271l-5.821 1.451a.5.5 0 0 0-.379.509zM11.5 60v13h1V60zm4 0v13h1V60zm4 0v13h1V60zm-3.639-6.488-2.128.53-.072-1.528 5.027-1.253.654 1.383z"
                        transform="translate(0 -48)"
                        opacity={1}
                        data-original="url(#a)"
                        className="hovered-path"
                    />
                </g>
            </svg>

        </>
    )
}

export default DeleteIcon