import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BussinessHealthInfo from '../Components/PnL/BussinessHealthInfo'
import TotalProfitAndLoss from '../Components/PnL/TotalProfitAndLoss'
import OrdersSourceStat from '../Components/PnL/OrdersSourceStat'

const PnL = () => {
  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          <TotalProfitAndLoss />
        </Col>
        <Col className="col-6 cardsSpace">
          <BussinessHealthInfo />
        </Col>
        <Col className="col-3 cardsSpace">
        </Col>
      </Row>
      <Row>
        <Col className='col-12'>
          <OrdersSourceStat />
        </Col>
      </Row>
    </>
  )
}

export default PnL