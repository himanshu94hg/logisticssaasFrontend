import React from 'react'
import { Col, Row } from 'react-bootstrap'
import TopSellingDashboard from '../Components/Overview/TopSellingDashboard'
import CancelOrder from '../Components/Orders/CancelOrder'
import BuyerDemographic from '../Components/Orders/BuyerDemographic'
import PrepaidCOD from '../Components/Orders/PrepaidCOD'
import TableDashboard from '../Components/Overview/TableDashboard'
import DomesticInternational from '../Components/Orders/DomesticInternational'
import BestSKU from '../Components/Orders/BestSKU'
import PopularOrdersLocation from '../Components/Orders/PopularOrdersLocation'
import PickupDelay from '../Components/CourierDelays/PickupDelay'
import ForwardDelay from '../Components/CourierDelays/ForwardDelay'
import CourierDelaysInfo from '../Components/CourierDelays/CourierDelaysInfo'

const CourierDelays = () => {
  return (
    <>
      <Row>
        <Col className="col-3 cardsSpace">
          <PickupDelay />
          <ForwardDelay />
        </Col>
        <Col className="col-6 cardsSpace">
          <CourierDelaysInfo />
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