import React from 'react'
import { Col, Row } from 'react-bootstrap'
import BussinessHealthInfo from '../Components/PnL/BussinessHealthInfo'
import TotalProfitAndLoss from '../Components/PnL/TotalProfitAndLoss'
import OrdersSourceStat from '../Components/PnL/OrdersSourceStat'
import ChannelWiseStats from '../Components/PnL/ChannelWiseStats'
import BestSalesProducts from '../Components/PnL/BestSalesProducts'
import TopVendorsStats from '../Components/PnL/TopVendorsStats'
import RtoCountStats from '../Components/PnL/RtoCountStats'
import NonActiveService from '../Components/NonActiveService/NonActiveService'
import { useSelector } from 'react-redux'

const PnL = () => {
  const { planStatusData } = useSelector(state => state?.authDataReducer);

  return (
    <>
      <div className='position-relative'>
      {process.env.REACT_APP_BYPASS_LOGIN !== 'true' && !planStatusData?.business_health_dashoard && <NonActiveService />}
        <Row className='mb-3 position-relative z-2'>
          <Col className="col-3 cardsSpace">
            <TotalProfitAndLoss />
          </Col>
          <Col className="col-6 cardsSpace">
            <BussinessHealthInfo />
          </Col>
          <Col className="col-3 cardsSpace">
            <ChannelWiseStats />
          </Col>
        </Row>
        <Row className='mb-3 position-relative z-2'>
          <Col className='col-6 cardsSpace'>
            <OrdersSourceStat />
          </Col>
          <Col className='col-6 cardsSpace'>
            <BestSalesProducts />
          </Col>
        </Row>
        <Row className='mb-3 position-relative z-2'>
          <Col className='col-6 cardsSpace'>
            <TopVendorsStats />
          </Col>
          <Col className='col-6 cardsSpace'>
            <RtoCountStats />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default PnL