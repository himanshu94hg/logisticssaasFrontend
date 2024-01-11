import React from 'react'
import { Col, Row } from 'react-bootstrap'
import MostViewedStatus from '../Components/WhatsAppComm/MostViewedStatus'
import SentOverTime from '../Components/WhatsAppComm/SentOverTime'
import SubAccountsInfo from '../Components/SubAccounts/SubAccountsInfo'
import PerformanceSubAccounts from '../Components/SubAccounts/PerformanceSubAccounts'
import PerformanceRefAccounts from '../Components/SubAccounts/PerformanceRefAccounts'

const SubAccounts = () => {
  return (
    <>
      <Row className='cardsSpace'>
        <Col className='col-12'>
          <SubAccountsInfo />
        </Col>
        <Col className='col-12'>
          <Row>
            <Col className='col-6 cardsSpace'>
              <PerformanceSubAccounts />
            </Col>
            <Col className='col-6 cardsSpace'>
              <PerformanceRefAccounts />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default SubAccounts