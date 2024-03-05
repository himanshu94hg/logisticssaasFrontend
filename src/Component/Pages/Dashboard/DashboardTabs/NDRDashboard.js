import React from 'react'
import { Col, Row } from 'react-bootstrap'
import NDRTotalInfo from '../Components/NDR/NDRTotalInfo'
import SuccessByZone from '../Components/NDR/SuccessByZone'
import NDRStatus from '../Components/NDR/NDRStatus'
import NDRReasonSplit from '../Components/NDR/NDRReasonSplit'
import SuccessbyCourier from '../Components/NDR/SuccessbyCourier'
import NDRtoDeliveryAttempt from '../Components/NDR/NDRtoDeliveryAttempt'
import SellerBuyerResponse from '../Components/NDR/SellerBuyerResponse'
import NDRResponse from '../Components/NDR/NDRResponse'
import NDRFunnel from '../Components/NDR/NDRFunnel'

const NDRDashboard = () => {
  return (
    <>
      <Row className='cardsSpace'>
        <Col className='col-12'>
          <Row>
            <Col className='col-3 cardsSpace'>
              <SuccessByZone />
              <SuccessbyCourier />
            </Col>
            <Col className='col-6 cardsSpace'>
              <NDRTotalInfo />
              <NDRStatus />
              <NDRReasonSplit />
            </Col>
            <Col className='col-3 cardsSpace'>
              <NDRtoDeliveryAttempt />
              <SellerBuyerResponse />
            </Col>
          </Row>
        </Col>
        <Col className='col-12'>
          <Row>
            <Col className='col-3'>
              <NDRResponse />
            </Col>
            <Col className='col-9'>
              <NDRFunnel />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default NDRDashboard