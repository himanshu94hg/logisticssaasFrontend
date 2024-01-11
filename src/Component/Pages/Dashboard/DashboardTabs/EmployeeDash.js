import React from 'react'
import { Col, Row } from 'react-bootstrap'
import WhatsAppTotalInfo from '../Components/WhatsAppComm/WhatsAppTotalInfo'
import MostViewedStatus from '../Components/WhatsAppComm/MostViewedStatus'
import SentOverTime from '../Components/WhatsAppComm/SentOverTime'

const EmployeeDash = () => {
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

export default EmployeeDash