import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SuccessByZone from '../Components/NDR/SuccessByZone'
import NDRStatus from '../Components/NDR/NDRStatus'
import NDRReasonSplit from '../Components/NDR/NDRReasonSplit'
import SuccessbyCourier from '../Components/NDR/SuccessbyCourier'
import NDRtoDeliveryAttempt from '../Components/NDR/NDRtoDeliveryAttempt'
import SellerBuyerResponse from '../Components/NDR/SellerBuyerResponse'
import NDRResponse from '../Components/NDR/NDRResponse'
import NDRFunnel from '../Components/NDR/NDRFunnel'
import WhatsAppTotalInfo from '../Components/WhatsAppComm/WhatsAppTotalInfo'
import MostViewedStatus from '../Components/WhatsAppComm/MostViewedStatus'
import SentOverTime from '../Components/WhatsAppComm/SentOverTime'

const WhatsappComm = () => {
  return (
    <>
      <Row className='cardsSpace'>
        <Col className='col-12'>
          <WhatsAppTotalInfo />
        </Col>
        <Col className='col-12'>
          <Row>
            <Col className='col-6 cardsSpace'>
              <MostViewedStatus />
            </Col>
            <Col className='col-6 cardsSpace'>
              <SentOverTime />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default WhatsappComm