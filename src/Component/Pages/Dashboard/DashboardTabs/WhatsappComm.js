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
import WhatsAppCreateOrder from '../Components/WhatsAppComm/WhatsAppCreateOrder'
import OrdersConfirmed from '../Components/WhatsAppComm/OrdersConfirmed'
import WhatsAppNDR from '../Components/WhatsAppComm/WhatsAppNDR'
import CodToPrepaidConversion from '../Components/WhatsAppComm/CodToPrepaidConversion'
import AbundantChecking from '../Components/WhatsAppComm/AbundantChecking'
import NonActiveService from '../Components/NonActiveService/NonActiveService'

const WhatsappComm = () => {
  return (
    <>
      <div className='position-relative'>
        <NonActiveService />
        <Row className='mb-3 position-relative z-2'>
          <Col className="col-3 cardsSpace">
            <MostViewedStatus />
            <WhatsAppCreateOrder />
          </Col>
          <Col className="col-6 cardsSpace">
            <WhatsAppTotalInfo />
            <WhatsAppNDR />
          </Col>
          <Col className="col-3 cardsSpace">
            <SentOverTime />
            <OrdersConfirmed />
          </Col>
        </Row>
        <Row className='mb-3 position-relative z-2'>
          <Col className='col-6'>
            <CodToPrepaidConversion />
          </Col>
          <Col className='col-6'>
            <AbundantChecking />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default WhatsappComm