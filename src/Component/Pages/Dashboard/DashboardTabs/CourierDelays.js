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
import LastMileDelay from '../Components/CourierDelays/LastMileDelay'
import InTransitDelay from '../Components/CourierDelays/InTransitDelay'
import ReverseDelay from '../Components/CourierDelays/ReverseDelay'
import NetworkDelays from '../Components/CourierDelays/NetworkDelays'

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
          <LastMileDelay />
        </Col>
        <Col className="col-3 cardsSpace">
          <InTransitDelay />
          <ReverseDelay />
          <NetworkDelays />
        </Col>
      </Row>
    </>
  )
}

export default CourierDelays