import React from 'react'
import './LabelCustomization.css'
import LabelData from './LabelData';
import Logo from '../../../../../assets/image/logo/logo.svg'
import { Col, Row } from 'react-bootstrap';

const LabelCustomization = () => {
    const initialSections = [
        {
            id: 1,
            name: 'Section 1',
            included: true,
            items: [
                { name: 'Contact Mask', included: true },
                { name: 'Shipping Address', included: true },
                { name: 'Logo', included: true },
            ],
        },
        {
            id: 2,
            name: 'Section 2',
            included: true,
            items: [
                { name: 'Shipment Detail', included: true },
                { name: 'Awb Barcode', included: true },
            ],
        },
    ];
    return (
        <>
            <section className='label-customize-page box-shadow shadow-sm p10'>
                <Row>
                    <Col className="col-3"></Col>
                    <Col className="col-6">
                        <LabelData />
                    </Col>
                    <Col className="col-3"></Col>
                </Row>
            </section>
        </>
    )
}

export default LabelCustomization