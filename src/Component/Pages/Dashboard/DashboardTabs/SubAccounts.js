import React from 'react'
import { Col, Row } from 'react-bootstrap'
import MostViewedStatus from '../Components/WhatsAppComm/MostViewedStatus'
import SentOverTime from '../Components/WhatsAppComm/SentOverTime'
import SubAccountsInfo from '../Components/SubAccounts/SubAccountsInfo'
import PerformanceSubAccounts from '../Components/SubAccounts/PerformanceSubAccounts'
import PerformanceRefAccounts from '../Components/SubAccounts/PerformanceRefAccounts'
import CODSubAccounts from '../Components/SubAccounts/CODSubAccounts'
import CODRefAccounts from '../Components/SubAccounts/CODRefAccounts'
import NonActiveService from '../Components/NonActiveService/NonActiveService'

const SubAccounts = () => {
  return (
    <>
      <div className='position-relative'>
        <NonActiveService />
        <Row className='cardsSpace'>
          <Col className='col-12'>
            <Row>
              <Col className='col-3 cardsSpace'>
                <CODSubAccounts />
              </Col>
              <Col className='col-6 cardsSpace'>
                <SubAccountsInfo />
              </Col>
              <Col className='col-3 cardsSpace'>
                <CODRefAccounts />
              </Col>
            </Row>
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
      </div>
    </>
  )
}

export default SubAccounts