import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BarGraph from '../../../../../assets/image/BarGraph.png'

const DomesticInternational = () => {
    return (
        <>
            <div className="box-shadow shadow-sm p10">
                <Row>
                    <Col>
                        <h5 className='mb-0 fw-bold'>2,400</h5>
                        <p className='font10 text-blue'>Domestic Orders</p>
                    </Col>
                    <Col>
                        <h5 className='mb-0 fw-bold'>15,000</h5>
                        <p className='font10 text-red'>International Orders</p>
                    </Col>
                </Row>
                <img className="mt-3 graph-image" src={BarGraph} alt='BarGraph'/>
            </div>
        </>
    )
}

export default DomesticInternational