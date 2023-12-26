import React from 'react'

const PopularOrdersLocation = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <div className="row">
                    <div className="col">
                        <h4 className="title">Popular Orders Location</h4>
                        <ul className="list-ui mt20">
                            <li className="bg-red-light text-red">
                                <p>Tamil Nadu</p>
                                <p>₹ 429885</p>
                            </li>

                            <li className="bg-green-light text-green">
                                <p>Haryana</p>
                                <p>₹ 258850</p>
                            </li>

                            <li className="bg-blue-light text-blue">
                                <p>Karnataka</p>
                                <p>₹ 210131</p>
                            </li>

                            <li className="bg-purple-light text-purple">
                                <p>Delhi</p>
                                <p>₹ 144448</p>
                            </li>
                            <li className="bg-sky-light text-aqua">
                                <p>West Bengal</p>
                                <p>₹ 78400</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PopularOrdersLocation