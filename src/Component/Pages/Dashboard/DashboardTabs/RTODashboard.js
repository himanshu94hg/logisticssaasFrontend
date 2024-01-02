import React from 'react'
import { Col, Row } from 'react-bootstrap'
import RTOOrderDetails from '../Components/RTO/RTOOrderDetails'
import TopRTOPincodes from '../Components/RTO/TopRTOPincodes'
import RTOStatus from '../Components/RTO/RTOStatus'
import RTOCount from '../Components/RTO/RTOCount'
import TopRTOCity from '../Components/RTO/TopRTOCity'
import TopRTOCourier from '../Components/RTO/TopRTOCourier'

const RTODashboard = () => {
  return (
    <>
      <Row>
        <Col className="col-3 cardsSpace">
          {/* <RTOOrderDetails /> */}
          <TopRTOPincodes />
        </Col>
        <Col className="col-6 cardsSpace">
          <RTOStatus />
          <RTOCount />
        </Col>
        <Col className="col-3 cardsSpace">
          <TopRTOCity />
          <TopRTOCourier />
        </Col>
      </Row>
    </>
  )
}

export default RTODashboard