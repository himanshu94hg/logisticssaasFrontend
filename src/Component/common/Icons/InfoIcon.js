import React from 'react'

const InfoIcon = ({ onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={14}
            height={14}
            x={0}
            y={0}
            viewBox="0 0 60 60"
            style={{ enableBackground: "new 0 0 512 512" }}
            xmlSpace="preserve"
            className="hovered-paths"
            onClick={onClick}
        >
            <g>
                <path
                    fill="#60a9eb"
                    d="M59 30a29.008 29.008 0 0 1-42.56 25.64 33.559 33.559 0 0 1-9.02 3.32 1.651 1.651 0 0 1-1.89-2.23 36.552 36.552 0 0 0 2.18-8.17A29 29 0 1 1 59 30z"
                    opacity={1}
                    data-original="#219cf7"
                    className=""
                />
                <g fill="#fff">
                    <path
                        d="m35.215 44.405 1.1.367a1 1 0 0 1 .684.949V47a1 1 0 0 1-1 1H24a1 1 0 0 1-1-1v-1.279a1 1 0 0 1 .684-.949l1.085-.362A1.8 1.8 0 0 0 26 42.7V28.3a1.8 1.8 0 0 0-1.231-1.708l-1.085-.362a1 1 0 0 1-.684-.951V24a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v18.72a1.776 1.776 0 0 0 1.215 1.685z"
                        fill="#ffffff"
                        opacity={1}
                        data-original="#ffffff"
                    />
                    <circle
                        cx={30}
                        cy={14}
                        r={4}
                        fill="#ffffff"
                        opacity={1}
                        data-original="#ffffff"
                    />
                </g>
            </g>
        </svg>

    )
}

export default InfoIcon