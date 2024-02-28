import React from 'react'
import { Col, Row } from 'react-bootstrap'
import WeightProfile from '../Components/Shipment/WeightProfile'
import ShipmentOverview from '../Components/Shipment/ShipmentOverview'
import ZoneWiseData from '../Components/Shipment/ZoneWiseData'
import OFDDataCard from '../Components/Shipment/OFDDataCard'
import ExpectedDate from '../Components/Shipment/ExpectedDate'
import ShipmentPerformance from '../Components/Shipment/ShipmentPerformance'
import DataTable from '../Components/Overview/DataTable/DataTable'

const ShipmentDashboard = () => {
  return (
    <>
      <Row className='mb-3'>
        <Col className="col-3 cardsSpace">
          <WeightProfile />
          <ZoneWiseData />
        </Col>
        <Col className="col-6 cardsSpace">
          <ShipmentOverview />
          <ShipmentPerformance />
          <DataTable />
        </Col>
        <Col className="col-3 cardsSpace">
          <OFDDataCard />
          <ExpectedDate />
        </Col>
      </Row>
    </>
  )
}

export default ShipmentDashboard