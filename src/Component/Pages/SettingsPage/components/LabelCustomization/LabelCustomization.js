import React from 'react'
import './LabelCustomization.css'
import LabelData from './LabelData';
import Logo from '../../../../../assets/image/logo/logo.svg'
import { Col, Row } from 'react-bootstrap';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';

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
            <section className='label-customize-page'>
                <Row>
                    <Col className="col-3">
                        <div className='lc-section-column'>
                            <div className='lc-section-item'>
                                <div className="lc-section-header">
                                    <p>Section One</p>
                                    <Toggle />
                                </div>
                                <div className='lc-section-body'>
                                    <ul>
                                        <li>Contact Mask</li>
                                        <li>Shipping Address</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='lc-section-item'>
                                <div className="lc-section-header">
                                    Section Two
                                </div>
                                <div className='lc-section-body'></div>
                            </div>
                            <div className='lc-section-item'>
                                <div className="lc-section-header">
                                    Section Three
                                </div>
                                <div className='lc-section-body'></div>
                            </div>
                        </div>
                    </Col>
                    <Col className="col-6 box-shadow shadow-sm p10">
                        <LabelData />
                    </Col>
                    <Col className="col-3">
                        <div className='lc-section-column'>
                            <div className='lc-section-item'>
                                <div className="lc-section-header">
                                    <p>Section One</p>
                                    <Toggle />
                                </div>
                                <div className='lc-section-body'>
                                    <ul>
                                        <li>Contact Mask</li>
                                        <li>Shipping Address</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='lc-section-item'>
                                <div className="lc-section-header">
                                    Section Two
                                </div>
                                <div className='lc-section-body'></div>
                            </div>
                            <div className='lc-section-item'>
                                <div className="lc-section-header">
                                    Section Three
                                </div>
                                <div className='lc-section-body'></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </section>
        </>
    )
}

export default LabelCustomization