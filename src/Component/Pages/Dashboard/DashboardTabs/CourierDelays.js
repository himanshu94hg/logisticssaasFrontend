import React from 'react'
import { Col, Row } from 'react-bootstrap'
import TopSellingDashboard from '../Components/Overview/TopSellingDashboard'
import ChannelByOrder from '../Components/Orders/ChannelByOrder'
import TotalOrderInfo from '../Components/Orders/TotalOrderInfo'
import CancelOrder from '../Components/Orders/CancelOrder'
import BuyerDemographic from '../Components/Orders/BuyerDemographic'
import PrepaidCOD from '../Components/Orders/PrepaidCOD'
import StateSplitDashboard from '../Components/Overview/StateSplitDashboard'
import TableDashboard from '../Components/Overview/TableDashboard'
import DomesticInternational from '../Components/Orders/DomesticInternational'
import BestSKU from '../Components/Orders/BestSKU'
import PopularOrdersLocation from '../Components/Orders/PopularOrdersLocation'
import PickupDelay from '../Components/CourierDelays/PickupDelay'

const CourierDelays = () => {
  return (
    <>
      <Row>
        <Col className="col-3 cardsSpace">
          <PickupDelay />
          <StateSplitDashboard />
        </Col>
        <Col className="col-6 cardsSpace">
          <TotalOrderInfo />
          <TableDashboard />
          <TopSellingDashboard />
          <Row>
            <Col className='col-7'>
              <BestSKU />
            </Col>
            <Col className='col-5'>
              <DomesticInternational />
            </Col>
          </Row>
        </Col>
        <Col className="col-3 cardsSpace">
          <CancelOrder />
          <BuyerDemographic />
          <PrepaidCOD />
          <PopularOrdersLocation />
        </Col>
      </Row>
    </>
  )
}

export default CourierDelays